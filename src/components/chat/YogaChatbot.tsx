'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { Plan } from '@/types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendedPlan?: Plan | null;
  timestamp: string;
}

const STARTER_PROMPTS = [
  'Which class is best for a complete beginner?',
  'I have desk-worker lower back and neck stiffness',
  'What are the morning cohort timings?',
  'What should I eat and wear before practice?',
];

export default function YogaChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Namaste 🙏 I am Prana, your AI practice guide for **Yoga with Dhaarna**.\n\nWhether you wish to relieve physical stiffness, discover the right class for your schedule, or learn how to prepare your mat, I am here to guide your journey.',
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowGreetingBubble(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Thank you for your inquiry. Please reach out to Dhaarna directly if you need personalized assistance.',
        recommendedPlan: data.recommendedPlan || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'assistant',
          content:
            'I apologize for the momentary stillness in our connection. You can always explore our active batches directly below or message Dhaarna directly on Instagram @yogawithdhaarna.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          'Namaste 🙏 The space is reset. How may I support your mindful yoga practice today?',
        timestamp: 'Just now',
      },
    ]);
  };

  // Helper to format simple markdown bolding and linebreaks
  const renderFormattedText = (text: string) => {
    const paragraphs = text.split('\n\n');
    return paragraphs.map((para, pIdx) => {
      const lines = para.split('\n');
      return (
        <p key={pIdx} className="mb-2 last:mb-0 leading-relaxed">
          {lines.map((line, lIdx) => {
            // Check for bullet line
            const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
            const cleanLine = isBullet ? line.replace(/^[•-]\s*/, '') : line;

            // Simple parser for **bold** text
            const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

            return (
              <span key={lIdx} className={isBullet ? 'flex items-start gap-1.5 ml-1 mt-1 text-xs sm:text-sm' : 'block text-xs sm:text-sm'}>
                {isBullet && <span className="text-sage font-bold">•</span>}
                <span>
                  {parts.map((part, partIdx) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <strong key={partIdx} className="font-semibold text-olive">
                          {part.slice(2, -2)}
                        </strong>
                      );
                    }
                    if (part.startsWith('*') && part.endsWith('*')) {
                      return (
                        <em key={partIdx} className="italic text-olive/80">
                          {part.slice(1, -1)}
                        </em>
                      );
                    }
                    return part;
                  })}
                </span>
              </span>
            );
          })}
        </p>
      );
    });
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* ============================================================ */}
      {/* 1. FLOATING CHAT TRIGGER BUTTON & AMBIENT GREETING PILL       */}
      {/* ============================================================ */}
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
        
        {/* Ambient Greeting Tooltip (shown initially) */}
        {!isOpen && showGreetingBubble && (
          <div className="relative group bg-white/95 backdrop-blur-md text-olive border border-cream-dark/90 px-4 py-2.5 rounded-2xl shadow-xl shadow-olive/10 max-w-[260px] animate-fade-in flex items-start gap-2.5">
            <span className="p-1 rounded-full bg-sage/20 text-sage shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <div className="text-xs">
              <p className="font-medium text-olive">Have questions about classes?</p>
              <p className="text-olive/70 font-light mt-0.5">Ask Prana, our mindful AI guide.</p>
            </div>
            <button
              onClick={() => setShowGreetingBubble(false)}
              className="text-olive/40 hover:text-olive ml-1 p-0.5 rounded transition"
              aria-label="Dismiss greeting"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Floating Action Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close mindful chat' : 'Open mindful AI yoga assistant'}
          className="group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-olive text-cream shadow-2xl shadow-olive/30 hover:bg-olive-light hover:shadow-olive/40 active:scale-95 transition-all duration-300 border border-white/20"
        >
          {/* Subtle Ambient Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-sage/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {isOpen ? (
            <>
              <ChevronDown className="w-5 h-5 text-cream transition-transform duration-200" />
              <span className="font-sans text-xs sm:text-sm font-medium tracking-wide">Close</span>
            </>
          ) : (
            <>
              <div className="relative">
                <Sparkles className="w-5 h-5 text-gold-light animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sage ring-2 ring-olive" />
              </div>
              <span className="font-sans text-xs sm:text-sm font-medium tracking-wide">
                Ask Prana AI
              </span>
            </>
          )}
        </button>
      </div>

      {/* ============================================================ */}
      {/* 2. SLIDE-OVER / FLOATING GLASS CHAT WINDOW                   */}
      {/* ============================================================ */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-7 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] h-[620px] flex flex-col rounded-3xl bg-cream/98 backdrop-blur-2xl border border-cream-dark/90 shadow-2xl shadow-olive/25 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          
          {/* HEADER */}
          <div className="px-5 py-4 bg-gradient-to-r from-olive via-olive-light to-olive text-cream flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-cream/15 border border-white/20 flex items-center justify-center text-gold-light">
                <Sparkles className="w-4 h-4" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-olive" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif italic text-base sm:text-lg text-cream font-medium tracking-wide">
                    Prana
                  </h3>
                  <span className="text-[10px] font-sans px-1.5 py-0.5 rounded-full bg-cream/15 text-cream/90 font-light uppercase tracking-wider">
                    AI Concierge
                  </span>
                </div>
                <p className="text-[11px] text-cream/70 font-light">
                  Mindful Practice &amp; Enrollment Guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Restart conversation"
                className="p-1.5 rounded-full text-cream/70 hover:text-cream hover:bg-cream/10 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="p-1.5 rounded-full text-cream/70 hover:text-cream hover:bg-cream/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CHAT MESSAGES BODY */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-olive">
            
            {/* Starter Suggestion Chips (visible when only welcome message exists) */}
            {messages.length === 1 && (
              <div className="space-y-2 pt-1 pb-2">
                <p className="text-[11px] font-sans font-medium uppercase tracking-[0.15em] text-sage">
                  Suggested inquiries
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {STARTER_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="text-left text-xs bg-white/80 hover:bg-sage/10 hover:border-sage border border-cream-dark/80 text-olive/85 px-3 py-1.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm shadow-olive/5"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Rendered Messages */}
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[88%] sm:max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm ${
                    msg.role === 'user'
                      ? 'bg-olive text-cream rounded-br-xs shadow-md shadow-olive/10'
                      : 'bg-white/90 text-olive border border-cream-dark/90 rounded-bl-xs shadow-sm shadow-olive/5'
                  }`}
                >
                  {renderFormattedText(msg.content)}

                  {/* INTERACTIVE RECOMMENDATION CARD */}
                  {msg.recommendedPlan && (
                    <div className="mt-3 pt-3 border-t border-cream-dark/70 text-olive">
                      <div className="p-3 rounded-xl bg-cream/70 border border-cream-dark/80 space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-sage bg-sage/15 px-2 py-0.5 rounded-full inline-block mb-1">
                              {msg.recommendedPlan.badge || msg.recommendedPlan.level || 'Recommended Plan'}
                            </span>
                            <h4 className="font-serif italic text-sm sm:text-base font-semibold text-olive leading-tight">
                              {msg.recommendedPlan.title}
                            </h4>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-serif text-sm sm:text-base font-bold text-olive">
                              ₹{msg.recommendedPlan.price.toLocaleString()}
                            </span>
                            <p className="text-[10px] text-olive/60">
                              {msg.recommendedPlan.duration}
                            </p>
                          </div>
                        </div>

                        <p className="text-[11px] text-olive/75 line-clamp-2 font-light">
                          {msg.recommendedPlan.description}
                        </p>

                        <div className="flex items-center gap-2 pt-1">
                          <Link
                            href={`/checkout/${msg.recommendedPlan.id}`}
                            onClick={() => setIsOpen(false)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-olive text-cream hover:bg-olive-light text-xs font-medium transition shadow-sm"
                          >
                            <span>Enroll Now</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href="/#classes"
                            onClick={() => setIsOpen(false)}
                            className="px-2.5 py-1.5 rounded-lg border border-olive/20 text-olive hover:bg-olive/5 text-xs transition"
                          >
                            Explore
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <span className="text-[10px] text-olive/40 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Reflecting Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="rounded-2xl rounded-bl-xs bg-white/90 border border-cream-dark/90 px-4 py-3 text-xs text-olive/70 flex items-center gap-2 shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-sage animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-sage animate-bounce" />
                  </div>
                  <span className="text-olive/60 italic font-serif text-xs">
                    Prana is reflecting...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* WHATSAPP ESCALATION FOOTER */}
          <div className="px-4 py-2 bg-cream-light/80 border-t border-cream-dark/60 flex items-center justify-between text-[11px] text-olive/70">
            <span className="flex items-center gap-1 text-olive/60">
              <ShieldCheck className="w-3.5 h-3.5 text-sage" />
              Mindful &amp; secure guidance
            </span>
            <a
              href="https://wa.me/?text=Namaste%20Dhaarna,%20I%20have%20an%20inquiry%20regarding%20your%20yoga%20classes."
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage hover:text-sage-dark font-medium underline inline-flex items-center gap-1"
            >
              WhatsApp Dhaarna
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 sm:p-4 bg-white/95 border-t border-cream-dark/80 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Ask about classes, stiffness, timings..."
              disabled={isLoading}
              className="flex-1 bg-cream/70 text-olive placeholder-olive/40 text-xs sm:text-sm px-4 py-2.5 rounded-full border border-cream-dark focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-olive text-cream flex items-center justify-center hover:bg-olive-light disabled:opacity-40 disabled:hover:bg-olive transition shadow-md shadow-olive/10 shrink-0"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
