import React, { useState, useRef, useEffect } from 'react'
import { Bot, Send, X, Mic, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatMessage {
  id: string
  sender: 'ai' | 'user'
  text: string
  timestamp: string
  categoryBadge?: string
}

const PRESET_PROMPTS = [
  { label: '🟢 Wet vs 🔵 Dry Waste Guide', query: 'How do I segregate wet food waste and dry plastic under SWM 2026?' },
  { label: '📍 Nearest Bin Status', query: 'Where is the nearest available smart bin with space right now?' },
  { label: '🚨 Report Overflowing Bin', query: 'How do I lodge a quick sanitization ticket for an overflowing bin?' },
  { label: '🚚 Collection Schedule', query: 'When will the next waste collection vehicle arrive in my zone?' },
]

export const LlmAssistantModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputQuery, setInputQuery] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Namaste & Welcome! 🌿 I am your ClearNova AI Assistant (EcoBot). Ask me anything in simple English! Whether you want to know how to sort waste, find a bin, or lodge a complaint, I am here for you.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  // LLM Response Generator (Knowledge Base & Intelligence Engine)
  const generateLlmResponse = (query: string): { text: string; badge?: string } => {
    const q = query.toLowerCase()

    if (q.includes('wet') || q.includes('food') || q.includes('vegetables') || q.includes('kitchen') || q.includes('organic')) {
      return {
        text: '🟢 **Green Bin (Wet Organic Waste)**:\nKitchen food leftovers, vegetable peels, fruit waste, coffee grounds, and tea leaves.\n\n*Simple Tip*: Keep wet waste in green covered bins. It gets converted into natural organic compost for campus farms!',
        badge: '🟢 WET ORGANIC STREAM',
      }
    }

    if (q.includes('dry') || q.includes('plastic') || q.includes('paper') || q.includes('bottle') || q.includes('cardboard') || q.includes('recyclable')) {
      return {
        text: '🔵 **Blue Bin (Dry Recyclable Waste)**:\nPlastic bottles, paper cartons, cardboard boxes, tin cans, glass bottles, and dry wrappers.\n\n*Simple Tip*: Make sure plastics are dry before throwing. They go directly to our campus recycling center!',
        badge: '🔵 DRY RECYCLABLE STREAM',
      }
    }

    if (q.includes('sanitary') || q.includes('diaper') || q.includes('bandage') || q.includes('mask') || q.includes('medical')) {
      return {
        text: '🟡 **Yellow Bin (Sanitary Waste)**:\nUsed tissues, medical masks, bandages, diapers, and personal hygiene items.\n\n*Simple Tip*: Wrap sanitary items in paper bags before disposal to protect our cleaning staff hygiene.',
        badge: '🟡 SANITARY STREAM',
      }
    }

    if (q.includes('battery') || q.includes('e-waste') || q.includes('chemical') || q.includes('bulb') || q.includes('mobile')) {
      return {
        text: '🔴 **Red Bin (Special Care & E-Waste)**:\nUsed lithium batteries, electronic cables, broken tube lights, paint cans, and chemical containers.\n\n*Simple Tip*: Do NOT mix with regular garbage! These are safely processed by specialized hazmat teams.',
        badge: '🔴 SPECIAL CARE STREAM',
      }
    }

    if (q.includes('bin') || q.includes('near') || q.includes('location') || q.includes('map') || q.includes('place')) {
      return {
        text: '📍 **Nearest Available Smart Bins**:\n1. **Begumpet Airport North (BIN-HYD-006)** — 45% Fill (Plenty of space!)\n2. **Koti Women’s College (BIN-HYD-008)** — 52% Fill (Normal)\n3. **Gachibowli DLF Park (BIN-HYD-004)** — 65% Fill (Normal)\n\n👉 You can also click on the **Live GIS Grid Map** tab to see real-time fill gauges!',
        badge: '📍 GIS BIN NETWORK',
      }
    }

    if (q.includes('complaint') || q.includes('report') || q.includes('overflow') || q.includes('dirty') || q.includes('clean') || q.includes('smell')) {
      return {
        text: '🚨 **Lodging a Sanitization Complaint**:\n1. Click on **Sanitization Desk** from the menu.\n2. Tap **"Lodge Sanitization Complaint"**.\n3. Our AI automatically assigns a priority score and alerts the nearest sanitation officer within 5 minutes!\n\nAverage resolution time: **18 Minutes**.',
        badge: '⚡ SANITIZATION DESK',
      }
    }

    if (q.includes('help') || q.includes('guide') || q.includes('how')) {
      return {
        text: '🌿 **ClearNova Waste Sorting Guide**:\n\n• **Green Bin (Wet)**: Kitchen waste, food leftovers, vegetable peels.\n• **Blue Bin (Dry)**: Plastic bottles, cardboard, paper, milk packets.\n• **Yellow Bin (Sanitary)**: Medical masks, tissues, diapers.\n• **Red Bin (Special Care)**: Used batteries, bulbs, e-waste.\n\nAsk me anytime if you are unsure where to dispose of an item!',
        badge: '✨ ECOBOT ASSISTANT',
      }
    }

    return {
      text: `🤖 **ClearNova AI Response**:\nUnder India's **Solid Waste Management Rules 2026**, waste is processed in 4 distinct streams: Wet 🟢, Dry 🔵, Sanitary 🟡, and Special Care 🔴.\n\nCan I help you classify a specific waste item, find a nearby bin, or track collection vehicles?`,
      badge: '✨ AI ECOBOT KNOWLEDGE',
    }
  }

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery
    if (!query.trim()) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputQuery('')
    setIsTyping(true)

    // Simulate AI thinking & response
    setTimeout(() => {
      const llmResult = generateLlmResponse(query)
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: llmResult.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        categoryBadge: llmResult.badge,
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 700)
  }

  // Voice speech-to-text integration fallback
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your message.')
      return
    }

    try {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.lang = 'en-IN'
      recognition.interimResults = false

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputQuery(transcript)
        handleSendMessage(transcript)
      }

      recognition.start()
    } catch (e) {
      setIsListening(false)
    }
  }

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-extrabold shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        >
          <Bot className="w-7 h-7 text-slate-950 animate-bounce" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-slate-950" />
          </span>
          <div className="hidden group-hover:flex absolute right-16 bg-slate-900 text-white text-xs font-mono px-3 py-1.5 rounded-xl border border-emerald-500/40 shadow-xl whitespace-nowrap">
            Ask ClearNova AI (EcoBot) 🌿
          </div>
        </button>
      </div>

      {/* CHAT MODAL WINDOW */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[92vw] sm:w-[420px] h-[580px] max-h-[80vh] z-50 flex flex-col rounded-3xl bg-white border-2 border-emerald-300 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 font-sans">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-white/20 text-white border border-white/30 shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-white text-sm flex items-center gap-1.5">
                  <span>ClearNova EcoBot AI</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                </h3>
                <p className="text-[11px] text-emerald-100 font-mono font-bold">SWM 2026 Intelligent Voice & Chat Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Presets Carousel */}
          <div className="p-2.5 bg-emerald-50/80 border-b border-emerald-200 flex gap-2 overflow-x-auto text-xs">
            {PRESET_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.query)}
                className="shrink-0 px-2.5 py-1 rounded-xl bg-white hover:bg-emerald-600 text-slate-800 hover:text-white border border-emerald-200 hover:border-emerald-600 transition-all text-[11px] font-bold shadow-xs"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#f8faf9]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-md font-bold'
                      : 'bg-white border-2 border-emerald-100 text-slate-900 rounded-bl-none shadow-sm font-medium'
                  }`}
                >
                  {msg.categoryBadge && (
                    <div className="mb-1.5">
                      <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                        {msg.categoryBadge}
                      </span>
                    </div>
                  )}
                  <div className="whitespace-pre-line">{msg.text}</div>
                  <div
                    className={`text-[9px] font-mono mt-1.5 text-right font-bold ${
                      msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono font-bold p-2">
                <Bot className="w-4 h-4 animate-spin text-emerald-600" />
                <span>EcoBot is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t-2 border-emerald-100 flex items-center gap-2">
            {/* Voice Dictation Button */}
            <button
              onClick={handleVoiceInput}
              title="Voice Dictation"
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
                  : 'bg-emerald-50 text-emerald-800 hover:text-emerald-950 border-emerald-200'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask anything (e.g. Where to throw pizza box?)..."
              className="flex-1 bg-slate-50 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 placeholder:text-slate-400 font-medium"
            />

            <Button
              size="sm"
              onClick={() => handleSendMessage()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl shadow-sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
