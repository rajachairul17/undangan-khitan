/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface BackgroundMusicProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function BackgroundMusic({ isPlaying, setIsPlaying }: BackgroundMusicProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodesRef = useRef<GainNode[]>([]);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const timeoutIdsRef = useRef<number[]>([]);
  const lfoNodeRef = useRef<OscillatorNode | null>(null);
  const masterGainNodeRef = useRef<GainNode | null>(null);

  const startAmbientSynth = () => {
    try {
      // Initialize AudioContext
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      // Master Gain for volume
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainNodeRef.current = masterGain;

      // We will create a warm major pentatonic pad (Eb3, Bb3, Eb4, G4, Bb4) to sound spiritual and calm
      const baseNotes = [155.56, 233.08, 311.13, 392.00, 466.16];
      
      // Gentle chord oscillators with randomized sine / triangle profiles
      baseNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Slow warm panning and volumes to simulate wind breathing
        const lfoSpeed = 0.05 + idx * 0.015;
        const gainVal = 0.06 - (idx * 0.008); // lighter on higher notes

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        
        osc.connect(gainNode);
        gainNode.connect(masterGain);
        
        osc.start(ctx.currentTime);
        
        oscillatorsRef.current.push(osc);
        gainNodesRef.current.push(gainNode);

        // Schedule fading in/out for each note to make a dynamic rich chord
        const cycleVolume = () => {
          if (ctx.state === 'closed') return;
          const now = ctx.currentTime;
          const duration = 6 + Math.random() * 6;
          const peak = gainVal * (0.4 + Math.random() * 0.6);
          
          gainNode.gain.linearRampToValueAtTime(0.01, now);
          gainNode.gain.exponentialRampToValueAtTime(peak, now + duration * 0.4);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

          const timeoutId = window.setTimeout(cycleVolume, duration * 1000);
          timeoutIdsRef.current.push(timeoutId);
        };

        cycleVolume();
      });

      // Simple periodic melody chime (high note triggers once in a while)
      const playChime = () => {
        if (ctx.state === 'closed') return;
        const now = ctx.currentTime;
        const chimes = [523.25, 587.33, 659.25, 783.99, 880.00]; // Pentatonic high chimes
        const randomFreq = chimes[Math.floor(Math.random() * chimes.length)];

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(randomFreq, now);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.012, now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

        osc.connect(gainNode);
        gainNode.connect(masterGain);

        osc.start(now);
        osc.stop(now + 4);

        const nextChimeTime = 8 + Math.random() * 12;
        const timeoutId = window.setTimeout(playChime, nextChimeTime * 1000);
        timeoutIdsRef.current.push(timeoutId);
      };

      // Delay first chime slightly
      const chimeTimeoutId = window.setTimeout(playChime, 3000);
      timeoutIdsRef.current.push(chimeTimeoutId);

      // Fade in master volume
      masterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.5);

    } catch (e) {
      console.error('Failed to initialize ambient synth:', e);
    }
  };

  const stopAmbientSynth = () => {
    // Clear timeouts
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];

    // Fade out master gain first
    if (masterGainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      masterGainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    }

    setTimeout(() => {
      // Disconnect and stop all nodes
      oscillatorsRef.current.forEach((osc) => {
        try { osc.stop(); } catch {}
        osc.disconnect();
      });
      oscillatorsRef.current = [];

      gainNodesRef.current.forEach((gain) => gain.disconnect());
      gainNodesRef.current = [];

      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
      audioCtxRef.current = null;
    }, 600);
  };

  useEffect(() => {
    if (isPlaying) {
      if (!audioCtxRef.current) {
        startAmbientSynth();
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
        if (masterGainNodeRef.current) {
          masterGainNodeRef.current.gain.linearRampToValueAtTime(0.35, audioCtxRef.current.currentTime + 0.5);
        }
      }
    } else {
      if (audioCtxRef.current && masterGainNodeRef.current) {
        masterGainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5);
        setTimeout(() => {
          if (audioCtxRef.current && !isPlaying) {
            audioCtxRef.current.suspend();
          }
        }, 500);
      }
    }

    return () => {
      // Only clean up on unmount or full stop
    };
  }, [isPlaying]);

  // Clean up fully on destroy
  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((id) => clearTimeout(id));
      oscillatorsRef.current.forEach((osc) => {
        try { osc.stop(); } catch {}
        osc.disconnect();
      });
      gainNodesRef.current.forEach((g) => g.disconnect());
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const handleToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div id="ambient-music-floating-control" className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleToggle}
        className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white/95 backdrop-blur text-sky-600 transition-all duration-500 hover:scale-115 active:scale-95 border border-sky-100 ${
          isPlaying ? 'animate-spin-[duration:10s]' : ''
        }`}
        aria-label="Toggle Background Music"
        title={isPlaying ? "Mute Musik" : "Putar Musik"}
      >
        {isPlaying ? (
          <div className="relative">
            <Volume2 className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" />
        )}
      </button>
    </div>
  );
}
