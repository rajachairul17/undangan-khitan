/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Heart, User, Users, Calendar } from 'lucide-react';
import { Wish } from '../types';

export default function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Teman');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Setup initial seeded/mock wishes so the board looks lively and inviting out-of-the-box
  const SEED_WISHES: Wish[] = [
    {
      id: 'seed-1',
      name: 'Ustadz Ahmad Fauzi & Keluarga',
      relation: 'Guru / Tokoh Agama',
      message: 'Barakallah, selamat berkhitan untuk ananda Muhammad Shahdan Akbar. Semoga setelah dikhitan ini ananda tumbuh menjadi anak yang sholeh, berbakti kepada kedua orang tua, rajin beribadah, dan kelak menjadi tauladan yang membawa berkah bagi umat. Aamiin ya Rabbal Alamin.',
      createdAt: '2026-05-26T08:30:00.000Z',
    },
    {
      id: 'seed-2',
      name: 'Tante Sarah & Om Hermawan',
      relation: 'Keluarga Besar',
      message: 'Selamat ya Shahdan sayang! Semoga lekas pulih, tumbuh menjadi anak yang cerdas, pemberani, berakhlak mulia, dan selalu dalam lindungan kasih sayang Allah SWT. Semangat memasuki fase kedewasaan baru!',
      createdAt: '2026-05-25T14:15:00.000Z',
    },
    {
      id: 'seed-3',
      name: 'Bapak Lurah Syarifuddin',
      relation: 'Kerabat / Tetangga',
      message: 'Semoga prosesi syukuran khitanan ananda Shahdan berjalan lancar tanpa kendala. Kami bertetangga mendoakan semoga ia tumbuh sehat, cerdas, kreatif, menjadi penerus bangsa yang membanggakan orang tua serta lingkungannya.',
      createdAt: '2026-05-25T01:10:00.000Z',
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('undangan_khitan_wishes');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        setWishes(SEED_WISHES);
      }
    } else {
      setWishes(SEED_WISHES);
      localStorage.setItem('undangan_khitan_wishes', JSON.stringify(SEED_WISHES));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      relation: relation,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem('undangan_khitan_wishes', JSON.stringify(updatedWishes));

    setName('');
    setMessage('');
    setIsSubmitted(true);
    
    // Reset submission banner
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return '';
    }
  };

  return (
    <section id="guestbook-section" className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Prayer Form Side */}
      <div className="md:col-span-5 bg-white/95 border border-sky-100 rounded-3xl p-6 shadow-xs h-fit space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sky-600 font-semibold text-xs uppercase tracking-wider">
            <Heart className="w-4.5 h-4.5 text-rose-400 fill-rose-100 animate-pulse" />
            Kirim Doa Restu
          </div>
          <h3 className="font-serif text-xl font-bold text-sky-900">
            Kolom Ucapan Doa
          </h3>
          <p className="text-xs text-slate-500">
            Tuliskan doa serta ucapan terbaik Anda untuk memberi semangat kekuatan bagi ananda Shahdan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Nama Lengkap</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1.5 focus:ring-sky-300 focus:bg-white text-sm rounded-xl py-2 pl-9 pr-3 text-slate-800 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Hubungan / Kerabat</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Users className="w-4 h-4" />
              </span>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1.5 focus:ring-sky-300 focus:bg-white text-sm rounded-xl py-2 pl-9 pr-3 text-slate-800 transition appearance-none cursor-pointer"
              >
                <option value="Teman / Sahabat Shahdan">Teman / Sahabat Shahdan</option>
                <option value="Keluarga Besar">Keluarga Besar</option>
                <option value="Tetangga Dekat">Tetangga Dekat</option>
                <option value="Kerabat Orang Tua">Kerabat Orang Tua</option>
                <option value="Tamu Umum">Tamu Umum</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Doa & Ucapan Hangat</label>
            <textarea
              required
              rows={4}
              maxLength={450}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan selamat khitan serta doa terbaik bagi kesholehan & prestasi Shahdan..."
              className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1.5 focus:ring-sky-300 focus:bg-white text-sm rounded-xl py-2.5 px-3 text-slate-800 transition resize-none leading-relaxed"
            />
            <div className="text-[10px] text-right text-slate-400">
              {message.length}/450 karakter
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-98 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-sky-100 transition-all duration-300 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Kirim Doa Restu
          </button>
        </form>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-center text-emerald-800 text-xs font-medium"
            >
              🎉 Doa restu Anda berhasil terkirim dan tercatat! Terima kasih banyak.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Wishes Feed Side */}
      <div className="md:col-span-7 space-y-4">
        <div className="flex items-center justify-between border-b border-sky-50 pb-2">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-5 h-5 text-sky-600" />
            <h3 className="font-serif text-lg font-bold text-sky-900">
              Doa & Ucapan dari Tamu
            </h3>
          </div>
          <span className="bg-sky-100 text-sky-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-sky-200">
            {wishes.length} Doa Terkumpul
          </span>
        </div>

        {/* Wishes List Board with scrollable height */}
        <div id="wishes-feed-container" className="space-y-4 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-sky-100">
          <AnimatePresence initial={false}>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-sky-100/50 p-4 rounded-2xl shadow-xs space-y-2 hover:bg-sky-50/20 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 capitalize leading-tight">
                      {wish.name}
                    </h4>
                    <span className="inline-block bg-sky-50 text-sky-700 text-[9px] font-bold px-2 py-0.5 rounded-md mt-1 border border-sky-100/30">
                      {wish.relation}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                    <Calendar className="w-3 h-3" />
                    {formatDate(wish.createdAt)}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-2.5 rounded-xl border border-dashed border-slate-100">
                  {wish.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
