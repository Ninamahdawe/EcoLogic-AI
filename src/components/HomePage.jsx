import React, { useState, useMemo } from 'react';
import { Gift, TrendingUp, Search, Zap, X, Compass, Leaf, Sparkles } from 'lucide-react';
import { CollectionBrowser } from './CollectionBrowser';
import itemsData from '../data/items.json';
import collectionsData from '../data/collections.json';

export function HomePage({ items: initialItems }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [proposalData, setProposalData] = useState({ item: '', message: '' });
  const [browsingCollection, setBrowsingCollection] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const items = initialItems || itemsData;
  const collections = collectionsData;
  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Toys', 'Home Decor', 'Sports'];

  const canopyNodes = [
    { title: 'Discover conscious collections', detail: 'Curated drops refreshed hourly with your preferences.', metric: '7 live curations' },
    { title: 'Offer what you love', detail: 'Use the proposal flow to match items with similar impact.', metric: '4 offers pending' },
    { title: 'Celebrate impact', detail: 'Every completed swap feeds your forest and the community map.', metric: '+342 pts this week' },
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
      alert(`Swap proposal sent to ${selectedItem.user}!\n\nItem offered: ${proposalData.item}\nMessage: ${proposalData.message}`);
      setSelectedItem(null);
    } else {
      alert('Please fill in all fields!');
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.user.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  return (
    <div className="space-y-10">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>

      <section className="space-y-8">
        <div className="space-y-8">
          <div className="space-y-6 rounded-2xl border border-white/50 bg-white/80 p-8 shadow-canopy relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_top,_rgba(123,184,147,0.2),_transparent_55%)]"></div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.45em] text-canopy/50">Search & discover</p>
              <h2 className="text-3xl font-semibold text-canopy">Point to anything you want to rescue.</h2>
              <p className="text-sm text-canopy/60 max-w-2xl">Use natural language, precise filters, or even curator names. We’ll surface high-trust matches instantly.</p>
            </div>

            <div className="relative group mt-4">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-canopy/30" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search “modular shelf”, “books level 10”, “Hannah’s curated drop”…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search swaps, collections, and curators"
                className="w-full pl-20 pr-6 py-6 rounded-xl border border-white/60 bg-white text-lg text-canopy placeholder:text-canopy/40 focus:outline-none focus:ring-4 focus:ring-fern/30 shadow-branch"
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 text-xs uppercase tracking-[0.4em] text-canopy/30 hidden sm:block">EcoLogic</div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {['high trust', 'nearby', 'ready to donate'].map(tag => (
                <span key={tag} className="eco-chip text-xs">{tag}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold ${
                  selectedCategory === cat
                    ? 'bg-canopy text-white shadow-branch'
                    : 'bg-white/70 border border-white/60 text-canopy/70 hover:text-canopy'
                }`}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-4" role="region" aria-labelledby="collections-heading">
            <div className="flex items-center justify-between">
              <h3 id="collections-heading" className="flex items-center gap-3 text-2xl font-semibold text-canopy">
                <Gift className="w-6 h-6 text-fern" />
                Featured collections
              </h3>
              <p className="text-sm text-canopy/60 hidden md:block">Shaped by curators across the community</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {collections.map((collection, idx) => (
                <div
                  key={collection.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-branch p-6 space-y-4 transition hover:-translate-y-1 cursor-pointer"
                  onMouseEnter={() => setHoveredCard(`collection-${idx}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-fern/15 text-fern flex items-center justify-center font-semibold text-lg">
                      {collection.title.charAt(0)}
                    </div>
                    <span className="eco-chip">{collection.badge}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-canopy">{collection.title}</h4>
                    <p className="text-sm text-canopy/70 mt-1">{collection.desc}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-canopy/60">
                    <span>{collection.items} items</span>
                    <span>{collection.active} active</span>
                  </div>
                  <button
                    onClick={() => setBrowsingCollection(collection)}
                    className="eco-subtle-button w-full justify-center mt-3"
                  >
                    Explore collection
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4" role="region" aria-labelledby="trending-heading">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-fern" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-canopy/50">Watch list</p>
                  <h3 id="trending-heading" className="text-2xl font-semibold text-canopy">Trending now</h3>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="eco-chip flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Guided by AI
                </span>
                <span className="eco-chip flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Organic picks
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.length === 0 ? (
                <div className="col-span-full text-center py-12 eco-shell">
                  <p className="text-xl text-canopy/60">No items found matching your search.</p>
                  <button
                    onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                    className="eco-button mt-6"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                filteredItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="group relative rounded-2xl border border-white/50 bg-white/80 shadow-branch overflow-hidden transition hover:-translate-y-1"
                    onMouseEnter={() => setHoveredCard(`item-${idx}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-fern/10 to-canopy/10">
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,_rgba(255,255,255,0.6),_transparent_60%)]"></div>
                      <span className={`text-7xl transition-all duration-500 ${hoveredCard === `item-${idx}` ? 'scale-125 rotate-6' : ''}`}>
                        {item.image}
                      </span>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-canopy/40">{item.category}</p>
                          <h4 className="font-semibold text-canopy mt-1">{item.title}</h4>
                        </div>
                        <span className="eco-chip text-xs">{item.status}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-fern/15 text-fern flex items-center justify-center font-semibold">
                          {item.user.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-canopy">{item.user}</p>
                          <p className="text-xs text-canopy/60">Level {item.level}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-fern">{item.points} pts</p>
                      <button
                        onClick={() => handleProposeSwap(item)}
                        className="eco-button w-full"
                      >
                        {item.action}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-r from-canopy/90 via-cedar to-fern/80 text-white p-8 shadow-canopy">
          <div className="absolute inset-y-0 right-0 w-1/2 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_55%)]"></div>
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/70 mb-2">Daily rhythm</p>
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6" />
                <p className="text-xl font-semibold">3 swaps for the Canopy Burst badge</p>
              </div>
              <p className="text-sm text-white/80 mt-2 max-w-xl">Complete three conscious exchanges today to unlock a limited badge and boost your forest score.</p>
            </div>
            <button
              onClick={() => alert('Daily Challenge Started!\n\nSwap 3 items today to earn 50 bonus points and unlock the "Triple Trader" badge!\n\nGood luck!')}
              className="eco-button bg-white/15 text-white border border-white/40"
            >
              Start challenge
            </button>
          </div>
        </div>
      </section>

      <section className="eco-shell p-8 space-y-6">
        <div className="flex items-center gap-3">
          <Leaf className="w-6 h-6 text-fern" />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-canopy/50">Flow</p>
            <h3 className="text-2xl font-semibold text-canopy">Tree-form path</h3>
          </div>
        </div>
        <div className="tree-spine">
          {canopyNodes.map((node, idx) => (
            <div key={idx} className="tree-node">
              <p className="text-sm uppercase tracking-[0.4em] text-canopy/40 mb-2">Branch {idx + 1}</p>
              <h4 className="text-lg font-semibold text-canopy">{node.title}</h4>
              <p className="text-sm text-canopy/70 mt-1">{node.detail}</p>
              <p className="text-xs text-fern font-semibold mt-3">{node.metric}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="eco-shell max-w-2xl w-full">
            <div className="px-8 py-6 border-b border-white/30 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-canopy/40">Proposal</p>
                <h2 className="text-2xl font-semibold text-canopy mt-2">Swap for {selectedItem.title}</h2>
                <p className="text-sm text-canopy/60 mt-1">Offer one of your items in exchange. {selectedItem.user} will review your proposal.</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-canopy/50 hover:text-canopy transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-canopy/50 mb-3">Select your item</label>
                <select
                  onChange={(e) => setProposalData({ ...proposalData, item: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/80 focus:outline-none focus:ring-2 focus:ring-fern/40"
                >
                  <option value="">Choose an item from your collection</option>
                  <option value="Vintage Camera">Vintage Camera</option>
                  <option value="Wireless Headphones">Wireless Headphones</option>
                  <option value="Dune Series">Dune Series Books</option>
                  <option value="Mountain Bike">Mountain Bike</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-canopy/50 mb-3">Message to {selectedItem.user}</label>
                <textarea
                  value={proposalData.message}
                  onChange={(e) => setProposalData({ ...proposalData, message: e.target.value })}
                  placeholder="Tell them why this would be a great swap..."
                  className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/80 focus:outline-none focus:ring-2 focus:ring-fern/40 h-32 resize-none"
                />
              </div>

              <div className="bg-fern/10 border border-fern/20 rounded-2xl p-4">
                <p className="text-sm text-canopy/70">
                  <span className="font-semibold text-canopy">Item value:</span> {selectedItem.points} pts
                </p>
                <p className="text-sm text-canopy/70 mt-2">
                  <span className="font-semibold text-canopy">Transaction points:</span>{' '}
                  <span className="text-fern font-semibold">+15 pts</span>
                </p>
                <p className="text-xs text-canopy/60 mt-2">Successful swaps boost your trust score.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="eco-subtle-button flex-1 justify-center"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendProposal}
                  className="eco-button flex-1 justify-center"
                >
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
