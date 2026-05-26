/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, MapPin, Sparkles, CalendarDays } from 'lucide-react';

export default function EventDetails() {
  const gCalLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Syukuran+Khitan+Muhammad+Shahdan+Akbar&dates=20260620T020000Z/20260620T080000Z&details=Kehadiran+Bapak/Ibu/Saudara/i+merupakan+suatu+kehormatan+bagi+kami.+Terima+kasih.&location=Jl.+Semolowaru+Utara+IA+no+26,+Semolowaru,+Kec.+Sukolilo,+Kota+Surabaya,+Jawa+Timur`;

  return (
    <div id="event-details-composite" className="max-w-2xl mx-auto px-4 py-6">
      
      {/* Centered Event Details Card */}
      <div className="bg-white/95 backdrop-blur-xs border border-sky-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-sky-100/30 transition duration-300 space-y-6 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-600 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            Waktu & Tempat Acara
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-sky-900 mt-2">
            Syukuran & Walimatul Khitan
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto">
            Merupakan sebuah kebahagiaan sekiranya Bapak/Ibu/Saudara/i berkenan hadir di acara syukuran ini untuk melantunkan doa keselamatan bagi tumbuh kembang ananda Shahdan.
          </p>

          <div className="border-t border-b border-sky-50 py-4 my-4 divide-y divide-sky-50/50">
            {/* Date Details */}
            <div className="py-3">
              <span className="text-[10px] text-sky-500 uppercase tracking-widest font-bold block mb-1">Hari & Tanggal</span>
              <p className="text-base font-bold text-slate-800">Sabtu, 20 Juni 2026</p>
              <p className="text-xs text-slate-500 font-medium">Pukul 09.00 WIB - Selesai</p>
            </div>

            {/* Address Details */}
            <div className="py-3">
              <span className="text-[10px] text-sky-500 uppercase tracking-widest font-bold block mb-1">Lokasi Syukuran</span>
              <h3 className="text-base font-serif font-bold text-sky-900 mb-1">RUMAH</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                Jl. Semolowaru Utara IA no 26, Semolowaru, Kec. Sukolilo, Kota Surabaya, Jawa Timur
              </p>
            </div>
          </div>
        </div>

        {/* Calendar and Navigation Buttons Side-by-Side or Stacked */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
          <a
            href={gCalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-50 border border-sky-100 text-sky-700 hover:bg-sky-100/50 transition font-semibold text-xs rounded-full shadow-xs justify-center cursor-pointer"
          >
            <CalendarDays className="w-4 h-4 text-sky-600" />
            Simpan ke Google Calendar
          </a>

          <a
            href="https://maps.app.goo.gl/j6bVXa7L5KnHiAJk7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-98 text-white font-semibold text-xs rounded-full shadow-md hover:shadow-sky-200 transition-all duration-300 justify-center cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-sky-250 animate-bounce" />
            Petunjuk Arah Google Maps
          </a>
        </div>
      </div>

    </div>
  );
}
