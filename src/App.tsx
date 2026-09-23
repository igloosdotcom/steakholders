/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WeekendCountdown from './components/WeekendCountdown';
import StorySection from './components/StorySection';
import SteakDonenessSimulator from './components/SteakDonenessSimulator';
import VideoExperience from './components/VideoExperience';
import InteractiveBoxBuilder from './components/InteractiveBoxBuilder';
import MenuSection from './components/MenuSection';
import ButcherShop from './components/ButcherShop';
import GuestbookSection from './components/GuestbookSection';
import CommunitySection from './components/CommunitySection';
import LocationVisit from './components/LocationVisit';
import ReservationModal from './components/ReservationModal';
import Footer from './components/Footer';
import { MenuItem, ButcherCut } from './types/steakholders';
import { MENU_ITEMS } from './data/content';

export default function App() {
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ item: MenuItem; quantity: number }[]>([
    { item: MENU_ITEMS[0], quantity: 1 } // Pre-load signature box for seamless booking experience
  ]);
  const [preferredDoneness, setPreferredDoneness] = useState<'Rare' | 'Medium Rare' | 'Medium' | 'Well Done'>('Medium Rare');
  const [preferredSauce, setPreferredSauce] = useState<string>('Peppercorn sauce');

  const handleSelectItem = (
    item: MenuItem,
    preferences?: {
      doneness?: 'Rare' | 'Medium Rare' | 'Medium' | 'Well Done';
      sauce?: string;
      replaceDefault?: boolean;
    }
  ) => {
    if (preferences?.doneness) {
      setPreferredDoneness(preferences.doneness);
    }
    if (preferences?.sauce) {
      setPreferredSauce(preferences.sauce);
    }

    setSelectedItems(prev => {
      let baseList = prev;
      if (preferences?.replaceDefault && prev.length === 1 && prev[0].item.id === MENU_ITEMS[0].id) {
        baseList = [];
      }
      const existing = baseList.find(p => p.item.id === item.id);
      if (existing) {
        return baseList.map(p =>
          p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...baseList, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setSelectedItems(prev => {
      return prev
        .map(p => {
          if (p.item.id === id) {
            const newQty = p.quantity + delta;
            return newQty > 0 ? { ...p, quantity: newQty } : null;
          }
          return p;
        })
        .filter(Boolean) as { item: MenuItem; quantity: number }[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems(prev => prev.filter(p => p.item.id !== id));
  };

  const handleClear = () => {
    setSelectedItems([]);
  };

  const handleOpenReserve = () => {
    setIsReserveOpen(true);
  };

  const handleSelectButcherCut = (cut: ButcherCut) => {
    const cutMenuItem: MenuItem = {
      id: cut.id,
      name: `${cut.title} (${cut.weight})`,
      cutType: 'addon',
      description: cut.description,
      price: cut.price,
      image: cut.image,
      details: [cut.cert, cut.weight, 'Price is per kg · Vacuum packed & sealed for longer life']
    };
    handleSelectItem(cutMenuItem);
    setIsReserveOpen(true);
  };

  const handleScrollToVideo = () => {
    const videoElem = document.getElementById('experience');
    if (videoElem) {
      videoElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = selectedItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#09090a] text-[#f5f2eb]">
      <Navbar onOpenReserve={handleOpenReserve} cartCount={totalCartCount} />

      <main>
        <Hero
          onOpenReserve={handleOpenReserve}
          onOpenVideo={handleScrollToVideo}
        />

        {/* Live Weekend Drop Countdown Banner */}
        <WeekendCountdown onOpenReserve={handleOpenReserve} />

        {/* Brand Heritage Spread */}
        <StorySection />

        {/* Interactive Steak Doneness & Thermal Physics Simulator */}
        <SteakDonenessSimulator
          onSelectItem={handleSelectItem}
          onOpenReserve={handleOpenReserve}
        />

        {/* Sizzle & Pour Reel Player with Kitchen Audio */}
        <VideoExperience onOpenReserve={handleOpenReserve} />

        {/* Bespoke Interactive Box Builder Station */}
        <InteractiveBoxBuilder
          onSelectItem={handleSelectItem}
          onOpenReserve={handleOpenReserve}
        />

        {/* Complete Weekend Carte */}
        <MenuSection
          onSelectItem={handleSelectItem}
          onOpenReserve={handleOpenReserve}
        />

        {/* Raw Angus HMC Butcher Shop */}
        <ButcherShop onOpenOrder={handleSelectButcherCut} />

        {/* Genuine Google Reviews (4.9 Rating) */}
        <GuestbookSection />

        {/* VIP WhatsApp Concierge & Instagram Archive */}
        <CommunitySection />

        {/* Collection Hub: Birmingham (Established in London) */}
        <LocationVisit onOpenReserve={handleOpenReserve} />
      </main>

      <Footer />

      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        selectedItems={selectedItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClear={handleClear}
        initialDoneness={preferredDoneness}
        initialSauce={preferredSauce}
      />
    </div>
  );
}
