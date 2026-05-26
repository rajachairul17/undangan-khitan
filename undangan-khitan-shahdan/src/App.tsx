/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Cover from './components/Cover';
import InvitationContent from './components/InvitationContent';
import BackgroundMusic from './components/BackgroundMusic';
import { GuestInfo } from './types';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [guest, setGuest] = useState<GuestInfo>({ name: '' });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleOpenInvitation = (guestInfo: GuestInfo) => {
    setGuest(guestInfo);
    setIsOpen(true);
    // Unlocks browser audio policy correctly by playing inside user interaction handler
    setIsMusicPlaying(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-50 overflow-hidden font-sans antialiased selection:bg-sky-200">
      
      {/* Page transitions */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -80, transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } }}
            className="fixed inset-0 z-50"
          >
            <Cover onOpen={handleOpenInvitation} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="relative min-h-screen"
          >
            {/* Background Calming Synth */}
            <BackgroundMusic isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />

            {/* Active scrollable invitation elements */}
            <InvitationContent guest={guest} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

