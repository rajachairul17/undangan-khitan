/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  // Target date: Saturday, June 20, 2026 at 09:00:00 WIB
  const targetDate = new Date('2026-06-20T09:00:00+07:00');

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isEventStarted, setIsEventStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const left = calculateTimeLeft();
      setTimeLeft(left);

      // Check if event already passed
      const now = new Date();
      if (targetDate.getTime() <= now.getTime()) {
        setIsEventStarted(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div id="countdown-card" className="w-full max-w-md mx-auto p-6 bg-white/90 border border-sky-100 rounded-3xl shadow-xs text-center space-y-4">
      <div className="flex items-center justify-center gap-1.5 text-sky-600 font-semibold text-xs tracking-wider uppercase mb-1">
        <Clock className="w-4 h-4 animate-spin-[duration:12s]" />
          Waktu Acara Dimulai
      </div>

      {isEventStarted ? (
        <div className="py-4">
          <p className="font-serif text-lg font-bold text-sky-800">
            Alhamdulillah, Acara Telah Berlangsung!
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Terima kasih atas segala ucapan doa dan restu Anda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {timeBlocks.map((block, index) => (
            <div key={index} className="flex flex-col items-center bg-sky-50 border border-sky-100/50 rounded-2xl py-3 px-1.5 transition duration-300 hover:bg-sky-100/50">
              <span className="text-2xl md:text-3xl font-bold text-sky-700 tracking-tight">
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mt-1">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-sky-50 pt-3">
        <p className="text-xs text-slate-400 font-serif italic">
          &ldquo;Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu mengingat kebesaran Allah.&rdquo;
        </p>
      </div>
    </div>
  );
}
