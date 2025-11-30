import React, { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle, Sparkles } from 'lucide-react'

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi! I\'m SwapQuest AI Assistant powered by Groq AI. How can I help you today?', timestamp: new Date() }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = { id: messages.length + 1, sender: 'user', text: input, timestamp: new Date() }
    setMessages([...messages, userMsg])
    const currentInput = input
    setInput('')
    setIsLoading(true)

    try {
      // Using Groq API (free tier available at https://console.groq.com)
      // Get your API key from https://console.groq.com and add it to .env file
      const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
      
      if (!GROQ_API_KEY || GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE') {
        throw new Error('Groq API key not found. Please add VITE_GROQ_API_KEY to your .env file')
      }
      
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant', // Fast and free model
            messages: [
              {
                role: 'system',
                content: 'You are a helpful SwapQuest AI assistant. Answer questions about an item trading platform called SwapQuest. Be concise, friendly, and helpful. Keep responses under 150 words.'
              },
              {
                role: 'user',
                content: currentInput
              }
            ],
            temperature: 0.7,
            max_tokens: 150,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('API Error')
      }

      const result = await response.json()
      const aiText = result.choices?.[0]?.message?.content || 'I apologize, I had trouble understanding that. Try asking about SwapQuest features!'
      
      const aiMsg = { id: messages.length + 2, sender: 'ai', text: aiText, timestamp: new Date() }
      setMessages(prev => [...prev, aiMsg])
    } catch (error) {
      console.error('Error:', error)
      
      // Fallback to smart responses if API fails
      const fallbackResponse = getFallbackResponse(currentInput)
      const aiMsg = { id: messages.length + 2, sender: 'ai', text: fallbackResponse, timestamp: new Date() }
      setMessages(prev => [...prev, aiMsg])
    }
    
    setIsLoading(false)
  }

  const getFallbackResponse = (userInput) => {
    const lower = userInput.toLowerCase()

    if (lower.includes('how') && lower.includes('swap')) {
      return 'Swapping is easy! Browse items → Click "Propose Swap" → Message the owner → Once accepted, arrange the exchange. You\'ll earn points for each successful swap!'
    }
    if (lower.includes('point')) {
      return 'Points are earned with every swap! Use them to level up, unlock badges, and boost your trust score. The more you swap, the faster you level up!'
    }
    if (lower.includes('badge') || lower.includes('achievement')) {
      return 'Badges are achievements unlocked by completing challenges! You can earn badges like "First Swap", "Eco Warrior", "Community Hero" and more!'
    }
    if (lower.includes('trust')) {
      return 'Your trust score reflects how reliable you are! It increases with successful swaps. A higher trust score means people will be more confident swapping with you!'
    }
    if (lower.includes('search') || lower.includes('find')) {
      return 'Use the search bar to find items! You can search by name or use our category filters (Electronics, Clothing, Books, etc)!'
    }
    if (lower.includes('collection')) {
      return 'Featured collections group similar items! We have "Back to School", "Sustainable Fashion", and "Tech & Gadgets". Explore them now!'
    }
    if (lower.includes('challenge')) {
      return 'Daily challenges earn you bonus points & badges! Today\'s challenge: Swap 3 items to earn 50 bonus points!'
    }
    if (lower.includes('message') || lower.includes('chat')) {
      return 'Use the Messages tab to chat with other users about swaps! You can discuss item details and arrange exchanges!'
    }
    if (lower.includes('help')) {
      return 'I can help with: swapping, points, badges, trust score, searching, collections, challenges, messaging, and donations. What interests you?'
    }
    if (lower.includes('hi') || lower.includes('hello')) {
      return 'Hello! Welcome to SwapQuest! What would you like to know?'
    }

    return 'Great question! I can help with SwapQuest features. Ask me about swapping, points, badges, collections, or anything else!'
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
            <p className="text-xs text-cyan-100">Powered by Groq AI</p>
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
            disabled={isLoading}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-2 rounded-lg hover:shadow-lg transition hover:scale-110 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-slate-400">Powered by Groq AI • Try: "How does swapping work?"</p>
      </div>
    </div>
  )
}
