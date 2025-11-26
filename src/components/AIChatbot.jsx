import React, { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle, Sparkles } from 'lucide-react'

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: '👋 Hi! I\'m SwapQuest AI Assistant. How can I help you today?', timestamp: new Date() }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const responses = {
    'how does swapping work': 'SwapQuest makes swapping simple! 1️⃣ Browse items, 2️⃣ Propose a swap, 3️⃣ Chat with the owner, 4️⃣ Complete the exchange. You earn points and badges! 🎉',
    'points': 'Points are currency on SwapQuest! Each swap earns you points which unlock badges, levels, and boost your trust score! 💎',
    'badges': 'Badges are earned by completing challenges and milestones! Complete daily challenges, make your first swap, or reach level milestones! 🏆',
    'trust score': 'Your trust score increases with every successful swap! A high trust score helps others feel confident swapping with you! ⭐',
    'search': 'Use the search bar to find items! You can search by name, category, or use keywords like "eco-friendly" or "tech gadgets"! 🔍',
    'trending': 'Trending items are currently popular on SwapQuest! Check the "Trending Now" section to find hot items! 🔥',
    'collections': 'Featured collections group similar items together! Browse collections to discover new items in your favorite categories! 📦',
    'challenge': 'Daily challenges give you bonus points and badges! Complete them to unlock special rewards and level up faster! ⚡',
    'help': 'I can help with:\n• How swapping works\n• Points & badges\n• Trust score\n• Searching items\n• Trending items\n• Collections\n• Challenges\nJust ask! 💡',
    'hi': '👋 Hello! What would you like to know about SwapQuest?',
    'hello': '👋 Hi there! How can I assist you?',
  }

  const getResponse = (msg) => {
    const lower = msg.toLowerCase()
    for (const [key, response] of Object.entries(responses)) {
      if (lower.includes(key)) return response
    }
    return '🤖 That\'s a great question! Try asking me about: swapping, points, badges, trust score, searching, trending, collections, or challenges! 🚀'
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg = { id: messages.length + 1, sender: 'user', text: input, timestamp: new Date() }
    setMessages([...messages, userMsg])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const aiMsg = { id: messages.length + 2, sender: 'ai', text: getResponse(input), timestamp: new Date() }
      setMessages(prev => [...prev, aiMsg])
      setIsLoading(false)
    }, 800)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-40 animate-pulse"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-cyan-500/30 flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 animate-spin" />
          <div>
            <p className="font-black text-lg">SwapQuest AI</p>
            <p className="text-xs text-cyan-100">Always here to help 🤖</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-lg transition">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${
              msg.sender === 'user' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none' 
                : 'bg-slate-700/50 text-slate-100 rounded-bl-none border border-cyan-500/30'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              <p className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-cyan-100' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700/50 text-slate-100 px-4 py-3 rounded-2xl rounded-bl-none border border-cyan-500/30">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-cyan-500/30 p-4 bg-slate-900/50">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 bg-slate-800 border border-cyan-500/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400 placeholder-slate-400 text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-2 rounded-lg hover:shadow-lg transition hover:scale-110"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-slate-400">Try: "How does swapping work?" or "What are badges?"</p>
      </div>
    </div>
  )
}
