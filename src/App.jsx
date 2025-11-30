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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} unreadCount={unreadCount} />

      <main className="max-w-full mx-auto px-8 py-12">
        {currentPage === 'home' && <div className="max-w-7xl mx-auto"><HomePage items={items} /></div>}
        {currentPage === 'dashboard' && <div className="max-w-7xl mx-auto"><Dashboard selectedChallenge={selectedChallenge} setSelectedChallenge={setSelectedChallenge} challenges={challenges} /></div>}
        {currentPage === 'messages' && <Messaging conversations={conversations} setConversations={setConversations} />}
        {currentPage === 'profile' && <div className="max-w-7xl mx-auto"><ProfilePage /></div>}
      </main>

      <AIChatbot />
    </div>
  );
}
