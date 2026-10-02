'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Do I need to be flexible to start yoga with Dhaarna?',
    answer:
      "Not at all. In fact, Dhaarna's core philosophy is: 'Flexibility is not a prerequisite to start yoga.' Yoga is how you cultivate functional mobility, balance, and ease over time. Every posture is taught with mindful variations and safe props suited to your body.",
  },
  {
    question: 'How are the live online sessions conducted?',
    answer:
      'Sessions are hosted live and interactively over Zoom in small, intimate cohorts of 15 students. This allows Dhaarna to observe your posture in real time, provide personalized verbal alignment cues, and answer questions. High-definition recordings are also archived if you ever miss a morning class.',
  },
  {
    question: 'I have lower back pain or neck/joint stiffness. Is this safe for me?',
    answer:
      'Yes. In our checkout flow, you complete a confidential health and injury intake form. Dhaarna personally reviews your notes before each session, ensuring you receive spine-friendly modifications that decompress the vertebrae without straining your joints.',
  },
  {
    question: 'What props or equipment do I need at home?',
    answer:
      'All you need is a comfortable non-slip yoga mat and breathable clothes. Having a standard yoga block (or sturdy book), a soft strap (or cotton belt), and a small cushion can enhance comfort during restorative postures and seated breathwork.',
  },
  {
    question: 'What happens immediately after I purchase a plan?',
    answer:
      'You receive an instant digital confirmation with your class schedule, onboarding instructions, and Zoom link. Dhaarna is automatically notified of your registration and health intake notes, and you will be welcomed into the private student WhatsApp community.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="divide-y divide-cream-dark border-y border-cream-dark max-w-4xl mx-auto">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="py-6 sm:py-8 transition-colors">
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left flex items-center justify-between gap-6 text-olive hover:text-sage-dark transition-colors"
            >
              <span className="text-lg sm:text-2xl font-serif text-olive font-normal leading-snug">
                {faq.question}
              </span>
              <div className="p-2 rounded-full border border-cream-dark text-olive/60 shrink-0 bg-cream">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>

            {isOpen && (
              <div className="pt-4 pr-12 text-sm sm:text-base text-olive/70 leading-relaxed font-light font-sans">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
