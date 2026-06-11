// MDAB course structure — 8 modules, 38 lessons.
// videoUrl: paste a Vimeo/YouTube embed URL per lesson when ready.
// Leave "" to show the "video coming soon" placeholder.

export interface Lesson {
  id: string;       // stable id stored in lesson_progress
  title: string;
  duration: string; // display only
  videoUrl: string;
}

export interface Module {
  id: string;
  title: string;
  tag: string;
  description: string;
  lessons: Lesson[];
}

export const COURSE: Module[] = [
  {
    id: '01', title: 'The Million Dollar Agent Mindset', tag: 'Mindset',
    description: 'The identity, standards and operating system behind top producers.',
    lessons: [
      { id: '01-01', title: 'Welcome to the Blueprint', duration: '12 min', videoUrl: '' },
      { id: '01-02', title: 'The Million Dollar Mindset Shift', duration: '18 min', videoUrl: '' },
    ],
  },
  {
    id: '02', title: 'Effective Prospecting & Follow-Up Systems', tag: 'Prospecting',
    description: 'Fill your pipeline with a repeatable daily prospecting machine.',
    lessons: [
      { id: '02-01', title: 'The Prospecting Operating System', duration: '15 min', videoUrl: '' },
      { id: '02-02', title: 'Cold Calling That Converts', duration: '22 min', videoUrl: '' },
      { id: '02-03', title: 'Door Knocking & Farming Areas', duration: '17 min', videoUrl: '' },
      { id: '02-04', title: 'Social Prospecting on Instagram', duration: '20 min', videoUrl: '' },
      { id: '02-05', title: 'WhatsApp Follow-Up Sequences', duration: '14 min', videoUrl: '' },
      { id: '02-06', title: 'Building Your Database', duration: '16 min', videoUrl: '' },
      { id: '02-07', title: 'The 90-Day Follow-Up System', duration: '19 min', videoUrl: '' },
      { id: '02-08', title: 'Tracking Your Numbers', duration: '11 min', videoUrl: '' },
    ],
  },
  {
    id: '03', title: 'Closing Meetings & Overcoming Objections', tag: 'Closing',
    description: 'Run meetings that end in signed agreements.',
    lessons: [
      { id: '03-01', title: 'The Meeting Framework', duration: '21 min', videoUrl: '' },
      { id: '03-02', title: 'Handling the Top 10 Objections', duration: '26 min', videoUrl: '' },
      { id: '03-03', title: 'Pricing Conversations', duration: '18 min', videoUrl: '' },
      { id: '03-04', title: 'Closing Techniques That Feel Natural', duration: '17 min', videoUrl: '' },
    ],
  },
  {
    id: '04', title: 'Winning Listings', tag: 'Listings',
    description: 'Become the obvious choice in every listing presentation.',
    lessons: [
      { id: '04-01', title: 'The Listing Presentation', duration: '24 min', videoUrl: '' },
      { id: '04-02', title: 'Pre-Meeting Positioning', duration: '15 min', videoUrl: '' },
      { id: '04-03', title: 'Exclusive vs Open Listings', duration: '13 min', videoUrl: '' },
      { id: '04-04', title: 'Marketing the Listing', duration: '19 min', videoUrl: '' },
    ],
  },
  {
    id: '05', title: 'Buyer Qualification & Negotiation Skills', tag: 'Negotiation',
    description: 'Qualify hard, negotiate harder, protect every deal.',
    lessons: [
      { id: '05-01', title: 'Qualifying Buyers Properly', duration: '16 min', videoUrl: '' },
      { id: '05-02', title: 'Showing Properties Strategically', duration: '14 min', videoUrl: '' },
      { id: '05-03', title: 'Negotiation Fundamentals', duration: '23 min', videoUrl: '' },
      { id: '05-04', title: 'Multiple Offer Situations', duration: '17 min', videoUrl: '' },
      { id: '05-05', title: 'Keeping Deals Together', duration: '15 min', videoUrl: '' },
    ],
  },
  {
    id: '06', title: 'Off Plan Investment Strategies', tag: 'Off-Plan',
    description: "Tyron's playbook for high-ticket Dubai off-plan inventory.",
    lessons: [
      { id: '06-01', title: 'Why Off-Plan, Why Dubai', duration: '18 min', videoUrl: '' },
      { id: '06-02', title: 'Working With Developers', duration: '20 min', videoUrl: '' },
      { id: '06-03', title: 'Selling to International Investors', duration: '22 min', videoUrl: '' },
      { id: '06-04', title: 'Payment Plans & ROI Conversations', duration: '16 min', videoUrl: '' },
    ],
  },
  {
    id: '07', title: 'Securing Repeat Business & Referrals', tag: 'Referrals',
    description: 'Turn every closed deal into the next three.',
    lessons: [
      { id: '07-01', title: 'The Post-Sale System', duration: '14 min', videoUrl: '' },
      { id: '07-02', title: 'Asking for Referrals', duration: '12 min', videoUrl: '' },
      { id: '07-03', title: 'Client Events & Touchpoints', duration: '15 min', videoUrl: '' },
      { id: '07-04', title: 'Building Your Personal Brand', duration: '21 min', videoUrl: '' },
    ],
  },
  {
    id: '08', title: 'Working Smart & Reaching Your Full Potential', tag: 'Scale',
    description: 'Systems, leverage and longevity at the top.',
    lessons: [
      { id: '08-01', title: 'Time Blocking for Agents', duration: '13 min', videoUrl: '' },
      { id: '08-02', title: 'Building a Team', duration: '19 min', videoUrl: '' },
      { id: '08-03', title: 'Leverage & Delegation', duration: '16 min', videoUrl: '' },
      { id: '08-04', title: 'Your 12-Month Plan', duration: '18 min', videoUrl: '' },
      { id: '08-05', title: 'Avoiding Burnout', duration: '14 min', videoUrl: '' },
      { id: '08-06', title: 'The Wealth Mindset', duration: '17 min', videoUrl: '' },
      { id: '08-07', title: 'Graduation: Your Next Move', duration: '10 min', videoUrl: '' },
    ],
  },
];

export const TOTAL_LESSONS = COURSE.reduce((n, m) => n + m.lessons.length, 0);

export function findLesson(lessonId: string) {
  for (const mod of COURSE) {
    const lesson = mod.lessons.find(l => l.id === lessonId);
    if (lesson) return { module: mod, lesson };
  }
  return null;
}
