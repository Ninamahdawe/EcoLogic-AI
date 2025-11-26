import React, { useState } from 'react';
import { Gift, TrendingUp, Search, Star, Flame, Award, Trophy, Zap, X } from 'lucide-react';

export function HomePage({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [proposalData, setProposalData] = useState({ item: '', message: '' });
  const categories = ['Electronics', 'Clothing', 'Books', 'Toys', 'Home Decor', 'Sports'];

  const handleProposeSwap = (item) => {
    setSelectedItem(item);
    setProposalData({ item: '', message: '' });
  };

  const handleSendProposal = () => {
    if (proposalData.item && proposalData.message) {
      alert(`✅ Swap proposal sent to ${selectedItem.user}!\n\nItem offered: ${proposalData.item}\nMessage: ${proposalData.message}`);
      setSelectedItem(null);
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Star, label: 'Your Level', value: 'Level 12' },
          { icon: Flame, label: 'Daily Streak', value: '7 Days' },
          { icon: Award, label: 'Achievements', value: '3/6' },
          { icon: Trophy, label: 'Status', value: 'Silver' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/20 p-6 shadow-xl">
              <Icon className="w-6 h-6 text-emerald-600 mb-3" />
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-emerald-600">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-xl rounded-2xl border border-white/20 p-6 flex justify-around shadow-xl">
        {[
          { label: 'Total Swaps', value: '47', icon: '🔄' },
          { label: 'Donations', value: '23', icon: '❤️' },
          { label: 'Impact Score', value: '98/100', icon: '⭐' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl mb-2">{stat.icon}</p>
            <p className="text-emerald-600 text-sm font-semibold">{stat.label}</p>
            <p className="text-2xl font-bold text-emerald-600">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-4 w-5 h-5 text-emerald-600" />
          <input type="text" placeholder="Search for items..." className="w-full pl-12 pr-6 py-3 bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-xl border border-white/20 rounded-2xl" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} className="px-4 py-2 text-sm bg-white/60 border border-white/20 rounded-full hover:bg-emerald-500/20">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-500/30 to-emerald-500/30 rounded-2xl border border-white/20 p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-white text-lg">Daily Challenge Available!</p>
            <p className="text-sm text-white">Swap 3 items today to earn 50 bonus points</p>
          </div>
          <button onClick={() => alert('🎉 Challenge Started!')} className="px-6 py-3 bg-white text-teal-600 rounded-xl font-bold">
            Start Challenge
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-2xl mb-4">Featured Collections</h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { title: 'Back to School', badge: 'Hot' },
            { title: 'Sustainable Fashion', badge: 'Trending' },
            { title: 'Tech & Gadgets', badge: 'Popular' },
          ].map((collection, i) => (
            <div key={i} className="bg-gradient-to-br from-emerald-600 to-teal-600 p-6 text-white rounded-2xl">
              <div className="text-5xl mb-4">🎁</div>
              <h4 className="font-bold text-lg mb-1">{collection.title}</h4>
              <span className="text-xs bg-emerald-400/30 px-3 py-1 rounded-full">{collection.badge}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-2xl mb-4">Trending Now</h3>
        <div className="grid grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white/80 rounded-2xl border border-white/20 shadow-xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-7xl">{item.image}</div>
              <div className="p-5">
                <h4 className="font-bold text-sm mb-3">{item.title}</h4>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full text-white flex items-center justify-center text-xs font-bold">{item.user.charAt(0)}</div>
                  <div>
                    <p className="text-xs font-semibold">{item.user}</p>
                    <p className="text-xs text-gray-600">Level {item.level}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-emerald-600 mb-4">💰 {item.points} pts</p>
                <button onClick={() => handleProposeSwap(item)} className="w-full px-4 py-2 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600">
                  {item.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">♻️</span>
                    <h2 className="text-2xl font-bold text-gray-900">Propose Swap for {selectedItem.title}</h2>
                  </div>
                  <p className="text-gray-600">Offer one of your items in exchange. {selectedItem.user} will review your proposal.</p>
                </div>
                <button onClick={() => setSelectedItem(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Select Your Item to Offer</label>
                  <select onChange={(e) => setProposalData({...proposalData, item: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-gray-50">
                    <option value="">Choose an item from your collection</option>
                    <option value="Vintage Camera">📷 Vintage Camera</option>
                    <option value="Wireless Headphones">🎧 Wireless Headphones</option>
                    <option value="Dune Series">📚 Dune Series Books</option>
                    <option value="Mountain Bike">🚴 Mountain Bike</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Message to {selectedItem.user}</label>
                  <textarea value={proposalData.message} onChange={(e) => setProposalData({...proposalData, message: e.target.value})} placeholder="Tell them why this would be a great swap..." className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-gray-50 h-32 resize-none" />
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-bold text-emerald-600">Item Value:</span> {selectedItem.points} pts
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-bold text-emerald-600">Transaction Points:</span> <span className="text-emerald-600 font-bold">+15 pts</span>
                  </p>
                  <p className="text-sm text-emerald-600 flex items-center gap-2">
                    <span>✨</span> Successful swaps boost your trust score
                  </p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setSelectedItem(null)} className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-900 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={handleSendProposal} className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700">
                    Send Proposal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
