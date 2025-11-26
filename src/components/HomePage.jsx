import React, { useState } from 'react';
import { Gift, TrendingUp, Search, Star, Flame, Award, Trophy, Zap, X } from 'lucide-react';
import { CollectionBrowser } from './CollectionBrowser';

export function HomePage({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [proposalData, setProposalData] = useState({ item: '', message: '' });
  const [browsingCollection, setBrowsingCollection] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const categories = ['Electronics', 'Clothing', 'Books', 'Toys', 'Home Decor', 'Sports'];

  const collections = [
    { 
      id: 1,
      title: 'Back to School Essentials', 
      desc: 'Books, supplies, and gear for students',
      icon: '🎁',
      items: 156,
      active: 42,
      badge: 'Hot',
      color: 'from-teal-600 to-cyan-700',
      details: 'Find everything you need for back to school. From textbooks to desk supplies, laptops to stationery.'
    },
    { 
      id: 2,
      title: 'Sustainable Fashion', 
      desc: 'Pre-loved clothes finding new homes',
      icon: '🎁',
      items: 234,
      active: 89,
      badge: 'Trending',
      color: 'from-green-600 to-teal-600',
      details: 'Discover amazing pre-loved fashion items. Shop sustainably and give clothes a second life.'
    },
    { 
      id: 3,
      title: 'Tech & Gadgets', 
      desc: 'Electronics, accessories, and more',
      icon: '🎁',
      items: 98,
      active: 67,
      badge: 'Popular',
      color: 'from-cyan-600 to-blue-700',
      details: 'Explore the latest tech gadgets, electronics, and accessories. Find great deals on quality items.'
    },
  ];

  if (browsingCollection) {
    return <CollectionBrowser collection={browsingCollection} onBack={() => setBrowsingCollection(null)} />;
  }

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
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.6); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(16, 185, 129, 0.3); }
          50% { border-color: rgba(16, 185, 129, 0.8); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-pulse-border { animation: pulse-border 2s ease-in-out infinite; }
        .card-hover { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>

      {/* Stats Cards - Green & Cool Tones */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Star, label: 'Your Level', value: 'Level 12', progress: 60, color: 'from-teal-500 to-green-600' },
          { icon: Flame, label: 'Daily Streak', value: '7 Days', color: 'from-cyan-500 to-teal-600', sublabel: 'Keep it going! 🔥' },
          { icon: Award, label: 'Achievements', value: '3/6', color: 'from-green-500 to-emerald-600' },
          { icon: Trophy, label: 'Status', value: 'Silver', color: 'from-blue-500 to-cyan-600' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-xl p-6 card-hover cursor-pointer ${hoveredCard === i ? 'scale-105 shadow-2xl' : 'hover:scale-105 hover:shadow-2xl'}`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 group-hover:from-white/10 group-hover:to-white/20 transition"></div>
              <div className="absolute -right-8 -top-8 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition duration-500"></div>
              
              <div className="relative">
                <div className={`mb-3 inline-block ${hoveredCard === i ? 'animate-float' : ''}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-white/70 mb-1 font-semibold uppercase tracking-wider">{stat.label}</p>
                <p className="text-4xl font-black mb-2">{stat.value}</p>
                {stat.sublabel && <p className="text-xs text-white/60 group-hover:text-white/80 transition">{stat.sublabel}</p>}
                {stat.progress && <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: hoveredCard === i ? '100%' : `${stat.progress}%` }}></div>
                </div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats - Green & Teal Gradient */}
      <div className="bg-gradient-to-r from-teal-50/80 to-cyan-50/80 backdrop-blur-xl rounded-2xl border border-teal-200/50 p-6 flex justify-around shadow-lg hover:shadow-xl transition card-hover">
        {[
          { label: 'Total Swaps', value: '47', icon: '🔄' },
          { label: 'Donations', value: '23', icon: '❤️' },
          { label: 'Impact Score', value: '98/100', icon: '⭐' },
        ].map((stat, i) => (
          <div key={i} className="text-center group cursor-pointer">
            <p className={`text-3xl mb-2 group-hover:scale-150 transition duration-300 ${i === 0 ? 'group-hover:rotate-12' : i === 1 ? 'group-hover:-rotate-12' : 'group-hover:animate-bounce'}`}>
              {stat.icon}
            </p>
            <p className="text-teal-700 text-sm font-semibold group-hover:text-teal-800 transition">{stat.label}</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-110 transition duration-300 inline-block">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search with Cool Tone Border */}
      <div className="space-y-3">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-teal-600 group-hover:text-teal-700 transition" />
            <input 
              type="text" 
              placeholder="Search for items to swap or donate..." 
              className="w-full pl-12 pr-6 py-3 bg-gradient-to-r from-green-50/80 to-teal-50/80 backdrop-blur-xl border border-teal-200/50 rounded-2xl focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition shadow-lg group-hover:shadow-2xl group-hover:shadow-teal-500/20"
            />
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat, i) => (
            <button 
              key={cat} 
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-50/60 to-cyan-50/60 backdrop-blur border border-teal-200/50 rounded-full text-teal-700 hover:from-teal-200/40 hover:to-cyan-200/40 hover:border-teal-400 transition-all duration-300 shadow-lg hover:shadow-teal-500/20 hover:scale-110 hover:-translate-y-1"
              style={{
                transitionDelay: `${i * 50}ms`
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge Banner - Green & Teal */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-400/30 to-green-400/30 backdrop-blur-xl border border-teal-200/50 p-8 shadow-2xl hover:shadow-3xl transition card-hover group">
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl group-hover:scale-150 transition duration-500"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-teal-600 animate-pulse group-hover:animate-bounce" />
              <p className="font-bold text-teal-900 text-lg group-hover:text-xl transition">Daily Challenge Available!</p>
            </div>
            <p className="text-sm text-teal-800 group-hover:text-teal-900 transition">Swap 3 items today to earn 50 bonus points and unlock the "Triple Trader" badge</p>
          </div>
          <button 
            onClick={() => alert('🎉 Daily Challenge Started!\n\nSwap 3 items today to earn 50 bonus points and unlock the "Triple Trader" badge!\n\nGood luck! 💪')} 
            className="px-6 py-3 bg-white text-teal-600 rounded-xl font-bold hover:shadow-lg hover:shadow-teal-500/50 transition hover:scale-110 duration-200 active:scale-95"
          >
            Start Challenge
          </button>
        </div>
      </div>

      {/* Featured Collections - Green & Cool Tones */}
      <div>
        <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
          <Gift className="w-7 h-7 text-teal-600 group-hover:animate-float" />
          <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Featured Collections</span>
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {collections.map((collection, idx) => (
            <div 
              key={collection.id} 
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${collection.color} text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer card-hover ${hoveredCard === `collection-${idx}` ? 'scale-105' : 'hover:scale-105'}`}
              onMouseEnter={() => setHoveredCard(`collection-${idx}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-40 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 group-hover:from-white/10 group-hover:to-white/30 transition"></div>
                <div className={`w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-6xl transition-all duration-300 ${hoveredCard === `collection-${idx}` ? 'scale-125 rotate-12' : 'group-hover:scale-125 group-hover:rotate-12'}`}>
                  {collection.icon}
                </div>
                <div className="absolute top-4 right-4 bg-white text-teal-700 px-4 py-2 rounded-full text-sm font-bold group-hover:scale-110 transition duration-300">
                  {collection.badge}
                </div>
              </div>

              <div className="bg-white text-teal-900 p-6">
                <h4 className="font-bold text-lg mb-2 group-hover:text-teal-600 transition">{collection.title}</h4>
                <p className="text-sm text-teal-700 mb-4">{collection.desc}</p>
                
                <div className="flex justify-between items-center mb-4 text-sm text-teal-600 font-semibold">
                  <span className="group-hover:scale-110 transition duration-300 inline-block">📦 {collection.items} items</span>
                  <span className="group-hover:scale-110 transition duration-300 inline-block">👥 {collection.active} active</span>
                </div>

                <button 
                  onClick={() => setBrowsingCollection(collection)}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-teal-500/30 transition hover:scale-105 duration-200 active:scale-95"
                >
                  Explore Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Items - Green & Cool */}
      <div>
        <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-teal-600 animate-bounce" />
          <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Trending Now</span>
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div 
              key={item.id} 
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-b from-teal-50/80 to-cyan-50/80 backdrop-blur-xl border border-teal-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 card-hover ${hoveredCard === `item-${idx}` ? 'scale-105' : 'hover:scale-105'}`}
              onMouseEnter={() => setHoveredCard(`item-${idx}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-48 bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center text-6xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r from-teal-500/0 to-cyan-500/20 group-hover:from-teal-500/10 group-hover:to-cyan-500/30 transition`}></div>
                <span className={`text-7xl transition-all duration-300 ${hoveredCard === `item-${idx}` ? 'scale-150 rotate-6' : 'group-hover:scale-150 group-hover:rotate-6'}`}>
                  {item.image}
                </span>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-sm text-teal-900 line-clamp-2 group-hover:text-teal-600 transition">{item.title}</h4>
                  <span className="text-xs px-3 py-1 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-700 rounded-full whitespace-nowrap group-hover:scale-110 transition duration-300">{item.status}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3 group-hover:scale-110 transition duration-300 origin-left">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-lg">
                    {item.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-teal-900">{item.user}</p>
                    <p className="text-xs text-teal-700">Level {item.level}</p>
                  </div>
                </div>
                
                <p className="text-sm font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition duration-300 inline-block">💰 {item.points} pts</p>
                
                <button 
                  onClick={() => handleProposeSwap(item)} 
                  className="w-full px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition hover:scale-105 duration-200 active:scale-95 group-hover:brightness-110"
                >
                  {item.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Swap Proposal Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">♻️</span>
                    <h2 className="text-2xl font-bold text-teal-900">Propose Swap for {selectedItem.title}</h2>
                  </div>
                  <p className="text-teal-700">Offer one of your items in exchange. {selectedItem.user} will review your proposal.</p>
                </div>
                <button onClick={() => setSelectedItem(null)} className="text-teal-500 hover:text-teal-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-teal-900 mb-3">Select Your Item to Offer</label>
                  <select onChange={(e) => setProposalData({...proposalData, item: e.target.value})} className="w-full px-4 py-3 border-2 border-teal-200 rounded-xl focus:outline-none focus:border-teal-500 bg-teal-50">
                    <option value="">Choose an item from your collection</option>
                    <option value="Vintage Camera">📷 Vintage Camera</option>
                    <option value="Wireless Headphones">🎧 Wireless Headphones</option>
                    <option value="Dune Series">📚 Dune Series Books</option>
                    <option value="Mountain Bike">🚴 Mountain Bike</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-teal-900 mb-3">Message to {selectedItem.user}</label>
                  <textarea value={proposalData.message} onChange={(e) => setProposalData({...proposalData, message: e.target.value})} placeholder="Tell them why this would be a great swap..." className="w-full px-4 py-3 border-2 border-teal-200 rounded-xl focus:outline-none focus:border-teal-500 bg-teal-50 h-32 resize-none" />
                </div>

                <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4">
                  <p className="text-sm text-teal-700 mb-3">
                    <span className="font-bold text-teal-600">Item Value:</span> {selectedItem.points} pts
                  </p>
                  <p className="text-sm text-teal-700 mb-3">
                    <span className="font-bold text-teal-600">Transaction Points:</span> <span className="text-teal-600 font-bold">+15 pts</span>
                  </p>
                  <p className="text-sm text-teal-600 flex items-center gap-2">
                    <span>✨</span> Successful swaps boost your trust score
                  </p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setSelectedItem(null)} className="flex-1 px-6 py-3 border-2 border-teal-300 rounded-xl font-bold text-teal-700 hover:bg-teal-50">
                    Cancel
                  </button>
                  <button onClick={handleSendProposal} className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-teal-500/30">
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
