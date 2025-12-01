import React, { useState } from 'react';
import { Search, ArrowLeft, Heart as HeartIcon, X } from 'lucide-react';

export function CollectionBrowser({ collection, onBack }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedItems, setLikedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [proposalData, setProposalData] = useState({ item: '', message: '' });

  const allItems = [
    { id: 1, name: 'Vintage Polaroid Camera', price: 250, image: '📷', seller: 'Sarah M.', level: 15, rating: 4.9 },
    { id: 2, name: 'Harry Potter Complete Set', price: 150, image: '📚', seller: 'Mike R.', level: 8, rating: 4.8 },
    { id: 3, name: 'Yoga Mat & Blocks', price: 120, image: '🧘', seller: 'Emma L.', level: 22, rating: 5.0 },
    { id: 4, name: 'Designer Handbag', price: 300, image: '👜', seller: 'Lisa K.', level: 18, rating: 4.9 },
    { id: 5, name: 'Kids Building Blocks Set', price: 100, image: '🧱', seller: 'Tom H.', level: 5, rating: 4.7 },
    { id: 6, name: 'Wireless Headphones', price: 200, image: '🎧', seller: 'Alex P.', level: 12, rating: 4.8 },
    { id: 7, name: 'Vintage Record Player', price: 350, image: '🎶', seller: 'Jazz Fan', level: 19, rating: 4.9 },
    { id: 8, name: 'Mountain Bike', price: 400, image: '🚲', seller: 'Active Joe', level: 20, rating: 5.0 },
    { id: 9, name: 'Coffee Maker', price: 80, image: '☕️', seller: 'Coffee Lover', level: 7, rating: 4.6 },
    { id: 10, name: 'Gaming Console', price: 280, image: '🎮', seller: 'Gamer Girl', level: 16, rating: 4.9 },
    { id: 11, name: 'Digital Camera', price: 220, image: '📸', seller: 'Photo Pro', level: 14, rating: 4.8 },
    { id: 12, name: 'Tent & Camping Gear', price: 180, image: '⛺️', seller: 'Outdoors', level: 11, rating: 4.7 },
  ];

  const toggleLike = (id) => {
    setLikedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleProposeSwap = (item) => {
    setSelectedItem(item);
    setProposalData({ item: '', message: '' });
  };

  const handleSendProposal = () => {
    if (proposalData.item && proposalData.message) {
      alert(`Swap proposal sent to ${selectedItem.seller}!\n\nItem offered: ${proposalData.item}\nMessage: ${proposalData.message}`);
      setSelectedItem(null);
    } else {
      alert('Please fill in all fields!');
    }
  };

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'liked' && likedItems.includes(item.id));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div className="eco-shell overflow-hidden">
        <div className="rounded-2xl p-8 text-white" style={{ background: 'linear-gradient(120deg, rgba(15,53,40,0.95), rgba(88,164,131,0.85))' }}>
          <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to collections
          </button>
          <h1 className="text-4xl font-semibold mb-2">{collection.title}</h1>
          <p className="text-white/80 max-w-2xl">{collection.details}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total items', value: collection.items },
          { label: 'Active traders', value: collection.active },
          { label: 'Trend marker', value: collection.badge },
        ].map((stat, idx) => (
          <div key={idx} className="eco-shell p-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-canopy/50 mb-2">{stat.label}</p>
            <p className="text-3xl font-semibold text-canopy">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="eco-shell p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-canopy/40" />
          <input
            type="text"
            placeholder="Search items in this collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-6 py-3 bg-white/80 border border-white/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-fern/30"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { id: 'all', label: `All items (${filteredItems.length})` },
            { id: 'liked', label: `Liked (${likedItems.length})` },
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                selectedFilter === filter.id ? 'bg-canopy text-white' : 'bg-white/80 border border-white/60 text-canopy/70'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="eco-shell p-4 space-y-4 transition hover:-translate-y-1">
            <div className="h-40 rounded-2xl bg-gradient-to-br from-fern/10 to-canopy/10 text-6xl flex items-center justify-center">
              {item.image}
            </div>

            <div className="flex items-start justify-between gap-3">
              <h4 className="font-semibold text-canopy flex-1">{item.name}</h4>
              <button
                onClick={() => toggleLike(item.id)}
                className="transition hover:scale-110"
              >
                <HeartIcon className={`w-5 h-5 ${likedItems.includes(item.id) ? 'text-fern fill-fern' : 'text-canopy/30'}`} />
              </button>
            </div>

            <p className="text-lg font-semibold text-canopy">{item.price} pts</p>

            <div className="text-xs text-canopy/60 space-y-1">
              <p>Seller: {item.seller} (Lvl {item.level})</p>
              <p>Rating: {item.rating}</p>
            </div>

            <button onClick={() => handleProposeSwap(item)} className="eco-button w-full justify-center">
              Propose swap
            </button>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="eco-shell text-center py-12">
          <p className="text-xl text-canopy/60">No items found</p>
          <p className="text-sm text-canopy/50 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}

      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="eco-shell max-w-2xl w-full">
            <div className="p-8 border-b border-white/30 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-canopy/50">Proposal</p>
                <h2 className="text-2xl font-semibold text-canopy mt-2">Swap for {selectedItem.name}</h2>
                <p className="text-sm text-canopy/60 mt-1">Offer one of your items in exchange. {selectedItem.seller} will review your proposal.</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-canopy/40 hover:text-canopy transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-canopy/50 mb-2">Select your item</label>
                <select onChange={(e) => setProposalData({...proposalData, item: e.target.value})} className="w-full px-4 py-3 border border-white/50 rounded-2xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-fern/30">
                  <option value="">Choose an item from your collection</option>
                  <option value="Vintage Camera">Vintage Camera</option>
                  <option value="Wireless Headphones">Wireless Headphones</option>
                  <option value="Dune Series">Dune Series Books</option>
                  <option value="Mountain Bike">Mountain Bike</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-canopy/50 mb-2">Message to {selectedItem.seller}</label>
                <textarea value={proposalData.message} onChange={(e) => setProposalData({...proposalData, message: e.target.value})} placeholder="Tell them why this would be a great swap..." className="w-full px-4 py-3 border border-white/50 rounded-2xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-fern/30 h-32 resize-none" />
              </div>

              <div className="bg-fern/10 border border-fern/30 rounded-2xl p-4">
                <p className="text-sm text-canopy/70 mb-2">
                  <span className="font-semibold text-canopy">Item value:</span> {selectedItem.price} pts
                </p>
                <p className="text-sm text-canopy/70">
                  <span className="font-semibold text-canopy">Transaction points:</span> <span className="text-fern font-semibold">+15 pts</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setSelectedItem(null)} className="eco-subtle-button flex-1 justify-center">
                  Cancel
                </button>
                <button onClick={handleSendProposal} className="eco-button flex-1 justify-center">
                  Send proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

