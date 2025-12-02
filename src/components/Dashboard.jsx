import React, { useState } from 'react';
import { Award, Heart, Flame, TrendingUp, CheckCircle, Zap, Target, X } from 'lucide-react';
import challengesData from '../data/challenges.json';

export function Dashboard({ selectedChallenge: initialChallenge, setSelectedChallenge: setInitialChallenge, challenges: initialChallenges }) {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challenges] = useState(initialChallenges || challengesData);

  const goals = [
    { icon: '🌱', title: 'Monthly Swap Goal', current: 8, target: 15, progress: 53, reward: '250 pts' },
    { icon: '🎁', title: 'Donation Target', current: 5, target: 10, progress: 50, reward: '150 pts' },
    { icon: '🤝', title: 'Community Engagement', current: 12, target: 20, progress: 60, reward: 'New Badge' },
    { icon: '🌍', title: 'Sustainability Score', current: 72, target: 100, progress: 72, reward: 'Eco Master' },
  ];

  const milestones = [
    { title: 'First 10 Swaps', completed: true },
    { title: '25 Swaps', completed: true },
    { title: '50 Swaps', completed: false, progress: 47, total: 50 },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { icon: Award, label: 'Swaps This Month', value: '8', hint: '+2 vs last week' },
          { icon: Heart, label: 'Items Donated', value: '23', hint: '3 scheduled pickups' },
          { icon: Flame, label: 'Days Active', value: '7', hint: 'Keep the streak alive' },
          { icon: TrendingUp, label: 'Your Rank', value: '#42', hint: 'Top 12%' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <button
              key={i}
              onClick={() => alert(`${stat.label}: ${stat.value}\n\nView detailed analytics and trends.`)}
              className="eco-shell px-6 py-5 text-left transition hover:-translate-y-0.5"
            >
              <Icon className="w-5 h-5 text-fern mb-4" />
              <p className="text-xs uppercase tracking-[0.3em] text-canopy/50">{stat.label}</p>
              <p className="text-3xl font-semibold text-canopy mt-1">{stat.value}</p>
              <p className="text-xs text-canopy/60 mt-2">{stat.hint}</p>
            </button>
          );
        })}
      </div>

        <div className="eco-shell p-8">
        <h3 className="font-semibold text-xl text-canopy mb-6">Milestones</h3>
        <div className="space-y-4">
          {milestones.map((milestone, i) => (
            <button
              key={i}
              onClick={() => alert(`Milestone: ${milestone.title}\n\nStatus: ${milestone.completed ? 'Completed!' : `In Progress (${milestone.progress}/${milestone.total})`}`)}
              className="flex items-center gap-4 w-full text-left rounded-2xl border border-white/40 bg-white/70 px-4 py-3 transition hover:-translate-y-0.5"
            >
              {milestone.completed ? (
                <CheckCircle className="w-6 h-6 text-fern" />
              ) : (
                <div className="w-6 h-6 border-2 border-canopy/20 rounded-full"></div>
              )}
              <div className="flex-1">
                <p className="font-semibold text-canopy">{milestone.title}</p>
                {!milestone.completed && (
                  <div className="w-full bg-canopy/5 rounded-full h-2 mt-2">
                    <div className="bg-fern h-2 rounded-full" style={{ width: `${(milestone.progress / milestone.total) * 100}%` }}></div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="eco-shell p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-xl text-canopy flex items-center gap-3">
            <Zap className="w-6 h-6 text-fern" />
            Active challenges
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {challenges.map((challenge, i) => (
            <button
              key={i}
              onClick={() => setSelectedChallenge(challenge)}
              className="relative rounded-2xl border border-white/40 bg-white/80 p-6 text-left transition hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{challenge.icon}</span>
                <h4 className="font-semibold text-canopy">{challenge.title}</h4>
              </div>
              <p className="text-sm text-canopy/70 mb-4">{challenge.description}</p>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-canopy/60 mb-2">
                  <span>Progress</span>
                  <span>{challenge.progress}/{challenge.target}</span>
                </div>
                <div className="w-full bg-canopy/5 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-fern to-canopy h-2 rounded-full" style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm text-canopy/60">
                <span>{challenge.daysLeft} days left</span>
                <span className="eco-chip text-xs">{challenge.reward}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedChallenge && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="eco-shell max-w-2xl w-full overflow-hidden">
            <div className="bg-gradient-to-r from-canopy via-cedar to-fern text-white px-8 py-6 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">Challenge</p>
                <h2 className="text-3xl font-semibold mt-2">{selectedChallenge.title}</h2>
                <p className="text-white/80 mt-2">{selectedChallenge.description}</p>
              </div>
              <button onClick={() => setSelectedChallenge(null)} className="text-white/70 hover:text-white transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Difficulty', value: selectedChallenge.difficulty },
                  { label: 'Time Left', value: `${selectedChallenge.daysLeft} days` },
                  { label: 'Progress', value: `${selectedChallenge.progress}/${selectedChallenge.target}` },
                  { label: 'Completion', value: `${Math.round((selectedChallenge.progress / selectedChallenge.target) * 100)}%` },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl border border-white/40 bg-white/80 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-canopy/50 mb-2">{stat.label}</p>
                    <p className="text-xl font-semibold text-canopy">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-lg text-canopy mb-4">Progress</h3>
                <div className="w-full bg-canopy/5 rounded-full h-5 overflow-hidden border border-white/40">
                  <div className="bg-gradient-to-r from-fern via-canopy to-fern h-5 rounded-full" style={{ width: `${(selectedChallenge.progress / selectedChallenge.target) * 100}%` }}></div>
                </div>
                <p className="text-sm text-canopy/60 mt-3">{selectedChallenge.progress} of {selectedChallenge.target} complete</p>
              </div>

              <div className="rounded-2xl border border-yellow-200/60 bg-gradient-to-br from-yellow-50/80 to-orange-50/80 p-6">
                <h3 className="font-semibold text-lg text-canopy mb-2">Rewards</h3>
                <p className="text-2xl font-semibold text-canopy">{selectedChallenge.reward}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setSelectedChallenge(null)} className="eco-subtle-button flex-1 justify-center">
                  Close
                </button>
                <button
                  onClick={() => { alert(`Challenge "${selectedChallenge.title}" started!`); setSelectedChallenge(null); }}
                  className="eco-button flex-1 justify-center"
                >
                  Start challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
