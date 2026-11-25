'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '@/content/home';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        const panelId = `faq-panel-${idx}`;
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-umber transition-colors hover:text-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
              >
                <span className="font-serif text-xl leading-snug sm:text-2xl">{faq.question}</span>
                <span className="shrink-0 rounded-full border border-line p-2 text-umber-muted">
                  {isOpen ? <Minus className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              hidden={!isOpen}
              className="pb-6 pr-12 font-light leading-relaxed text-umber-light"
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
