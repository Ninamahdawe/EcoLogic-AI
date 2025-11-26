import React from 'react';

export function Header({ currentPage, setCurrentPage, unreadCount }) {
  return (
    <header className="bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40 shadow-lg">
      <div className="max-w-full mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
            ♻️
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">SwapQuest</h1>
            <p className="text-xs text-gray-600">Trade. Share. Level Up.</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative text-gray-600 hover:text-emerald-600 transition text-xl hover:scale-125 duration-200">
            🔔
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">3</span>
          </button>
          <button className="text-gray-600 hover:text-emerald-600 transition text-xl hover:scale-125 duration-200">⚙️</button>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition font-bold hover:scale-105 duration-200">
            💚 Donate
          </button>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-full mx-auto px-8 flex gap-8">
          {[
            { id: 'home', label: '🏠 Home' },
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'messages', label: '💬 Messages', badge: unreadCount },
            { id: 'profile', label: '👤 Profile' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(tab.id)}
              className={`py-4 font-bold transition-all duration-300 border-b-2 flex items-center gap-2 relative ${
                currentPage === tab.id
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-emerald-600'
              }`}
            >
              {tab.label}
              {tab.badge > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
