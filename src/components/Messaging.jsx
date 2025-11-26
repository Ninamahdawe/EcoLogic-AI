import React, { useState } from 'react';
import { MessageCircle, Send, X, Search } from 'lucide-react';

export function Messaging({ conversations, setConversations }) {
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');

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
    <div className="flex gap-6 h-[calc(100vh-180px)]">
      <div className="w-80 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/20">
          <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            Messages
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-emerald-600" />
            <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2 bg-white/50 border border-white/30 rounded-xl focus:outline-none text-sm" />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {conversations.map(conv => (
            <div key={conv.id} onClick={() => setActiveChat(conv)} className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/30 group ${activeChat?.id === conv.id ? 'bg-emerald-50/50 border-l-4 border-l-emerald-600' : ''}`}>
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full text-white flex items-center justify-center font-bold text-lg">{conv.avatar}</div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${conv.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm text-gray-900">{conv.name}</h3>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">{conv.unread}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col overflow-hidden shadow-2xl">
        {activeChat ? (
          <>
            <div className="p-4 border-b border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full text-white flex items-center justify-center font-bold text-lg">{activeChat.avatar}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{activeChat.name}</h3>
                  <p className="text-sm text-gray-600">Level {activeChat.level}</p>
                </div>
              </div>
              <button onClick={() => setActiveChat(null)} className="p-2 text-red-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4 space-y-4">
              {activeChat.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.own ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs ${msg.own ? 'bg-emerald-600 text-white rounded-3xl rounded-tr-lg' : 'bg-gray-100 text-gray-900 rounded-3xl rounded-tl-lg'} px-4 py-2`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.own ? 'text-emerald-100' : 'text-gray-500'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/20">
              <div className="flex gap-2">
                <input type="text" placeholder="Type a message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none" />
                <button onClick={handleSendMessage} className="bg-emerald-600 text-white p-2 rounded-lg">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-semibold">No conversation selected</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
