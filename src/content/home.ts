/**
 * Homepage copy and listings for the Dharana website.
 *
 * Anything marked `sample: true` (or listed under CLIENT TO CONFIRM) is
 * placeholder content written for the layout. Replace it with the client's
 * real details before launch. Yoga programs are not here: they come from
 * the database and are managed in the admin dashboard.
 */

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Yoga Programs', href: '/plans' },
  { label: 'Retreats', href: '/retreats' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Corporate Yoga', href: '/corporate-yoga' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
] as const;

export const BOOK_NOW_HREF = '/plans';

// The three inner limbs named in the tagline धारणा ध्यान समाधिश्च.
export const INNER_LIMBS = [
  {
    term: 'Dharana',
    devanagari: 'धारणा',
    meaning: 'Concentration',
    text: 'Holding the attention steadily on one point: the breath, a posture, a sound. Every class begins here.',
  },
  {
    term: 'Dhyana',
    devanagari: 'ध्यान',
    meaning: 'Meditation',
    text: 'When that focus flows without effort, concentration becomes meditation, an unbroken awareness of the present.',
  },
  {
    term: 'Samadhi',
    devanagari: 'समाधि',
    meaning: 'Absorption',
    text: 'The quiet the practice points toward, where the one practising and the practice are no longer separate.',
  },
] as const;

export const APPROACH = [
  { title: 'Arrive', text: 'Settle on the mat and leave the day at the door.' },
  { title: 'Breathe', text: 'Pranayama to steady the body and soften the mind.' },
  { title: 'Move', text: 'Asana taught slowly, with alignment cues and options for every body.' },
  { title: 'Rest', text: 'Stillness and relaxation, so the calm stays with you after class.' },
] as const;

export const SERVICES = [
  {
    title: 'Yoga Programs',
    text: 'Small live batches, 1-on-1 guidance and monthly memberships for steady weekly practice.',
    href: '/plans',
    cta: 'View programs',
  },
  {
    title: 'Retreats',
    text: 'A few unhurried days away for deeper practice, silence, nourishing food and rest.',
    href: '/retreats',
    cta: 'See retreats',
  },
  {
    title: 'Workshops',
    text: 'Focused sessions on one theme, such as breath, the spine or meditation.',
    href: '/workshops',
    cta: 'Upcoming workshops',
  },
  {
    title: 'Corporate Yoga',
    text: 'Desk-friendly yoga and breathwork for teams, online or at your office.',
    href: '/corporate-yoga',
    cta: 'For organisations',
  },
] as const;

export interface Retreat {
  title: string;
  place: string;
  when: string;
  length: string;
  text: string;
  sample: boolean;
}

export const RETREATS: Retreat[] = [
  {
    title: 'Himalayan Stillness Retreat',
    place: 'Himachal Pradesh',
    when: 'Dates to be announced',
    length: '5 days',
    text: 'Morning practice, guided meditation, mountain walks and evenings of quiet, in a small group.',
    sample: true,
  },
  {
    title: 'Weekend Reset',
    place: 'Location to be announced',
    when: 'Dates to be announced',
    length: '2 days',
    text: 'A short retreat for busy schedules: breathwork, restorative yoga and a digital pause.',
    sample: true,
  },
];

export interface Workshop {
  title: string;
  when: string;
  format: string;
  text: string;
  sample: boolean;
}

export const WORKSHOPS: Workshop[] = [
  {
    title: 'Pranayama Foundations',
    when: 'Date to be announced',
    format: 'Online · 2 hours',
    text: 'Learn the core breathing practices safely, and how to use them every day.',
    sample: true,
  },
  {
    title: 'Yoga for a Healthy Spine',
    when: 'Date to be announced',
    format: 'Online · 2 hours',
    text: 'Gentle sequences to ease stiffness from long hours at a desk.',
    sample: true,
  },
  {
    title: 'Introduction to Meditation',
    when: 'Date to be announced',
    format: 'Online · 90 minutes',
    text: 'Simple concentration techniques: the first step from dharana towards dhyana.',
    sample: true,
  },
];

export const CORPORATE_POINTS = [
  'Short desk-friendly sessions for posture, neck and back',
  'Breathwork to manage stress and improve focus',
  'Online, at your office, or as a wellness day',
  'One-off sessions or a regular weekly programme',
] as const;

export const GALLERY = [
  {
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    alt: 'Standing posture practised outdoors',
  },
  {
    src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    alt: 'Seated breathwork at sunrise',
  },
  {
    src: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80',
    alt: 'Gentle stretch on the mat',
  },
  {
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    alt: 'Balance practice in a calm studio',
  },
  {
    src: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=900&q=80',
    alt: 'Restorative practice at the end of class',
  },
] as const;

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
  sample: boolean;
}

// SAMPLE ONLY: these are layout placeholders, not real reviews.
// Replace with genuine testimonials (with permission) before going live.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Replace with a student’s words about how the classes changed their week, their back or their sleep.',
    name: 'Student name',
    detail: 'Morning batch',
    sample: true,
  },
  {
    quote: 'Replace with a retreat or workshop participant’s experience, in two or three sentences.',
    name: 'Participant name',
    detail: 'Retreat',
    sample: true,
  },
  {
    quote: 'Replace with feedback from an HR or team lead about a corporate session.',
    name: 'Name, role',
    detail: 'Corporate wellness',
    sample: true,
  },
];

export const FAQS = [
  {
    question: 'Do I need to be flexible or experienced to join?',
    answer:
      'No. Flexibility is something yoga builds over time, not a requirement to begin. Every posture is taught with simpler options and props, and beginners are always welcome.',
  },
  {
    question: 'How do the online classes work?',
    answer:
      'Classes are live and interactive, in small groups, so the instructor can see you and offer alignment cues as you practise. You receive the joining details after booking.',
  },
  {
    question: 'I have back pain, an injury or a health condition. Can I join?',
    answer:
      'Yes, in most cases. When you book, a short confidential health form lets the instructor plan safe modifications for you. For serious or recent conditions, please check with your doctor first.',
  },
  {
    question: 'What do I need at home?',
    answer:
      'A non-slip mat and comfortable clothes. A block (or a firm book), a strap (or a belt) and a cushion are helpful but optional.',
  },
  {
    question: 'How do retreats and workshops work?',
    answer:
      'Dates, locations and prices are announced in advance on the Retreats and Workshops pages. Places are limited to keep groups small, so write to us to reserve early.',
  },
  {
    question: 'Do you offer yoga for companies?',
    answer:
      'Yes. Corporate sessions can be online or on site, one-off or weekly. Get in touch with your team size and goals and we will suggest a format.',
  },
] as const;
