import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const PLANS = {
  community: {
    amount: 6700,      // $67.00 in cents
    currency: 'usd',
    name: 'Community Plan',
    description: 'Monthly membership — cancel any time',
  },
  blueprint: {
    amount: 180000,    // $1,800.00 in cents
    currency: 'usd',
    name: 'Blueprint Plan',
    description: 'One-time payment — lifetime access',
  },
} as const;
