'use client';

import React, { useState } from 'react';
import { Plus, Minus, Mail } from 'lucide-react';
import { Settings } from '@/types';

interface FaqSectionProps {
  settings?: Settings | null;
}

export default function FaqSection({ settings }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const instructorName = settings?.instructorName || 'Dhaarna Sharma';
  const firstName = instructorName.split(' ')[0] || 'Dhaarna';
  const notificationEmail = settings?.notificationEmail || 'dhaarna@yogawithdhaarna.com';

  const faqs = [
    {
      question: `Do I need to be flexible to start yoga with ${firstName}?`,
      answer:
        `Not at all. In fact, ${firstName}'s core philosophy is: 'Flexibility is not a prerequisite to start yoga.' Yoga is how you cultivate functional mobility, balance, and ease over time. Every posture is taught with mindful variations and safe props suited to your body.`,
    },
    {
      question: 'How are the live online sessions conducted?',
      answer:
        `Sessions are hosted live and interactively over Zoom in small, intimate cohorts of 15 students. This allows ${firstName} to observe your posture in real time, provide personalized verbal alignment cues, and answer questions. High-definition recordings are also archived if you ever miss a morning class.`,
    },
    {
      question: 'I have lower back pain or neck/joint stiffness. Is this safe for me?',
      answer:
        `Yes. In our checkout flow, you complete a confidential health and injury intake form. ${firstName} personally reviews your notes before each session, ensuring you receive spine-friendly modifications that decompress the vertebrae without straining your joints.`,
    },
    {
      question: 'What props or equipment do I need at home?',
      answer:
        'All you need is a comfortable non-slip yoga mat and breathable clothes. Having a standard yoga block (or sturdy book), a soft strap (or cotton belt), and a small cushion can enhance comfort during restorative postures and seated breathwork.',
    },
    {
      question: 'What happens immediately after I purchase a plan?',
      answer:
        `You receive an instant digital confirmation with your class schedule, onboarding instructions, and Zoom link. ${firstName} is automatically notified of your registration and health intake notes, and you will be welcomed into the private student community.`,
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="divide-y divide-cream-dark border-y border-cream-dark">
        {faqs.map((faq, idx) => {
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

      <div className="text-center pt-2">
        <p className="text-xs text-olive/60 font-light flex items-center justify-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-gold" />
          <span>Have a specific inquiry? Contact {firstName} directly at </span>
          <a
            href={`mailto:${notificationEmail}`}
            className="text-olive underline underline-offset-4 hover:text-sage-dark font-medium transition-colors"
          >
            {notificationEmail}
          </a>
        </p>
      </div>
    </div>
  );
}
