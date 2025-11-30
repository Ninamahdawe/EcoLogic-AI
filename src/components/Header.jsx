import React, { useState } from 'react';
import { X, Bell, Settings } from 'lucide-react';

export function Header({ currentPage, setCurrentPage, unreadCount }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, type: 'swap', message: 'Sarah M. accepted your swap proposal!', time: '2 hours ago', icon: '' },
    { id: 2, type: 'message', message: 'Mike R. sent you a message', time: '1 hour ago', icon: '' },
    { id: 3, type: 'achievement', message: 'You unlocked "Swap Master" badge!', time: '3 hours ago', icon: '' },
  ];

  return (
    <header className="bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40 shadow-lg">
      <div className="max-w-full mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
            SQ
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">SwapQuest</h1>
            <p className="text-xs text-gray-600">Trade. Share. Level Up.</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-600 hover:text-emerald-600 transition text-xl hover:scale-125 duration-200"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                {notifications.length}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 flex items-center justify-between">
                  <h3 className="font-bold text-lg">Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="hover:bg-white/20 p-1 rounded">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className="border-b border-gray-100 p-4 hover:bg-gray-50 transition cursor-pointer">
                      <div className="flex gap-3">
                        <span className="text-2xl">{notif.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <button className="w-full text-center text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="text-gray-600 hover:text-emerald-600 transition text-xl hover:scale-125 duration-200">
            <Settings className="w-6 h-6" />
          </button>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition font-bold hover:scale-105 duration-200">
            Donate
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-white/20">
        <div className="max-w-full mx-auto px-8 flex gap-8">
          {[
            { id: 'home', label: 'Home' },
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'messages', label: 'Messages', badge: unreadCount },
            { id: 'profile', label: 'Profile' },
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
