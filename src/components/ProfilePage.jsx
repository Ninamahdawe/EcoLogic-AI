import React from 'react';
import { Award, MapPin, Share2, MessageCircle } from 'lucide-react';

export function ProfilePage() {
  const userStats = {
    name: 'Jessica Davis',
    level: 12,
    username: '@jessdavis',
    location: 'San Francisco, CA',
    bio: 'Passionate about sustainable living ♻️',
    swaps: 47,
    donations: 23,
    followers: 234,
    reviews: 38,
    rating: 4.9,
    trustScore: 98,
  };

  const badges = [
    { title: 'First Swap', icon: '🎯', earned: true },
    { title: 'Generous Giver', icon: '❤️', earned: true },
    { title: 'Eco Warrior', icon: '🌱', earned: true },
    { title: 'Community Hero', icon: '⭐', earned: false },
    { title: 'Speed Trader', icon: '⚡', earned: false },
    { title: 'Trend Setter', icon: '🔥', earned: false },
  ];

  const activity = [
    { type: 'swap', title: 'Swapped Vintage Camera with Sarah M.', status: 'completed', time: '2 hours ago' },
    { type: 'donate', title: 'Donated Kids Books Set to Tom H.', status: 'completed', time: '1 day ago' },
    { type: 'list', title: 'Listed Yoga Mat', status: 'active', time: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-600 to-emerald-50 shadow-2xl">
        <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-500 relative flex items-center justify-end pr-8">
          <button className="flex items-center gap-2 text-white bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl">
            ✏️ Edit Profile
          </button>
        </div>
        <div className="px-8 pb-8 relative">
          <div className="flex items-end gap-6 -mt-16">
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl border-4 border-white flex items-center justify-center text-5xl font-bold text-white">JD</div>
            <div className="flex-1 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{userStats.name}</h1>
              <p className="text-emerald-700 font-semibold">Level {userStats.level}</p>
            </div>
          </div>
          <div className="mt-6 space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              {userStats.location}
            </p>
            <p>{userStats.bio}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Swaps', value: userStats.swaps, icon: '🔄' },
          { label: 'Donations', value: userStats.donations, icon: '❤️' },
          { label: 'Reviews', value: userStats.reviews, icon: '⭐' },
          { label: 'Followers', value: userStats.followers, icon: '👥' },
          { label: 'Trust Score', value: `${userStats.trustScore}%`, icon: '✅' },
        ].map((stat, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/20 p-4 text-center shadow-lg hover:shadow-xl transition hover:scale-105">
            <p className="text-3xl mb-2">{stat.icon}</p>
            <p className="text-sm font-bold text-emerald-700">{stat.value}</p>
            <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl flex items-center gap-3">
            <Award className="w-6 h-6 text-emerald-600" />
            Badges & Achievements
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {badges.map((badge, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 hover:scale-110 ${badge.earned ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200' : 'bg-gray-50 border-2 border-gray-200 opacity-60'}`}>
              <p className="text-5xl mb-3">{badge.icon}</p>
              <h4 className="font-bold text-sm text-gray-900 mb-1">{badge.title}</h4>
              {badge.earned && <span className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs px-4 py-2 rounded-full mt-3 font-bold">Earned ✓</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-xl">
        <h3 className="font-bold text-xl mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {activity.map((item, i) => (
            <div key={i} className="flex items-start gap-4 pb-4 border-b border-emerald-200 last:border-0 p-3 rounded-xl">
              <div className="text-3xl">{item.type === 'swap' ? '🔄' : item.type === 'donate' ? '❤️' : '📝'}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
