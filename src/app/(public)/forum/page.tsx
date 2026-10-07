'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  MessageSquare,
  Search,
  Plus,
  ThumbsUp,
  CheckCircle2,
  Scale,
  ShieldCheck,
  ArrowRight,
  X,
  Filter,
} from 'lucide-react'
import { LEGAL_CATEGORIES } from '@/lib/constants'

interface ForumAnswer {
  id: string
  content: string
  authorName: string
  isLawyer: boolean
  createdAt: string
}

interface ForumQuestion {
  id: string
  title: string
  category: string
  content: string
  city: string
  upvotes: number
  answerCount: number
  createdAt: string
  answers?: ForumAnswer[]
}

export default function ForumPage() {
  const [questions, setQuestions] = useState<ForumQuestion[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Ask Question Modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState<string>('')
  const [newCategory, setNewCategory] = useState<string>('Property Law')
  const [newContent, setNewContent] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitMessage, setSubmitMessage] = useState<string>('')

  useEffect(() => {
    let isMounted = true

    async function loadForum() {
      setIsLoading(true)
      try {
        const res = await fetch('/api/forum')
        const json = await res.json()
        if (json.success && json.data && isMounted) {
          setQuestions(json.data)
        }
      } catch (err) {
        console.error('Failed to load forum:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadForum()
    return () => {
      isMounted = false
    }
  }, [])

  // Handle Ask Question Submission
  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const res = await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          content: newContent,
          city: 'Hyderabad',
        }),
      })

      const json = await res.json()
      if (json.success) {
        setSubmitMessage('Question posted! High Court advocates will answer shortly.')
        setQuestions((prev) => [
          {
            id: `fq-${Date.now()}`,
            title: newTitle,
            category: newCategory,
            content: newContent,
            city: 'Hyderabad',
            upvotes: 1,
            answerCount: 0,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ])
        setTimeout(() => {
          setIsModalOpen(false)
          setNewTitle('')
          setNewContent('')
          setSubmitMessage('')
        }, 1500)
      }
    } catch {
      setSubmitMessage('Failed to post question. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter questions
  const filtered = questions.filter((q) => {
    const matchCat = selectedCategory === 'ALL' || q.category === selectedCategory
    const matchSearch =
      !searchQuery ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#1a3a6b] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs text-[#C9A84C] backdrop-blur-md">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Community Legal Knowledge • Verified Advocate Responses</span>
          </div>

          <h1 className="font-hero text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Citizen Legal Forum & Free Advice
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Browse real Indian legal questions answered by verified High Court & District Court advocates.
            Ask your question for free or schedule a 1-on-1 private consultation.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C9A84C] text-[#0B1F3A] px-5 py-3 text-xs font-bold hover:bg-amber-400 transition shadow-lg active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Ask a Legal Question Free</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Forum Workspace */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legal questions (e.g. RERA delay, cheque bounce)..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-800 shadow-2xs focus:border-[#0B1F3A] focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[#0B1F3A] shadow-2xs focus:outline-none"
            >
              <option value="ALL">All Legal Topics</option>
              {LEGAL_CATEGORIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="rounded-md bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#0B1F3A]">
                    {item.category}
                  </span>
                  <h3 className="font-hero text-base font-bold text-[#0B1F3A] leading-snug pt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.content}</p>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-2.5 min-w-[50px] shrink-0">
                  <ThumbsUp className="h-4 w-4 text-slate-400" />
                  <span className="text-xs font-extrabold text-[#0B1F3A] mt-1">{item.upvotes}</span>
                </div>
              </div>

              {/* Verified Answers (if any) */}
              {item.answers && item.answers.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                  {item.answers.map((ans) => (
                    <div
                      key={ans.id}
                      className="rounded-xl bg-emerald-50/50 border border-emerald-100 p-4 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#0B1F3A]">{ans.authorName}</span>
                          {ans.isLawyer && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-[#0D7A55]/10 text-[#0D7A55] px-1.5 py-0.5 text-[10px] font-bold">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Verified Advocate</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {new Date(ans.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                          })}
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{ans.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer CTA */}
              <div className="flex items-center justify-between text-xs pt-2 text-slate-400">
                <span>{item.city} • {item.answerCount} Lawyer Answers</span>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-1 font-bold text-[#0B1F3A] hover:text-[#C9A84C] transition"
                >
                  <span>Consult an Advocate</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-3">
              <Scale className="h-8 w-8 text-slate-400 mx-auto" />
              <h3 className="font-hero text-base font-bold text-[#0B1F3A]">No Questions Found</h3>
              <p className="text-xs text-slate-500">
                Be the first citizen to ask a question under this category!
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="rounded-xl bg-[#0B1F3A] px-4 py-2 text-xs font-bold text-white"
              >
                Ask Question Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Ask Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <h3 className="font-hero text-lg font-bold text-[#0B1F3A]">
                Ask a Legal Question Free
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your question will be public on the forum. Do not post confidential identity numbers.
              </p>
            </div>

            <form onSubmit={handleAskQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                  Topic / Legal Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-[#0B1F3A] focus:outline-none"
                >
                  {LEGAL_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                  Question Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Can landlord deduct 1 month rent if I give 15 days notice?"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                  Details & Facts of Your Situation
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Explain what happened, dates, and amounts involved..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:outline-none"
                  required
                />
              </div>

              {submitMessage && (
                <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg">
                  {submitMessage}
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#0B1F3A] px-5 py-2 text-xs font-bold text-white hover:bg-[#1a3a6b] disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting...' : 'Post Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
