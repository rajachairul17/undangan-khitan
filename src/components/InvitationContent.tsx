/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Heart, Clock, Star, Gift } from 'lucide-react';
import Hero from './Hero';
import Countdown from './Countdown';
import EventDetails from './EventDetails';
import Guestbook from './Guestbook';
import { GuestInfo } from '../types';

interface InvitationContentProps {
  guest: GuestInfo;
}

export default function InvitationContent({ guest }: InvitationContentProps) {
  // Navigation scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { title: 'Beranda', icon: <BookOpen className="w-4 h-4" />, id: 'hero-section' },
    { title: 'Waktu & Tempat', icon: <Clock className="w-4 h-4" />, id: 'event-details-composite' },
    { title: 'Ucapan', icon: <Heart className="w-4 h-4" />, id: 'guestbook-section' },
  ];

  return (
    <div id="invitation-scroll-body" className="min-h-screen bg-geometric-islamic text-slate-800 pb-28 pt-4 relative md:px-0">
      
      {/* Decorative Elegant Islamic Geometric Top Border Ribbon */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sky-200 via-sky-400 to-sky-200 z-30"></div>

      {/* Floating Bottom Navigator for smart phone ergonomics */}
      <nav id="floating-menu" className="fixed bottom-6 inset-x-0 mx-auto w-max max-w-[calc(100%-2rem)] bg-white/90 backdrop-blur border border-sky-100 px-4 py-2.5 rounded-full shadow-lg z-40 flex items-center gap-1.5 md:gap-3">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(item.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-600 hover:text-sky-700 hover:bg-sky-50 text-xs font-semibold cursor-pointer transition-all duration-300"
          >
            {item.icon}
            <span className="hidden sm:inline">{item.title}</span>
          </button>
        ))}
      </nav>

      {/* Background Subtle Shapes */}
      <div className="absolute inset-x-0 top-1/4 h-[800px] pointer-events-none opacity-20 overflow-hidden z-0">
        <div className="absolute -left-20 top-20 w-96 h-96 bg-sky-200 rounded-full blur-3xl"></div>
        <div className="absolute -right-20 top-80 w-96 h-96 bg-sky-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-16 px-4 relative z-10 md:px-6">
        
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <Hero guestName={guest.name} />
        </motion.div>

        {/* QURAN VERSE SECTION */}
        <motion.section
          id="quran-verse-card"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-white/80 border border-sky-100/70 p-6 md:p-8 rounded-3xl shadow-xs text-center relative"
        >
          <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-2 text-sky-200/50">
            <svg className="w-16 h-16 rotate-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21l-1.45-1.32C5.4 14.84 2 11.77 2 8c0-3.31 2.69-6 6-6 1.88 0 3.68.96 4.75 2.5C13.82 2.96 15.62 2 17.5 2c3.31 0 6 2.69 6 6 0 3.77-3.4 6.84-8.55 11.69L12 21z"/>
            </svg>
          </div>
          
          <div className="space-y-4">
            <div className="text-sky-600 font-semibold text-xs tracking-wider uppercase">
              Mukaddimah Doa Walimatul Khitan
            </div>

            {/* Arabic Text */}
            <p className="font-serif text-lg md:text-xl text-sky-900 leading-loose tracking-wide font-medium">
              وَوَصَّيْنَا الْإِنْسَانَ بِوَالِدَيْهِ حَمَلَتْهُ أُمُّهُ وَهْنًا عَلَىٰ وَهْنٍ وَفِصَالُهُ فِي عَامَيْنِ أَنِ اشْكُرْ لِي وَلِوَالِدَيْكَ إِلَيَّ الْمَصِيرُ
            </p>

            {/* Translation Text */}
            <p className="text-slate-500 text-xs leading-relaxed max-w-lg mx-auto">
              &ldquo;Dan Kami perintahkan kepada manusia (berbuat baik) kepada dua orang ibu-bapaknya; ibunya telah mengandungnya dalam keadaan lemah yang bertambah-tambah, dan menyapihnya dalam dua tahun. Bersyukurlah kepada-Ku dan kepada dua orang ibu bapakmu, hanya kepada-Kulah kembalimu.&rdquo; <span className="font-semibold text-sky-700">(QS. Luqman: 14)</span>
            </p>

            <div className="border-t border-sky-50 pt-2 text-[10px] text-slate-400">
              *Syukuran Khitan merupakan bentuk perwujudan syukur atas kesucian jiwa putra kami.
            </div>
          </div>
        </motion.section>

        {/* COUNTDOWN */}
        <motion.section
          id="countdown-section"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Countdown />
        </motion.section>

        {/* AGENDA & DESTINATIONS DETAILS */}
        <motion.section
          id="agenda-section"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <EventDetails />
        </motion.section>



        {/* GUESTBOOK WISHING FORUM */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Guestbook />
        </motion.div>

        {/* INVITATION FOOTER / CLOSING CARD */}
        <motion.footer
          id="closing-card"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-gradient-to-b from-white to-sky-50/50 border border-sky-150 p-8 rounded-3xl shadow-sm text-center space-y-6"
        >
          <div className="mx-auto w-12 h-12 text-sky-400 rotate-45 mb-2">
            <svg className="w-full h-full text-sky-400 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.963 11.963 0 0112 12a11.963 11.963 0 01-7.843-4.418" />
            </svg>
          </div>

          <div className="space-y-3 px-2">
            <p className="text-sm font-semibold text-sky-700 tracking-wider uppercase">Terima Kasih</p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
              Merupakan sebuah kehormatan dan kebahagiaan bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi putra kami.
            </p>
            <p className="text-xs text-slate-500">
              Atas kehadiran dan doa restu Anda semua, kami haturkan limpah terima kasih yang tulus.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-serif text-sm text-slate-400 uppercase tracking-widest">Keluarga Yang Berbahagia:</h4>
            <p className="text-lg font-bold font-serif text-sky-800">
              Kel. Bapak Moch. Eva Isyabillah & Ibu Sustiyawati
            </p>
            <p className="text-xs font-semibold text-sky-500">Beserta keluarga besar</p>
          </div>

          <div className="text-[10px] text-slate-400 font-mono pt-4 border-t border-sky-100">
            © 2026 Muhammad Shahdan Akbar Digital Invitation
          </div>
        </motion.footer>

      </div>
    </div>
  );
}
