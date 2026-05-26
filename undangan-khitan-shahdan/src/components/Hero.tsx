/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Star, Sparkles } from 'lucide-react';

const photo2 = '/photo2.jpeg';

interface HeroProps {
  guestName: string;
}

export default function Hero({ guestName }: HeroProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <section id="hero-section" className="relative text-center py-16 md:py-24 px-4 overflow-hidden rounded-3xl bg-radial from-sky-50 via-sky-100/50 to-white border border-sky-100 max-w-4xl mx-auto shadow-sm">
      {/* Intricate decorative background arch using inline SVG (Clean & lightweight) */}
      <div className="absolute inset-x-0 top-0 opacity-10 flex justify-center pointer-events-none">
        <svg className="w-96 h-96 text-sky-500" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C 10 0 0 40 0 100 L 100 100 C 100 40 90 0 50 0 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M50 5 C 15 5 5 43 5 100 L 95 100 C 95 43 85 5 50 5 Z" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,1" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-6"
      >
        {/* Calligraphic-looking Sub-badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/85 border border-sky-250 rounded-full text-xs font-semibold text-sky-700 shadow-xs">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
          <span>WALIMATUL KHITAN</span>
          <Star className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
        </div>

        {/* Islamic Greeting */}
        <div className="space-y-3">
          <p className="font-serif text-lg md:text-xl text-sky-800 font-medium tracking-wide">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <h2 className="font-serif text-xl md:text-2xl text-slate-800 mt-2 tracking-wide">
            Assalamu’alaikum Wr. Wb.
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed px-4">
            Dengan memohon rahmat dan ridho Allah SWT, kami sekeluarga bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri syukuran khitanan putra kami yang ke-11 tahun:
          </p>
        </div>

        {/* Elegant Portrait Frame with Shahdan's Photo */}
        <div id="portrait-frame" className="relative mx-auto w-48 h-64 md:w-52 md:h-72 my-8">
          <div className="absolute inset-0 bg-sky-200/40 border-2 border-sky-300 rounded-t-full rounded-b-lg scale-105 blur-xs"></div>
          
          {/* Main Visual Frame */}
          <div className="relative w-full h-full bg-white border border-sky-200 rounded-t-full rounded-b-lg shadow-md overflow-hidden p-1.5 flex flex-col justify-between">
            <div className="w-full h-full overflow-hidden rounded-t-full rounded-b-md">
              {!imageError ? (
                <img
                  src={photo2}
                  alt="Muhammad Shahdan Akbar"
                  className="w-full h-full object-cover transition duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-linear-to-b from-sky-50 to-sky-100/30 flex flex-col items-center justify-center p-4 text-center space-y-4">
                  <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center border border-sky-150 shadow-inner">
                    <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.963 11.963 0 0112 12a11.963 11.963 0 01-7.843-4.418" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] tracking-widest uppercase font-bold text-sky-600 block animate-pulse">Foto Ditampilkan</span>
                    <span className="text-xs font-serif font-bold text-slate-700 block line-clamp-1">M. Shahdan Akbar</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Floating Sparkles in the corners */}
          <div className="absolute -top-2 -left-2 bg-white rounded-full p-1.5 border border-sky-100 shadow-xs animate-bounce">
            <Sparkles className="w-4 h-4 text-sky-500" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 border border-sky-100 shadow-xs">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
        </div>

        {/* Big Noble Child Name */}
        <div className="space-y-1">
          <h1 className="font-serif text-2xl md:text-4xl font-bold tracking-wide text-sky-900">
            Muhammad Shahdan Akbar
          </h1>
          <p className="text-sky-600 font-medium text-sm md:text-base">
            Putra dari Bapak Moch. Eva Isyabillah dan Ibu Sustiyawati
          </p>
        </div>

        {/* Personalized Welcome Guest Message */}
        {guestName && (
          <div className="pt-4 max-w-sm mx-auto">
            <p className="text-[11px] text-slate-400 uppercase tracking-widest">Merupakan suatu kehormatan menyambut kehadiran:</p>
            <p className="text-base font-semibold text-sky-800 mt-1 px-4 py-1.5 bg-sky-50/70 border border-sky-100 rounded-xl inline-block">
              Yth. {guestName}
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
