import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { Messaging } from './components/Messaging';
import { ProfilePage } from './components/ProfilePage';
import { AIChatbot } from './components/AIChatbot';
import itemsData from './data/items.json';
import challengesData from './data/challenges.json';

export default function SwapQuest() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Sarah M.',
      avatar: 'S',
      level: 15,
      lastMessage: 'Thanks for the camera! Really happy with it.',
      timestamp: '2 hours ago',
      unread: 2,
      status: 'online',
      messages: [
        { id: 1, sender: 'Sarah M.', text: 'Hi! Is the vintage camera still available?', time: '10:30 AM', own: false },
        { id: 2, sender: 'You', text: 'Yes! It\'s in excellent condition. Would you like to swap?', time: '10:45 AM', own: true },
        { id: 3, sender: 'Sarah M.', text: 'What are you looking for?', time: '11:00 AM', own: false },
        { id: 4, sender: 'You', text: 'Do you have any books? I\'m looking for sci-fi novels', time: '11:15 AM', own: true },
        { id: 5, sender: 'Sarah M.', text: 'I have a complete Dune series! Would that work?', time: '11:30 AM', own: false },
        { id: 6, sender: 'You', text: 'Perfect! Let\'s make the swap', time: '11:45 AM', own: true },
        { id: 7, sender: 'Sarah M.', text: 'Thanks for the camera! Really happy with it.', time: '2:00 PM', own: false },
      ]
    },
    {
      id: 2,
      name: 'Mike R.',
      avatar: 'M',
      level: 8,
      lastMessage: 'When can you pick it up?',
      timestamp: '1 hour ago',
      unread: 1,
      status: 'online',
      messages: [
        { id: 1, sender: 'Mike R.', text: 'Hi, interested in the Harry Potter set?', time: '9:00 AM', own: false },
        { id: 2, sender: 'You', text: 'Yes! What condition is it in?', time: '9:15 AM', own: true },
        { id: 3, sender: 'Mike R.', text: 'Perfect condition, hardcovers. Never read.', time: '9:30 AM', own: false },
        { id: 4, sender: 'You', text: 'Great! What are you interested in?', time: '10:00 AM', own: true },
        { id: 5, sender: 'Mike R.', text: 'Do you have any electronics?', time: '10:30 AM', own: false },
        { id: 6, sender: 'You', text: 'I have wireless headphones in great shape', time: '11:00 AM', own: true },
        { id: 7, sender: 'Mike R.', text: 'When can you pick it up?', time: '1:00 PM', own: false },
      ]
    },
    {
      id: 3,
      name: 'Emma L.',
      avatar: 'E',
      level: 22,
      lastMessage: 'Would love to swap those yoga mats!',
      timestamp: '3 hours ago',
      unread: 0,
      status: 'offline',
      messages: [
        { id: 1, sender: 'Emma L.', text: 'Love your collection!', time: '8:00 AM', own: false },
        { id: 2, sender: 'You', text: 'Thanks! I love yours too', time: '8:15 AM', own: true },
        { id: 3, sender: 'Emma L.', text: 'Would love to swap those yoga mats!', time: '8:45 AM', own: false },
      ]
    },
  ]);

  const [items] = useState(itemsData);
  const [challenges] = useState(challengesData);

  const unreadCount = conversations.reduce((acc, conv) => acc + conv.unread, 0);

  const renderPage = () => {
    if (currentPage === 'home') {
      return <HomePage items={items} />;
    }
    if (currentPage === 'dashboard') {
      return (
        <Dashboard
          selectedChallenge={selectedChallenge}
          setSelectedChallenge={setSelectedChallenge}
          challenges={challenges}
        />
      );
    }
    if (currentPage === 'messages') {
      return <Messaging conversations={conversations} setConversations={setConversations} />;
    }
    return <ProfilePage />;
  };

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 right-0 w-[520px] h-[520px] bg-fern/20 blur-3xl rounded-full"></div>
        <div className="absolute top-1/3 -left-40 w-[480px] h-[480px] bg-canopy/10 blur-3xl rounded-full"></div>
      </div>

      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} unreadCount={unreadCount} />

      <main id="main" className="max-w-[1400px] mx-auto px-6 sm:px-10 py-12" role="main" aria-label="SwapQuest content">
        <div className="relative">
          {currentPage === 'home' && (
            <div className="hidden xl:block absolute left-6 top-0 bottom-0 w-16">
              <div className="h-full w-px bg-gradient-to-b from-canopy/30 via-fern/40 to-transparent mx-auto"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-8 w-10 h-10 rounded-full bg-white/70 border border-white/60 backdrop-blur-xl shadow-branch flex items-center justify-center text-canopy font-semibold">
                🌱
              </div>
            </div>
          )}
          <div className="space-y-16 xl:pl-24">
            {currentPage === 'home' && (
              <section className="eco-shell p-8 shadow-branch relative overflow-hidden">
                <div className="absolute inset-y-0 right-0 w-1/2 opacity-40 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-l from-fern/30 to-transparent mix-blend-multiply"></div>
                </div>
                <div className="relative">
                  <p className="uppercase tracking-[0.35em] text-xs text-canopy/60 mb-4">Eco System</p>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-semibold text-canopy">Nothing to waste. Everything to share.</h2>
                      <p className="mt-4 text-canopy/70 max-w-2xl">
                        SwapQuest surfaces the most meaningful swaps across your community, balances
                        giving and receiving, and keeps your sustainability momentum visible at every step.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 min-w-[220px]">
                      <button
                        className="eco-subtle-button justify-center"
                        onClick={() => setCurrentPage('dashboard')}
                      >
                        View Impact Dashboard
                      </button>
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-canopy/70">
                    {[
                      { label: 'Community Swaps', value: '5,482' },
                      { label: 'Items Rescued', value: '18,210' },
                      { label: 'Avg. Response', value: '12 min' },
                      { label: 'Carbon Offset', value: '38.4 tons' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/60 border border-white/50 rounded-2xl px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-canopy/60">{stat.label}</p>
                        <p className="text-2xl font-semibold text-canopy mt-1">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <section className="space-y-10">
              {renderPage()}
            </section>
          </div>
        </div>
      </main>

      <AIChatbot />
    </div>
  );
}
