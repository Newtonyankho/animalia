// /home/newton/projects/myava/frontend/app/chat/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MessageSquare, Send, Search, Users, Phone, Video, MoreVertical, Check, CheckCheck, Circle } from 'lucide-react';

const ChatPage = () => {
  // Mock current user
  const CURRENT_USER = {
    id: '1',
    name: 'Newton',
    email: 'newtonyankho@outlook.com',
  };

  // State
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(new Set(['ai', '2', '4', '5']));
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock users
  const users = [
    {
      id: 'ai',
      _id: 'ai',
      name: '🤖 Ayoyo AI',
      email: 'ai@myava.com',
      role: 'avo',
      online: true,
      bio: 'AI Assistant - Ask me anything! 24/7 help.',
      profilePicture: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai',
    },
    { id: '2', _id: '2', name: 'Sarah AVO', email: 'sarah@myava.com', role: 'avo', online: true },
    { id: '3', _id: '3', name: 'Mike User', email: 'mike@myava.com', role: 'user', online: false },
    { id: '4', _id: '4', name: 'John Admin', email: 'john@myava.com', role: 'admin', online: true },
    { id: '5', _id: '5', name: 'Emma User', email: 'emma@myava.com', role: 'user', online: true },
  ];

  // Initialize conversations
  useEffect(() => {
    const mockConversations = [
      {
        _id: 'conv1',
        participants: [
          { _id: CURRENT_USER.id, name: CURRENT_USER.name, profilePicture: '', role: 'user' },
          { _id: '2', name: 'Chicco AVO', profilePicture: '', role: 'avo' },
        ],
        lastMessage: {
          text: 'Hey! How are you?',
          timestamp: new Date(Date.now() - 3600000),
        },
        type: 'private',
      },
      {
        _id: 'conv2',
        participants: [
          { _id: CURRENT_USER.id, name: CURRENT_USER.name, profilePicture: '', role: 'user' },
          { _id: '4', name: 'Kairos Admin', profilePicture: '', role: 'admin' },
        ],
        lastMessage: {
          text: 'Your request has been approved',
          timestamp: new Date(Date.now() - 7200000),
        },
        type: 'private',
      },
      {
        _id: 'conv3',
        participants: [
          { _id: CURRENT_USER.id, name: CURRENT_USER.name, profilePicture: '', role: 'user' },
          { _id: 'ai', name: '🤖 Ayoyo AI', profilePicture: '', role: 'avo' },
        ],
        lastMessage: {
          text: 'How can I assist your livestock today?',
          timestamp: new Date(Date.now() - 1800000),
        },
        type: 'private',
      },
    ];
    setConversations(mockConversations);
  }, []);

  // Load conversation
  const loadConversation = (conversation: any) => {
    setSelectedConversation(conversation);

    const otherUser = conversation.participants.find((p: any) => p._id !== CURRENT_USER.id);
    const isAI = otherUser?._id === 'ai';

    const baseMessages = [
      {
        _id: '1',
        text: 'Hello! Welcome to My-AVA Chat.',
        sender: { _id: otherUser?._id, name: otherUser?.name },
        createdAt: new Date(Date.now() - 5000000),
        readBy: [{ user: '1' }, { user: otherUser?._id }],
      },
    ];

    if (isAI) {
      baseMessages.push({
        _id: '2',
        text: 'Ask about diagnosis, feed, market prices, or animal care!',
        sender: { _id: 'ai', name: '🤖 Ayoyo AI' },
        createdAt: new Date(Date.now() - 4800000),
        readBy: [{ user: 'ai' }],
      });
    } else {
      baseMessages.push({
        _id: '2',
        text: 'Glad to connect with you.',
        sender: { _id: otherUser?._id, name: otherUser?.name },
        createdAt: new Date(Date.now() - 4800000),
        readBy: [{ user: '1' }, { user: otherUser?._id }],
      });
    }

    setMessages(baseMessages);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // Get other participant
  const getOtherParticipant = (conversation: any) => {
    return conversation?.participants.find((p: any) => p._id !== CURRENT_USER.id);
  };

  // Send message
  const sendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const otherUser = getOtherParticipant(selectedConversation);
    const isAI = otherUser?._id === 'ai';

    if (isAI) {
      sendAIMessage(messageText);
      return;
    }

    const newMessage = {
      _id: Date.now().toString(),
      text: messageText,
      sender: { _id: CURRENT_USER.id, name: CURRENT_USER.name },
      createdAt: new Date(),
      readBy: [{ user: CURRENT_USER.id }],
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText('');
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // Send AI response
  const sendAIMessage = (text: string) => {
    // Add user message
    const userMsg = {
      _id: `user-${Date.now()}`,
      text,
      sender: { _id: CURRENT_USER.id, name: CURRENT_USER.name },
      createdAt: new Date(),
      readBy: [{ user: CURRENT_USER.id }],
    };
    setMessages((prev) => [...prev, userMsg]);
    setMessageText('');

    // Add typing indicator
    setMessages((prev) => [
      ...prev,
      { _id: 'typing', text: '...', sender: { _id: 'ai', name: '🤖 Ayoyo AI' }, isTyping: true, createdAt: new Date() },
    ]);

    // Simulate AI delay
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m._id !== 'typing'));

      const aiResponses = [
        "That's interesting! Tell me more about your animals. 🐄",
        "I'm here to help! Ask about feed, diagnosis, or market prices.",
        "Great question! Let me check the latest veterinary guidelines... 💭",
        "I understand. Would you like guidance on treatment or prevention?",
        "Absolutely! I recommend checking our Diagnosis Assistant for symptoms.",
        "Did you know? Healthy feeding reduces disease risk by 60%! 🥦",
      ];

      const aiMsg = {
        _id: `ai-${Date.now()}`,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: { _id: 'ai', name: '🤖 Ayoyo AI' },
        createdAt: new Date(),
        readBy: [{ user: 'ai' }],
      };
      setMessages((prev) => [...prev, aiMsg]);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 1500);
  };

  // Format time
  const formatTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffMs = now.getTime() - messageDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return messageDate.toLocaleDateString();
  };

  // Check online
  const isUserOnline = (userId: string) => onlineUsers.has(userId);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top bar */}
      <div className="bg-emerald-800 text-white py-3 px-6 flex items-center gap-3">
        <Link href="/" className="text-xl hover:underline">
          ←
        </Link>
        <h1 className="text-xl font-bold">My-AVA Chat</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations
              .filter((conv) => {
                const other = getOtherParticipant(conv);
                return other?.name.toLowerCase().includes(searchQuery.toLowerCase());
              })
              .map((conv) => {
                const other = getOtherParticipant(conv);
                const isOnline = isUserOnline(other?._id);
                const isSelected = selectedConversation?._id === conv._id;

                return (
                  <div
                    key={conv._id}
                    onClick={() => loadConversation(conv)}
                    className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                      isSelected ? 'bg-emerald-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                          {other?.name.charAt(0)}
                        </div>
                        {isOnline && <Circle className="absolute bottom-0 right-0 fill-green-500" size={10} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800 truncate">{other?.name}</h3>
                          <span className="text-xs text-gray-500">{formatTime(conv.lastMessage?.timestamp)}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate">{conv.lastMessage?.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* New Chat */}
          <div className="p-3 border-t border-gray-200">
            <div className="relative group">
              <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-sm">
                <Users size={18} /> New Chat
              </button>

              <div className="hidden group-hover:block absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border max-h-60 overflow-y-auto z-10">
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => {
                      const newConv = {
                        _id: `conv-${Date.now()}-${user.id}`,
                        participants: [
                          { _id: CURRENT_USER.id, name: CURRENT_USER.name, role: 'user' },
                          { _id: user._id, name: user.name, role: user.role },
                        ],
                        lastMessage: { text: 'Start chatting...', timestamp: new Date() },
                        type: 'private',
                      };
                      setConversations((prev) => [newConv, ...prev]);
                      loadConversation(newConv);
                    }}
                    className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                        {user.name.charAt(0)}
                      </div>
                      {user.online && <Circle className="absolute bottom-0 right-0 fill-green-500" size={8} />}
                    </div>
                    <div>
                      <p className="font-semibold text-xs">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role.toUpperCase()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                    {getOtherParticipant(selectedConversation)?.name.charAt(0)}
                  </div>
                  {isUserOnline(getOtherParticipant(selectedConversation)?._id) && (
                    <Circle className="absolute bottom-0 right-0 fill-green-500" size={10} />
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">
                    {getOtherParticipant(selectedConversation)?.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {isUserOnline(getOtherParticipant(selectedConversation)?._id) ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Phone size={18} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Video size={18} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <MoreVertical size={18} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => {
                const isOwn = msg.sender._id === CURRENT_USER.id;
                const isRead = msg.readBy?.length > 1;

                if (msg.isTyping) {
                  return (
                    <div key="typing" className="flex justify-start">
                      <div className="bg-white border rounded-xl px-4 py-2 flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg._id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs ${isOwn ? 'order-2' : 'order-1'}`}>
                      {!isOwn && <p className="text-xs text-gray-500 mb-1 ml-2">{msg.sender.name}</p>}
                      <div
                        className={`rounded-xl p-3 ${
                          isOwn ? 'bg-emerald-600 text-white' : 'bg-white text-gray-800 border'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className={`text-xs ${isOwn ? 'text-emerald-100' : 'text-gray-500'}`}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {isOwn && (isRead ? <CheckCheck size={12} /> : <Check size={12} />)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!messageText.trim()}
                  className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Select a conversation to begin</p>
              <p className="text-sm mt-1">Or start a new chat with Ayoyo AI or a veterinary officer</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;