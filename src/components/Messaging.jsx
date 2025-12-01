import React, { useState } from 'react';
import { MessageCircle, Send, X, Search } from 'lucide-react';

export function Messaging({ conversations, setConversations }) {
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim() && activeChat) {
      const updatedConversations = conversations.map(conv => {
        if (conv.id === activeChat.id) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: conv.messages.length + 1,
                sender: 'You',
                text: messageInput,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                own: true
              }
            ],
            lastMessage: messageInput,
            timestamp: 'now'
          };
        }
        return conv;
      });
      setConversations(updatedConversations);
      const updated = updatedConversations.find(c => c.id === activeChat.id);
      setActiveChat(updated);
      setMessageInput('');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-200px)]">
      <div className="w-full lg:w-80 eco-shell flex flex-col overflow-hidden">
        <div className="p-5 border-b border-white/30">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2 text-canopy">
            <MessageCircle className="w-5 h-5 text-fern" />
            Messages
          </h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-canopy/40" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2 bg-white/80 border border-white/60 rounded-2xl focus:outline-none text-sm focus:ring-2 focus:ring-fern/30" 
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {filteredConversations.length === 0 ? (
            <div className="p-6 text-center text-canopy/50">
              <p>No conversations found</p>
            </div>
          ) : (
            filteredConversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                className={`w-full text-left px-5 py-4 border-b border-white/20 transition ${
                  activeChat?.id === conv.id ? 'bg-fern/10' : 'hover:bg-white/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-fern/15 text-fern flex items-center justify-center font-semibold text-lg">{conv.avatar}</div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${conv.status === 'online' ? 'bg-fern' : 'bg-canopy/20'}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm text-canopy">{conv.name}</h3>
                      <span className="text-xs text-canopy/40">{conv.timestamp}</span>
                    </div>
                    <p className="text-xs text-canopy/60 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="eco-chip text-[10px]">{conv.unread}</span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 eco-shell flex flex-col overflow-hidden min-h-[400px]">
        {activeChat ? (
          <>
            <div className="p-5 border-b border-white/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-fern/15 text-fern flex items-center justify-center font-semibold text-lg">{activeChat.avatar}</div>
                <div>
                  <h3 className="font-semibold text-canopy">{activeChat.name}</h3>
                  <p className="text-sm text-canopy/60">Level {activeChat.level}</p>
                </div>
              </div>
              <button onClick={() => setActiveChat(null)} className="p-2 text-canopy/40 hover:text-canopy transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6 space-y-4">
              {activeChat.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.own ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-3 rounded-2xl ${msg.own ? 'bg-canopy text-white rounded-tr-md' : 'bg-white/80 border border-white/40 text-canopy rounded-tl-md'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.own ? 'text-white/60' : 'text-canopy/40'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-white/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Send a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-3 rounded-2xl border border-white/50 bg-white/80 focus:outline-none focus:ring-2 focus:ring-fern/40"
                />
                <button onClick={handleSendMessage} className="eco-button px-4 py-3">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-canopy/40">
            <div className="text-center space-y-3">
              <MessageCircle className="w-16 h-16 mx-auto" />
              <p className="text-lg font-semibold">Choose a conversation</p>
              <p className="text-sm">Threads open here and mirror across your devices.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
