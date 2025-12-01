import React, { useState } from 'react';
import { X, Bell, Settings, Leaf, ChevronRight } from 'lucide-react';

export function Header({ currentPage, setCurrentPage, unreadCount }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const notifications = [
    { id: 1, type: 'swap', message: 'Sarah M. accepted your swap proposal!', time: '2 hours ago', icon: '🤝' },
    { id: 2, type: 'message', message: 'Mike R. sent you a message', time: '1 hour ago', icon: '💬' },
    { id: 3, type: 'achievement', message: 'You unlocked "Swap Master" badge!', time: '3 hours ago', icon: '🏅' },
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'messages', label: 'Messages', badge: unreadCount },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-3xl bg-white/70 border-b border-white/40 shadow-canopy">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-canopy to-cedar text-white flex items-center justify-center shadow-branch">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-canopy/50">SwapQuest</p>
            <h1 className="text-2xl font-semibold text-canopy">SwapQuest</h1>
            <p className="text-xs text-canopy/60">Nothing to waste. Everything to share.</p>
          </div>
        </div>

        <nav className="hidden lg:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-2 bg-white/60 border border-white/60 rounded-full p-1">
            {navItems.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setCurrentPage(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    currentPage === tab.id ? 'bg-canopy text-white shadow-branch/30' : 'text-canopy/70 hover:text-canopy'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {tab.label}
                    {tab.badge > 0 && (
                      <span className="ml-1 inline-flex items-center justify-center text-[10px] font-bold w-4 h-4 rounded-full bg-fern/90 text-white">
                        {tab.badge}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowSettings(false);
              }}
              className="relative rounded-full bg-white/60 border border-white/60 p-2 text-canopy/70 hover:text-canopy transition"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fern text-xs text-white flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-4 w-80 eco-shell overflow-hidden shadow-canopy">
                <div className="bg-gradient-to-r from-canopy via-cedar to-fern text-white px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">Today</p>
                    <h3 className="text-lg font-semibold">Activity Pulse</h3>
                  </div>
                  <button onClick={() => setShowNotifications(false)} className="p-1 rounded-full hover:bg-white/20">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto divide-y divide-white/10">
                  {notifications.map((notif) => (
                    <button
                      key={notif.id}
                      onClick={() => setShowNotifications(false)}
                      className="w-full flex items-start gap-4 px-6 py-4 text-left hover:bg-white/60 transition"
                    >
                      <span className="text-xl">{notif.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-canopy">{notif.message}</p>
                        <p className="text-xs text-canopy/60 mt-1">{notif.time}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="bg-white/70 px-6 py-3">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      alert('Viewing all notifications...\n\nThis would show a full notifications page with all your activity history.');
                    }}
                    className="text-sm font-semibold text-canopy flex items-center gap-1"
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowSettings(!showSettings);
                setShowNotifications(false);
              }}
              className="rounded-full bg-white/60 border border-white/60 p-2 text-canopy/70 hover:text-canopy transition"
            >
              <Settings className="w-5 h-5" />
            </button>
            {showSettings && (
              <div className="absolute right-0 mt-4 w-64 eco-shell overflow-hidden shadow-canopy">
                <div className="px-6 py-4 border-b border-white/30">
                  <p className="text-xs uppercase tracking-[0.3em] text-canopy/50">Profile</p>
                  <h3 className="text-lg font-semibold text-canopy">Personal Controls</h3>
                </div>
                <div className="p-2">
                  {['Account Settings', 'Notifications', 'Privacy', 'Help & Support'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setShowSettings(false);
                        alert(`${item} opened`);
                      }}
                      className="w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold text-canopy/80 hover:bg-white/70 transition"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              const item = prompt('Enter the item you want to donate:');
              if (item) {
                alert(`Thank you for donating "${item}"!\n\nYour donation helps others and earns you points. A team member will contact you soon to arrange pickup.`);
              }
            }}
            className="eco-button text-sm"
          >
            Plant a Donation
          </button>
        </div>
      </div>

      <nav className="lg:hidden border-t border-white/30 px-4 py-3 flex gap-4 overflow-x-auto" aria-label="Primary navigation mobile">
        {navItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentPage(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              currentPage === tab.id ? 'bg-canopy text-white' : 'bg-white/70 text-canopy/80'
            }`}
          >
            {tab.label}
            {tab.badge > 0 && (
              <span className="ml-2 inline-flex items-center justify-center text-[10px] font-bold w-4 h-4 rounded-full bg-fern/90 text-white">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </header>
  );
}
