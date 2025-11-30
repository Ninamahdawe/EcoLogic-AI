import React, { useState } from 'react';
import { Search, Filter, ArrowLeft, Heart as HeartIcon, X } from 'lucide-react';

export function CollectionBrowser({ collection, onBack }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedItems, setLikedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [proposalData, setProposalData] = useState({ item: '', message: '' });

  const allItems = [
    { id: 1, name: 'Vintage Polaroid Camera', price: 250, image: '', seller: 'Sarah M.', level: 15, rating: 4.9 },
    { id: 2, name: 'Harry Potter Complete Set', price: 150, image: '', seller: 'Mike R.', level: 8, rating: 4.8 },
    { id: 3, name: 'Yoga Mat & Blocks', price: 120, image: '', seller: 'Emma L.', level: 22, rating: 5.0 },
    { id: 4, name: 'Designer Handbag', price: 300, image: '', seller: 'Lisa K.', level: 18, rating: 4.9 },
    { id: 5, name: 'Kids Building Blocks Set', price: 100, image: '', seller: 'Tom H.', level: 5, rating: 4.7 },
    { id: 6, name: 'Wireless Headphones', price: 200, image: '', seller: 'Alex P.', level: 12, rating: 4.8 },
    { id: 7, name: 'Vintage Record Player', price: 350, image: '', seller: 'Jazz Fan', level: 19, rating: 4.9 },
    { id: 8, name: 'Mountain Bike', price: 400, image: '', seller: 'Active Joe', level: 20, rating: 5.0 },
    { id: 9, name: 'Coffee Maker', price: 80, image: '', seller: 'Coffee Lover', level: 7, rating: 4.6 },
    { id: 10, name: 'Gaming Console', price: 280, image: '', seller: 'Gamer Girl', level: 16, rating: 4.9 },
    { id: 11, name: 'Digital Camera', price: 220, image: '', seller: 'Photo Pro', level: 14, rating: 4.8 },
    { id: 12, name: 'Tent & Camping Gear', price: 180, image: '', seller: 'Outdoors', level: 11, rating: 4.7 },
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
    <div className="space-y-6">
      {/* Header */}
      <div className={`bg-gradient-to-br ${collection.color} text-white rounded-3xl p-8`}>
        <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-4xl font-bold mb-2">{collection.title}</h1>
        <p className="text-white/90">{collection.details}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center border border-emerald-200">
          <p className="text-gray-600 text-sm mb-2">Total Items</p>
          <p className="text-4xl font-bold text-emerald-600">{collection.items}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center border border-emerald-200">
          <p className="text-gray-600 text-sm mb-2">Active Users</p>
          <p className="text-4xl font-bold text-emerald-600">{collection.active}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center border border-emerald-200">
          <p className="text-gray-600 text-sm mb-2">Trend</p>
          <p className="text-2xl font-bold text-emerald-600">{collection.badge}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-4 w-5 h-5 text-emerald-600" />
          <input 
            type="text" 
            placeholder="Search items in this collection..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3 bg-white border-2 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedFilter === 'all' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Items ({filteredItems.length})
          </button>
          <button 
            onClick={() => setSelectedFilter('liked')}
            className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
              selectedFilter === 'liked' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            Liked ({likedItems.length})
          </button>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-emerald-400 hover:shadow-lg transition group">
            {/* Image */}
            <div className="h-40 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-6xl group-hover:scale-110 transition duration-300">
              {item.image}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-sm text-gray-900 flex-1">{item.name}</h4>
                <button 
                  onClick={() => toggleLike(item.id)}
                  className="transition hover:scale-125"
                >
                  <HeartIcon className={`w-5 h-5 ${likedItems.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
              </div>

              <p className="text-lg font-bold text-emerald-600 mb-3">{item.price} pts</p>

              <div className="space-y-2 mb-3 text-xs text-gray-600">
                <p><strong>Seller:</strong> {item.seller} (Lvl {item.level})</p>
                <p><strong>Rating:</strong> {item.rating}</p>
              </div>

              <button onClick={() => handleProposeSwap(item)} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 rounded-lg font-bold hover:shadow-lg transition">
                Propose Swap
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-2xl text-gray-600 mb-2">No items found</p>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Swap Proposal Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">Propose Swap for {selectedItem.name}</h2>
                  </div>
                  <p className="text-gray-600">Offer one of your items in exchange. {selectedItem.seller} will review your proposal.</p>
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
                    <option value="Vintage Camera">Vintage Camera</option>
                    <option value="Wireless Headphones">Wireless Headphones</option>
                    <option value="Dune Series">Dune Series Books</option>
                    <option value="Mountain Bike">Mountain Bike</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Message to {selectedItem.seller}</label>
                  <textarea value={proposalData.message} onChange={(e) => setProposalData({...proposalData, message: e.target.value})} placeholder="Tell them why this would be a great swap..." className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-gray-50 h-32 resize-none" />
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-bold text-emerald-600">Item Value:</span> {selectedItem.price} pts
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-bold text-emerald-600">Transaction Points:</span> <span className="text-emerald-600 font-bold">+15 pts</span>
                  </p>
                  <p className="text-sm text-emerald-600 flex items-center gap-2">
                    Successful swaps boost your trust score
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
