import React, { useState } from "react";
import {
  Gift,
  TrendingUp,
  Search,
  Star,
  Flame,
  Award,
  Trophy,
  Zap,
} from "lucide-react";

export function HomePage({ items }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Toys",
    "Home Decor",
    "Sports",
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Star, label: "Your Level", value: "Level 12", progress: 60 },
          {
            icon: Flame,
            label: "Daily Streak",
            value: "7 Days",
            sublabel: "Keep it going! 🔥",
          },
          { icon: Award, label: "Achievements", value: "3/6" },
          { icon: Trophy, label: "Status", value: "Silver" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <Icon className="w-6 h-6 text-emerald-600 mb-3" />
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                {stat.sublabel && (
                  <p className="text-xs text-gray-600 mt-2">{stat.sublabel}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-xl rounded-2xl border border-white/20 p-6 flex justify-around shadow-xl">
        {[
          { label: "Total Swaps", value: "47", icon: "🔄" },
          { label: "Donations", value: "23", icon: "❤️" },
          { label: "Impact Score", value: "98/100", icon: "⭐" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl mb-2">{stat.icon}</p>
            <p className="text-emerald-600 text-sm font-semibold">
              {stat.label}
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-4 w-5 h-5 text-emerald-600" />
          <input
            type="text"
            placeholder="Search for items to swap or donate..."
            className="w-full pl-12 pr-6 py-3 bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-xl border border-white/20 rounded-2xl focus:outline-none focus:border-emerald-400"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-white/60 to-white/40 backdrop-blur border border-white/20 rounded-full hover:from-emerald-500/20 hover:to-teal-500/20 transition-all duration-300"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500/30 to-emerald-500/30 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <p className="font-bold text-white text-lg">
                Daily Challenge Available!
              </p>
            </div>
            <p className="text-sm text-white/80">
              Swap 3 items today to earn 50 bonus points
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-teal-600 rounded-xl font-bold">
            Start Challenge
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
          <Gift className="w-7 h-7 text-emerald-600" />
          Featured Collections
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              title: "Back to School",
              desc: "Books, supplies, gear",
              items: 156,
              badge: "Hot",
            },
            {
              title: "Sustainable Fashion",
              desc: "Pre-loved clothes",
              items: 234,
              badge: "Trending",
            },
            {
              title: "Tech & Gadgets",
              desc: "Electronics & more",
              items: 89,
              badge: "Popular",
            },
          ].map((collection, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-5xl mb-4">🎁</div>
              <h4 className="font-bold text-lg mb-1">{collection.title}</h4>
              <p className="text-sm text-emerald-100 mb-4">{collection.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-emerald-400/30 px-3 py-1 rounded-full">
                  {collection.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-emerald-600" />
          Trending Now
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-7xl">
                {item.image}
              </div>
              <div className="p-5">
                <h4 className="font-bold text-sm text-gray-900 mb-3">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full text-white flex items-center justify-center text-xs font-bold">
                    {item.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      {item.user}
                    </p>
                    <p className="text-xs text-gray-600">Level {item.level}</p>
                  </div>
                </div>
                <p className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                  💰 {item.points} pts
                </p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                  {item.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
