'use client';
import React, { useState, useEffect } from 'react';

interface CreditCardFormProps {
  defaultHolder?: string;
  maskMiddle?: boolean;
  ring1?: string;
  ring2?: string;
  showSubmit?: boolean;
  onChange?: (data: CardData) => void;
  onSubmit?: (data: CardData) => void;
}

interface CardData {
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
  valid: boolean;
}

function luhn(n: string): boolean {
  const digits = n.replace(/\D/g, '');
  if (digits.length < 13) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (alt) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function formatNumber(v: string) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d;
}

export default function CreditCardForm({
  defaultHolder = '',
  maskMiddle = true,
  ring1 = '#C9A84C',
  ring2 = '#E2C472',
  showSubmit = true,
  onChange,
  onSubmit,
}: CreditCardFormProps) {
  const [number, setNumber] = useState('');
  const [holder, setHolder] = useState(defaultHolder);
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [flipped, setFlipped] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const displayNumber = (() => {
    const raw = number.replace(/\D/g, '').padEnd(16, '•');
    if (maskMiddle && raw.length === 16) {
      return (raw.slice(0, 4) + ' ' + '•••• •••• ' + raw.slice(12)).trim();
    }
    return formatNumber(raw);
  })();

  const cardData: CardData = {
    number: number.replace(/\D/g, ''),
    holder,
    expiry,
    cvv,
    valid: luhn(number) && holder.trim().length > 1 && expiry.length === 5 && cvv.length === 3,
  };

  useEffect(() => { onChange?.(cardData); }, [number, holder, expiry, cvv]);

  function validate() {
    const e: Record<string, string> = {};
    if (!luhn(number)) e.number = 'Invalid card number';
    if (holder.trim().length < 2) e.holder = 'Enter cardholder name';
    if (expiry.length !== 5) e.expiry = 'Enter MM/YY';
    if (cvv.length !== 3) e.cvv = 'Enter 3-digit CVV';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit?.(cardData);
  }

  const gold = ring2;
  const goldDim = ring1;
  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 8,
    padding: '11px 14px',
    color: '#fafafa',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 200ms',
    boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(201,168,76,0.7)',
    display: 'block',
    marginBottom: 6,
  };
  const errorStyle: React.CSSProperties = {
    fontSize: 11,
    color: '#f87171',
    marginTop: 4,
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Card visual */}
      <div
        style={{
          perspective: 1000,
          width: '100%',
          maxWidth: 360,
          margin: '0 auto 28px',
          aspectRatio: '1.586',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.55s cubic-bezier(0.23,1,0.32,1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: 16,
            background: `linear-gradient(135deg, #0e0b01 0%, #1a1300 50%, #0a0800 100%)`,
            border: `1px solid rgba(201,168,76,0.25)`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.08), inset 0 1px 0 rgba(201,168,76,0.12)`,
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}>
            {/* Ring decoration */}
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', border: `1px solid ${ring1}22`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', border: `1px solid ${ring2}18`, pointerEvents: 'none' }} />

            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: goldDim }}>
                MDAB
              </div>
              {/* Chip */}
              <div style={{ width: 36, height: 28, borderRadius: 5, background: `linear-gradient(135deg, ${ring1}, ${ring2})`, opacity: 0.85 }} />
            </div>

            {/* Card number */}
            <div style={{ fontFamily: 'monospace', fontSize: 18, letterSpacing: '0.18em', color: '#fafafa', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              {displayNumber || '•••• •••• •••• ••••'}
            </div>

            {/* Bottom row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: 8, letterSpacing: '0.15em', color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase', marginBottom: 3 }}>Card Holder</div>
                <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: '#fafafa', textTransform: 'uppercase' }}>
                  {holder || 'YOUR NAME'}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 8, letterSpacing: '0.15em', color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase', marginBottom: 3 }}>Expires</div>
                <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: '#fafafa' }}>
                  {expiry || 'MM/YY'}
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 16,
            background: `linear-gradient(135deg, #0e0b01 0%, #1a1300 50%, #0a0800 100%)`,
            border: `1px solid rgba(201,168,76,0.25)`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.7)`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 16,
          }}>
            {/* Mag stripe */}
            <div style={{ width: '100%', height: 40, background: 'rgba(0,0,0,0.8)', margin: '0 0 8px' }} />
            {/* CVV strip */}
            <div style={{ padding: '0 28px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase' }}>CVV</div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: '8px 14px', fontFamily: 'monospace', fontSize: 16, letterSpacing: '0.3em', color: '#fafafa', textAlign: 'right' }}>
                {cvv || '•••'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Card number */}
        <div>
          <label style={labelStyle}>Card Number</label>
          <input
            style={{ ...inputStyle, ...(errors.number ? { borderColor: '#f87171' } : {}) }}
            placeholder="0000 0000 0000 0000"
            value={formatNumber(number)}
            onChange={e => setNumber(e.target.value.replace(/\D/g, ''))}
            onFocus={e => (e.target as HTMLElement).style.borderColor = ring2}
            onBlur={e => (e.target as HTMLElement).style.borderColor = errors.number ? '#f87171' : 'rgba(201,168,76,0.2)'}
            maxLength={19}
            inputMode="numeric"
          />
          {errors.number && <p style={errorStyle}>{errors.number}</p>}
        </div>

        {/* Holder */}
        <div>
          <label style={labelStyle}>Cardholder Name</label>
          <input
            style={{ ...inputStyle, ...(errors.holder ? { borderColor: '#f87171' } : {}) }}
            placeholder="Name on card"
            value={holder}
            onChange={e => setHolder(e.target.value)}
            onFocus={e => (e.target as HTMLElement).style.borderColor = ring2}
            onBlur={e => (e.target as HTMLElement).style.borderColor = errors.holder ? '#f87171' : 'rgba(201,168,76,0.2)'}
          />
          {errors.holder && <p style={errorStyle}>{errors.holder}</p>}
        </div>

        {/* Expiry + CVV */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={labelStyle}>Expiry</label>
            <input
              style={{ ...inputStyle, ...(errors.expiry ? { borderColor: '#f87171' } : {}) }}
              placeholder="MM/YY"
              value={expiry}
              onChange={e => setExpiry(formatExpiry(e.target.value))}
              onFocus={e => (e.target as HTMLElement).style.borderColor = ring2}
              onBlur={e => (e.target as HTMLElement).style.borderColor = errors.expiry ? '#f87171' : 'rgba(201,168,76,0.2)'}
              maxLength={5}
              inputMode="numeric"
            />
            {errors.expiry && <p style={errorStyle}>{errors.expiry}</p>}
          </div>
          <div>
            <label style={labelStyle}>CVV</label>
            <input
              style={{ ...inputStyle, ...(errors.cvv ? { borderColor: '#f87171' } : {}) }}
              placeholder="•••"
              value={cvv}
              onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
              onFocus={e => { (e.target as HTMLElement).style.borderColor = ring2; setFlipped(true); }}
              onBlur={e => { (e.target as HTMLElement).style.borderColor = errors.cvv ? '#f87171' : 'rgba(201,168,76,0.2)'; setFlipped(false); }}
              maxLength={3}
              inputMode="numeric"
            />
            {errors.cvv && <p style={errorStyle}>{errors.cvv}</p>}
          </div>
        </div>

        {showSubmit && (
          <button
            type="submit"
            style={{
              marginTop: 4,
              width: '100%',
              padding: '14px 24px',
              borderRadius: 10,
              border: 'none',
              background: `linear-gradient(135deg, ${ring2} 0%, ${ring1} 100%)`,
              color: '#0a0800',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
              transition: 'box-shadow 200ms, transform 200ms',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 32px rgba(201,168,76,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(201,168,76,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Complete Payment
          </button>
        )}
      </form>
    </div>
  );
}
