'use client'

import React, { useState } from 'react'
import {
  Send,
  Paperclip,
  User,
  ShieldCheck,
  CheckCheck,
  Search,
  Phone,
  Video,
} from 'lucide-react'

export default function ClientMessagesPage() {
  const [selectedLawyer, setSelectedLawyer] = useState('priya')
  const [inputText, setInputText] = useState('')

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'lawyer',
      text: 'Hello Rahul, I have received the survey map and sale deed for your Kompally property.',
      time: '10:30 AM',
    },
    {
      id: 2,
      sender: 'client',
      text: 'Great, Adv. Priya! Did you verify whether the neighbour encroached past the sanctioned boundary?',
      time: '10:35 AM',
    },
    {
      id: 3,
      sender: 'lawyer',
      text: 'Yes, looking at the HMDA approved layout plan, their wall extends approximately 2.2 feet into your registered parcel. I have drafted the legal notice under TPA Section 5.',
      time: '10:42 AM',
    },
    {
      id: 4,
      sender: 'client',
      text: 'Understood. When will the legal demand notice be dispatched by speed post?',
      time: '10:45 AM',
    },
    {
      id: 5,
      sender: 'lawyer',
      text: 'We are sending it on Monday morning. I will upload the postal dispatch receipt and tracking number to your case tracker.',
      time: '10:48 AM',
    },
  ])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newMsg = {
      id: Date.now(),
      sender: 'client',
      text: inputText,
      time: 'Just now',
    }
    setMessages((prev) => [...prev, newMsg])
    setInputText('')
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Left Chat Sidebar (Conversations) */}
      <div className="w-80 border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <h1 className="font-bold text-sm text-[#0B1F3A]">Advocate Messages</h1>
          <p className="text-[11px] text-slate-500">Direct encrypted consultation chats</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {/* Conversation 1: Priya */}
          <button
            onClick={() => setSelectedLawyer('priya')}
            className={`w-full p-4 flex items-start gap-3 text-left transition ${
              selectedLawyer === 'priya' ? 'bg-slate-50 border-l-4 border-l-[#C9A84C]' : 'hover:bg-slate-50'
            }`}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                alt="Priya"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="flex-1 truncate">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-[#0B1F3A]">Adv. Priya Sharma</h2>
                <span className="text-[10px] text-slate-400">10:48 AM</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                We are sending it on Monday morning...
              </p>
              <span className="inline-block rounded bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 mt-1">
                Property Law
              </span>
            </div>
          </button>

          {/* Conversation 2: Anjali */}
          <button
            onClick={() => setSelectedLawyer('anjali')}
            className={`w-full p-4 flex items-start gap-3 text-left transition ${
              selectedLawyer === 'anjali' ? 'bg-slate-50 border-l-4 border-l-[#C9A84C]' : 'hover:bg-slate-50'
            }`}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&auto=format&fit=crop&q=80"
                alt="Anjali"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-slate-300 ring-2 ring-white" />
            </div>
            <div className="flex-1 truncate">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-[#0B1F3A]">Adv. Anjali Kapoor</h2>
                <span className="text-[10px] text-slate-400">Yesterday</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                Consultation confirmed for Monday 3 PM...
              </p>
              <span className="inline-block rounded bg-purple-50 px-1.5 py-0.5 text-[9px] font-semibold text-purple-700 mt-1">
                Family Law
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Right Chat Window */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Chat Header */}
        <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
              alt="Priya"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xs font-bold text-[#0B1F3A]">Adv. Priya Sharma</h2>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Online • Telangana High Court Bar</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://meet.google.com/leg-ease-priya"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-[#0B1F3A] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1a3a6b]"
            >
              <Video className="h-3.5 w-3.5 text-[#C9A84C]" />
              <span>Google Meet</span>
            </a>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.map((m) => {
            const isClient = m.sender === 'client'
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md rounded-2xl p-3.5 text-xs shadow-2xs leading-relaxed ${
                    isClient
                      ? 'bg-[#0B1F3A] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <span>{m.time}</span>
                  {isClient && <CheckCheck className="h-3 w-3 text-blue-500" />}
                </div>
              </div>
            )
          })}
        </div>

        {/* Message Input Footer */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
          <button
            type="button"
            onClick={() => alert('Select document from vault to attach')}
            className="p-2 text-slate-400 hover:text-slate-600 transition"
            title="Attach file"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message to Adv. Priya..."
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-[#0B1F3A] focus:border-[#0B1F3A] focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B1F3A] text-white shadow-sm hover:bg-[#1a3a6b] transition"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
