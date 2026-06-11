'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '@/lib/supabase';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PLAN_LABELS: Record<string, string> = {
  community: 'Community Plan',
  blueprint: 'Blueprint Plan',
};

function PaymentSuccessInner() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') ?? '';
  const clientSecret = searchParams.get('payment_intent_client_secret') ?? '';
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');

  useEffect(() => {
    if (!clientSecret) return;
    stripePromise.then(stripe => {
      if (!stripe) return;
      stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
        if (paymentIntent?.status === 'succeeded') {
          setStatus('success');
          // Mark payment as paid in Supabase
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase
              .from('profiles')
              .update({ payment_status: 'paid', plan: plan || 'community' })
              .eq('id', user.id);
          }
        } else {
          setStatus('failed');
        }
      });
    });
  }, [clientSecret]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060608',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        background: 'rgba(10,8,0,0.98)',
        border: '1px solid rgba(201,168,76,0.18)',
        borderRadius: 18,
        padding: '48px 40px',
        maxWidth: 480,
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 32px 100px rgba(0,0,0,0.8)',
      }}>
        {status === 'loading' && (
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Confirming your payment...</p>
        )}

        {status === 'success' && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: '#E2C472', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              You're in.
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: '0 0 8px', lineHeight: 1.6 }}>
              {PLAN_LABELS[plan] ?? 'Your plan'} is now active.
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: '0 0 32px', lineHeight: 1.6 }}>
              Check your email for your receipt and login details.
            </p>
            <a
              href="/dashboard"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: 999,
                background: 'linear-gradient(135deg, #E2C472 0%, #C9A84C 100%)',
                color: '#0a0800',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
              }}
            >
              Go to Dashboard →
            </a>
          </>
        )}

        {status === 'failed' && (
          <>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#f87171', margin: '0 0 12px' }}>
              Payment unsuccessful
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 32px' }}>
              Something went wrong. Please try again.
            </p>
            <a
              href="/demo"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: 999,
                border: '1px solid rgba(201,168,76,0.35)',
                color: '#E2C472',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Try Again
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, letterSpacing: '0.15em' }}>LOADING...</p>
      </div>
    }>
      <PaymentSuccessInner />
    </Suspense>
  );
}
