import React, { useState } from 'react';
import { Award, MapPin, X, Star, Flame, Trophy } from 'lucide-react';
import userProfileData from '../data/userProfile.json';

export function ProfilePage() {
  const [userStats, setUserStats] = useState(userProfileData);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userProfileData.name,
    location: userProfileData.location,
    bio: userProfileData.bio
  });

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    setUserStats({ ...userStats, ...editForm });
    setShowEditModal(false);
    alert('Profile updated successfully!');
  };

  const handleStatsClick = (label) => {
    alert(`${label}: ${userStats[label.toLowerCase().replace(' ', '')] || userStats[label.toLowerCase()]}\n\nClick on any stat card to see detailed breakdown.`);
  };

  const handleBadgeClick = (badge) => {
    if (badge.earned) {
      alert(`Badge: ${badge.title}\n\nYou earned this badge! Great work!`);
    } else {
      alert(`Badge: ${badge.title}\n\nComplete challenges to unlock this badge.`);
    }
  };

  const handleActivityClick = (activity) => {
    alert(`Activity: ${activity.title}\n\nStatus: ${activity.status}\n\nTime: ${activity.time}`);
  };

  const insightCards = [
    { icon: Star, label: 'Level', value: '12', hint: 'Ecosystem trust' },
    { icon: Flame, label: 'Daily streak', value: '7 days', hint: 'Keep the rhythm' },
    { icon: Award, label: 'Badges', value: '3 / 6', hint: 'Next unlock soon' },
    { icon: Trophy, label: 'Status', value: 'Silver', hint: 'Upgrade in 4 swaps' },
  ];

  const impactSnapshot = [
    { label: 'Total swaps', value: '47', icon: '↺' },
    { label: 'Donations', value: '23', icon: '🎁' },
    { label: 'Impact score', value: '98 / 100', icon: '🌍' },
  ];

  return (
    <div className="space-y-10">
      <div className="eco-shell overflow-hidden">
        <div className="relative h-36 bg-gradient-to-r from-canopy via-cedar to-fern flex items-center justify-end px-8">
          <button 
            onClick={handleEditProfile}
            className="eco-button bg-white/20 text-white border border-white/40"
          >
            Edit profile
          </button>
        </div>
        <div className="px-8 pb-10 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div className="w-32 h-32 rounded-2xl border-4 border-white bg-gradient-to-br from-fern to-canopy text-white text-4xl font-semibold flex items-center justify-center">
              {userStats.name.split(' ').map(word => word[0]).slice(0,2).join('')}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-canopy/50">Profile</p>
                  <h1 className="text-3xl font-semibold text-canopy">{userStats.name}</h1>
                  <p className="text-canopy/60">Level {userStats.level}</p>
                </div>
                <div className="eco-chip">
                  Living lightly since 2021
                </div>
              </div>
              <p className="flex items-center gap-2 text-canopy/60">
                <MapPin className="w-5 h-5 text-fern" />
                {userStats.location}
              </p>
              <p className="text-canopy/70">{userStats.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {insightCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="eco-shell p-4 text-left space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-fern/15 text-fern flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-canopy/50">{card.label}</p>
              <p className="text-2xl font-semibold text-canopy">{card.value}</p>
              <p className="text-xs text-canopy/60">{card.hint}</p>
            </div>
          );
        })}
      </div>

      <div className="eco-shell p-6 space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-canopy/50">Snapshot</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {impactSnapshot.map(stat => (
            <div key={stat.label} className="rounded-2xl border border-white/40 bg-white/80 px-4 py-3 flex items-center gap-3">
              <span className="text-xl">{stat.icon}</span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-canopy/50">{stat.label}</p>
                <p className="text-lg font-semibold text-canopy">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {[
          { label: 'Swaps', value: userStats.swaps, icon: '' },
          { label: 'Donations', value: userStats.donations, icon: '' },
          { label: 'Reviews', value: userStats.reviews, icon: '' },
          { label: 'Followers', value: userStats.followers, icon: '' },
          { label: 'Trust Score', value: `${userStats.trustScore}%`, icon: '' },
        ].map((stat, i) => (
          <button 
            key={i} 
            onClick={() => handleStatsClick(stat.label)}
            className="eco-shell py-5 text-center transition hover:-translate-y-0.5"
          >
            <p className="text-2xl font-semibold text-canopy">{stat.value}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-canopy/50 mt-1">{stat.label}</p>
          </button>
        ))}
      </div>

      <div className="eco-shell p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-xl text-canopy flex items-center gap-3">
            <Award className="w-6 h-6 text-fern" />
            Badges & achievements
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {userStats.badges.map((badge, i) => (
            <button 
              key={i} 
              onClick={() => handleBadgeClick(badge)}
              className={`rounded-2xl border p-6 text-center transition hover:-translate-y-0.5 ${badge.earned ? 'border-fern/40 bg-fern/5' : 'border-white/40 bg-white/60 opacity-70'}`}
            >
              <p className="text-5xl mb-3">{badge.icon}</p>
              <h4 className="font-semibold text-sm text-canopy mb-1">{badge.title}</h4>
              {badge.earned && <span className="eco-chip text-[10px] mt-3 inline-flex items-center justify-center">Earned ✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="eco-shell p-8">
        <h3 className="font-semibold text-xl text-canopy mb-6">Recent activity</h3>
        <div className="space-y-4">
          {userStats.activity.map((item, i) => (
            <button 
              key={i} 
              onClick={() => handleActivityClick(item)}
              className="w-full flex items-start gap-4 pb-4 border-b border-white/40 last:border-0 px-3 rounded-2xl text-left hover:bg-white/70 transition"
            >
              <div className="text-3xl"></div>
              <div className="flex-1">
                <p className="font-semibold text-canopy">{item.title}</p>
                <p className="text-xs text-canopy/60 mt-1">{item.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="eco-shell max-w-2xl w-full">
            <div className="p-8 border-b border-white/30 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-canopy/50">Profile</p>
                <h2 className="text-2xl font-semibold text-canopy mt-2">Edit profile</h2>
              </div>
              <button onClick={() => setShowEditModal(false)} className="text-canopy/50 hover:text-canopy transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-canopy/50 mb-2">Name</label>
                <input 
                  type="text" 
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-white/50 rounded-2xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-fern/40"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-canopy/50 mb-2">Location</label>
                <input 
                  type="text" 
                  value={editForm.location}
                  onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  className="w-full px-4 py-3 border border-white/50 rounded-2xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-fern/40"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-canopy/50 mb-2">Bio</label>
                <textarea 
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full px-4 py-3 border border-white/50 rounded-2xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-fern/40 h-32 resize-none"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setShowEditModal(false)} className="eco-subtle-button flex-1 justify-center">
                  Cancel
                </button>
                <button onClick={handleSaveProfile} className="eco-button flex-1 justify-center">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
