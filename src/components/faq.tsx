import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How do I find events?',
    answer:
      'You can use the filters at the top of the page to narrow down events by game, type, style, mod type, and region.',
  },
  {
    question: 'How do I join an event?',
    answer:
      'Click on an event card to see more details, including server name and password (if any). Follow the instructions provided by the event host.',
  },
  {
    question: 'Can I host my own event?',
    answer:
      'This feature is not yet available but is planned for a future update. Stay tuned!',
  },
  {
    question: 'What is the difference between PvE, PvP, and PvPvE?',
    answer:
      'PvE (Player versus Environment) focuses on players fighting against AI. PvP (Player versus Player) involves players fighting against each other. PvPvE combines both elements.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleFAQ(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="mx-auto mt-12 mb-12 w-full max-w-2xl">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            <button
              className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-semibold text-gray-800">
                {item.question}
              </span>
              <span>{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="border-t border-gray-200 px-6 py-4 text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
