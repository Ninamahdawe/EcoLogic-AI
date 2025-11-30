import React, { useState } from 'react';
import { Award, MapPin, Share2, MessageCircle, X } from 'lucide-react';
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

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-600 to-emerald-50 shadow-2xl">
        <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-500 relative flex items-center justify-end pr-8">
          <button 
            onClick={handleEditProfile}
            className="flex items-center gap-2 text-white bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition"
          >
            Edit Profile
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
          { label: 'Swaps', value: userStats.swaps, icon: '' },
          { label: 'Donations', value: userStats.donations, icon: '' },
          { label: 'Reviews', value: userStats.reviews, icon: '' },
          { label: 'Followers', value: userStats.followers, icon: '' },
          { label: 'Trust Score', value: `${userStats.trustScore}%`, icon: '' },
        ].map((stat, i) => (
          <div 
            key={i} 
            onClick={() => handleStatsClick(stat.label)}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/20 p-4 text-center shadow-lg hover:shadow-xl transition hover:scale-105 cursor-pointer"
          >
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
          {userStats.badges.map((badge, i) => (
            <div 
              key={i} 
              onClick={() => handleBadgeClick(badge)}
              className={`group relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 hover:scale-110 cursor-pointer ${badge.earned ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200' : 'bg-gray-50 border-2 border-gray-200 opacity-60'}`}
            >
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
          {userStats.activity.map((item, i) => (
            <div 
              key={i} 
              onClick={() => handleActivityClick(item)}
              className="flex items-start gap-4 pb-4 border-b border-emerald-200 last:border-0 p-3 rounded-xl hover:bg-emerald-50 transition cursor-pointer"
            >
              <div className="text-3xl"></div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-emerald-900">Edit Profile</h2>
                <button onClick={() => setShowEditModal(false)} className="text-emerald-500 hover:text-emerald-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-emerald-900 mb-3">Name</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-emerald-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-emerald-900 mb-3">Location</label>
                  <input 
                    type="text" 
                    value={editForm.location}
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-emerald-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-emerald-900 mb-3">Bio</label>
                  <textarea 
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-emerald-50 h-32 resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowEditModal(false)} className="flex-1 px-6 py-3 border-2 border-emerald-300 rounded-xl font-bold text-emerald-700 hover:bg-emerald-50">
                    Cancel
                  </button>
                  <button onClick={handleSaveProfile} className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30">
                    Save Changes
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
