/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, User, Sparkles } from 'lucide-react';
import { GuestInfo } from '../types';

interface CoverProps {
  onOpen: (guest: GuestInfo) => void;
}

export default function Cover({ onOpen }: CoverProps) {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [resolvedName, setResolvedName] = useState('');

  useEffect(() => {
    // Read names from query parameters
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('guest');
    const relationParam = params.get('as') || params.get('relation');
    
    if (toParam) {
      setResolvedName(toParam);
      setName(toParam);
    }
    if (relationParam) {
      setRelation(relationParam);
    }
  }, []);

  const handleOpenInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    onOpen({
      name: name.trim() || 'Tamu Kehormatan',
      relation: relation.trim() || undefined
    });
  };

  return (
    <div id="invitation-cover-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-geometric-islamic overflow-y-auto px-4 py-8">
      {/* Geometric Corner Borders for the "Geometric Balance" Theme */}
      <div className="absolute top-0 left-0 w-20 h-20 md:w-36 md:h-36 border-l-4 border-t-4 border-[#bae6fd] rounded-tl-3xl m-3 md:m-6 pointer-events-none opacity-80"></div>
      <div className="absolute top-0 right-0 w-20 h-20 md:w-36 md:h-36 border-r-4 border-t-4 border-[#bae6fd] rounded-tr-3xl m-3 md:m-6 pointer-events-none opacity-80"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 md:w-36 md:h-36 border-l-4 border-b-4 border-[#bae6fd] rounded-bl-3xl m-3 md:m-6 pointer-events-none opacity-80"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 md:w-36 md:h-36 border-r-4 border-b-4 border-[#bae6fd] rounded-br-3xl m-3 md:m-6 pointer-events-none opacity-80"></div>

      {/* Decorative Islamic Mandala Background Assets (using pristine SVG inline styling) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
        <svg className="w-[125%] h-[125%] max-w-none text-sky-200 transform rotate-12" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.1" />
          {[...Array(16)].map((_, i) => (
            <path
              key={i}
              d="M50,5 S55,30 50,45 S45,30 50,5 Z"
              transform={`rotate(${i * 22.5} 50 50)`}
              stroke="currentColor"
              strokeWidth="0.1"
              fill="none"
            />
          ))}
          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-white text-center text-slate-800 z-10"
      >
        {/* Modern Islamic Top Accent */}
        <div className="mx-auto w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.963 11.963 0 0112 12a11.963 11.963 0 01-7.843-4.418" />
          </svg>
        </div>

        <span className="text-xs uppercase tracking-widest text-sky-500 font-semibold mb-2 block">
          UNDANGAN WALIMATUL KHITAN
        </span>

        <h1 className="font-serif text-3xl md:text-4xl text-sky-800 font-bold tracking-wide mt-2 mb-3">
          Muhammad Shahdan Akbar
        </h1>

        <p className="text-sm text-slate-500 italic max-w-xs mx-auto mb-8">
          &ldquo;Menyambut fase baru kehidupan, tumbuh cerdas, sholeh dan bertakwa di jalan Allah SWT&rdquo;
        </p>

        {/* Guest Portal */}
        <div id="guest-portal-box" className="p-5 md:p-6 bg-sky-50/70 border border-sky-100/50 rounded-2xl mb-8">
          <p className="text-xs text-sky-600 font-medium tracking-wide uppercase mb-2">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          
          {resolvedName ? (
            <div className="py-2">
              <h2 className="text-2xl font-bold text-sky-900 tracking-tight capitalize">
                {resolvedName}
              </h2>
              {relation && (
                <span className="text-xs text-slate-400 font-medium block mt-1">
                  Atas {relation}
                </span>
              )}
            </div>
          ) : (
            <form onSubmit={handleOpenInvitation} className="space-y-3 mt-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tulis nama tamu di sini..."
                  required
                  className="w-full bg-white border border-sky-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent text-slate-800 transition shadow-inner"
                />
              </div>
            </form>
          )}

          <p className="text-xs text-slate-400 mt-3 italic">
            *Kami mengundang Anda untuk hadir memberikan doa restu.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleOpenInvitation}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-sky-600 hover:bg-sky-700 active:scale-98 text-white font-medium rounded-full shadow-lg hover:shadow-sky-200 transition-all duration-300 cursor-pointer text-sm"
        >
          <BookOpen className="w-4 h-4" />
          Buka Undangan
          <Sparkles className="w-4 h-4 text-sky-200 animate-pulse" />
        </button>
      </motion.div>
    </div>
  );
}
