import React, { useState } from 'react';
import { Award, Heart, Flame, TrendingUp, CheckCircle, Zap, Target, X } from 'lucide-react';
import challengesData from '../data/challenges.json';

export function Dashboard({ selectedChallenge: initialChallenge, setSelectedChallenge: setInitialChallenge, challenges: initialChallenges }) {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challenges] = useState(initialChallenges || challengesData);

  const goals = [
    { icon: '', title: 'Monthly Swap Goal', current: 8, target: 15, progress: 53, reward: '250 pts' },
    { icon: '', title: 'Donation Target', current: 5, target: 10, progress: 50, reward: '150 pts' },
    { icon: '', title: 'Community Engagement', current: 12, target: 20, progress: 60, reward: 'New Badge' },
    { icon: '', title: 'Sustainability Score', current: 72, target: 100, progress: 72, reward: 'Eco Master' },
  ];

  const milestones = [
    { title: 'First 10 Swaps', completed: true },
    { title: '25 Swaps', completed: true },
    { title: '50 Swaps', completed: false, progress: 47, total: 50 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Award, label: 'Swaps This Month', value: '8' },
          { icon: Heart, label: 'Items Donated', value: '23' },
          { icon: Flame, label: 'Days Active', value: '7' },
          { icon: TrendingUp, label: 'Your Rank', value: '#42' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              onClick={() => alert(`${stat.label}: ${stat.value}\n\nView detailed analytics and trends.`)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="relative">
                <Icon className="w-6 h-6 text-emerald-600 mb-3" />
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-xl">
        <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
          <Target className="w-6 h-6 text-emerald-600" />
          Monthly Goals
        </h3>
        <div className="grid grid-cols-2 gap-6">
          {goals.map((goal, i) => (
            <div 
              key={i} 
              onClick={() => alert(`Goal: ${goal.title}\n\nProgress: ${goal.current}/${goal.target} (${goal.progress}%)\n\nReward: ${goal.reward}`)}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50/60 to-teal-50/60 border border-white/30 p-6 cursor-pointer hover:border-emerald-400 transition"
            >
              <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <span className="text-2xl">{goal.icon}</span>
                {goal.title}
              </h4>
              <p className="text-sm text-gray-600 mb-3">{goal.current} / {goal.target}</p>
              <div className="w-full bg-emerald-100/50 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full" style={{ width: `${goal.progress}%` }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-3">{goal.progress}% complete</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-xl">
        <h3 className="font-bold text-xl mb-6">Milestones</h3>
        <div className="space-y-4">
          {milestones.map((milestone, i) => (
            <div 
              key={i} 
              onClick={() => alert(`Milestone: ${milestone.title}\n\nStatus: ${milestone.completed ? 'Completed!' : `In Progress (${milestone.progress}/${milestone.total})`}`)}
              className="flex items-center gap-4 cursor-pointer hover:bg-emerald-50 p-2 rounded-lg transition"
            >
              {milestone.completed ? (
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
              )}
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{milestone.title}</p>
                {!milestone.completed && (
                  <div className="w-full bg-emerald-100 rounded-full h-2 mt-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${(milestone.progress / milestone.total) * 100}%` }}></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl flex items-center gap-3">
            <Zap className="w-6 h-6 text-emerald-600" />
            Active Challenges
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {challenges.map((challenge, i) => (
            <div key={i} onClick={() => setSelectedChallenge(challenge)} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50/60 to-teal-50/60 border border-white/30 p-6 cursor-pointer hover:border-emerald-400 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="relative">
                <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
                  <span className="text-2xl">{challenge.icon}</span>
                  {challenge.title}
                </h4>
                <p className="text-sm text-gray-700 mb-4">{challenge.description}</p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-gray-900">Progress</span>
                    <span className="text-gray-700">{challenge.progress}/{challenge.target}</span>
                  </div>
                  <div className="w-full bg-emerald-100/50 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full" style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{challenge.daysLeft} days left</span>
                  <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded">{challenge.reward}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedChallenge && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl max-w-2xl w-full border border-white/30 shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 flex items-start justify-between rounded-t-3xl">
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedChallenge.title}</h2>
                <p className="text-emerald-100">{selectedChallenge.description}</p>
              </div>
              <button onClick={() => setSelectedChallenge(null)} className="text-white hover:bg-white/20 p-3 rounded-xl transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Difficulty', value: selectedChallenge.difficulty },
                  { label: 'Time Left', value: `${selectedChallenge.daysLeft} days` },
                  { label: 'Progress', value: `${selectedChallenge.progress}/${selectedChallenge.target}` },
                  { label: 'Completion', value: `${Math.round((selectedChallenge.progress / selectedChallenge.target) * 100)}%` },
                ].map((stat, i) => (
                  <div key={i} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 text-center border border-emerald-200">
                    <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-emerald-600">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Progress</h3>
                <div className="w-full bg-emerald-100/50 rounded-full h-5 overflow-hidden border border-emerald-200">
                  <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 h-5 rounded-full" style={{ width: `${(selectedChallenge.progress / selectedChallenge.target) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-3">{selectedChallenge.progress} of {selectedChallenge.target} complete</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Rewards</h3>
                <p className="font-bold text-emerald-600 text-xl">{selectedChallenge.reward}</p>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setSelectedChallenge(null)} className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-900 hover:bg-gray-50">Close</button>
                <button onClick={() => { alert(`Challenge "${selectedChallenge.title}" started!`); setSelectedChallenge(null); }} className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg">Start Challenge</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
