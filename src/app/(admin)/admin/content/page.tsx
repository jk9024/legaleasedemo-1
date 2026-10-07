'use client'

import React, { useState } from 'react'
import { FileCheck, MessageSquare, BookOpen, Trash2, CheckCircle2 } from 'lucide-react'

export default function AdminContentPage() {
  const [tab, setTab] = useState<'forum' | 'templates' | 'news'>('forum')

  const forumQuestions = [
    {
      id: 'fq-1',
      title: 'Can landlord withhold security deposit for regular repainting in Hyderabad?',
      author: 'Rahul Kumar',
      category: 'Property Law',
      views: 340,
      answersCount: 1,
      status: 'APPROVED',
    },
    {
      id: 'fq-2',
      title: 'How long does mutual consent divorce take in Telangana Family Court?',
      author: 'Rahul Kumar',
      category: 'Family Law',
      views: 520,
      answersCount: 1,
      status: 'APPROVED',
    },
    {
      id: 'fq-3',
      title: 'Is employer allowed to hold back relieving letter if notice period is bought out?',
      author: 'Rahul Kumar',
      category: 'Labour Law',
      views: 410,
      answersCount: 1,
      status: 'APPROVED',
    },
  ]

  const templates = [
    { id: 't-1', title: 'Residential Lease Agreement (Telangana & AP)', downloads: 1240, type: 'FREE' },
    { id: 't-2', title: 'Legal Notice for Cheque Dishonour (S.138 NI Act)', downloads: 890, type: 'FREE' },
    { id: 't-3', title: 'Right to Information (RTI) Application Form', downloads: 2150, type: 'FREE' },
    { id: 't-4', title: 'Comprehensive Non-Disclosure Agreement (NDA)', downloads: 460, type: 'PREMIUM (₹299)' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-hero text-2xl font-bold text-white">Content & Forum Moderation</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review community legal questions, verify standard drafting templates, and publish legal news.
          </p>
        </div>

        <div className="flex rounded-xl bg-slate-800 p-1 text-xs font-semibold">
          <button
            onClick={() => setTab('forum')}
            className={`rounded-lg px-3 py-1.5 transition ${
              tab === 'forum' ? 'bg-[#C9A84C] text-[#0B1F3A]' : 'text-slate-300'
            }`}
          >
            Forum ({forumQuestions.length})
          </button>
          <button
            onClick={() => setTab('templates')}
            className={`rounded-lg px-3 py-1.5 transition ${
              tab === 'templates' ? 'bg-[#C9A84C] text-[#0B1F3A]' : 'text-slate-300'
            }`}
          >
            Templates ({templates.length})
          </button>
        </div>
      </div>

      {tab === 'forum' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="p-4">Question Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Views</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {forumQuestions.map((q) => (
                <tr key={q.id}>
                  <td className="p-4 font-bold text-white max-w-sm truncate">{q.title}</td>
                  <td className="p-4 text-slate-400">{q.category}</td>
                  <td className="p-4">{q.author}</td>
                  <td className="p-4">{q.views}</td>
                  <td className="p-4">
                    <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      {q.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Moderating question: ${q.title}`)}
                      className="rounded bg-slate-800 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-slate-700"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'templates' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {templates.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex items-center justify-between"
            >
              <div>
                <h3 className="text-xs font-bold text-white">{t.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  Downloads: {t.downloads} • {t.type}
                </p>
              </div>
              <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
                ACTIVE
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
