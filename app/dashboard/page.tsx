'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { useProgress } from '@/lib/useProgress';
import CourseView from '@/components/dashboard/CourseView';
import HomeView from '@/components/dashboard/HomeView';
import ActivityCalendar from '@/components/dashboard/ActivityCalendar';
import { LiveView, ModulesView, ResourcesView, NetworkView, AffiliateView, AccountView, LockedView, MaterialsView } from '@/components/dashboard/SectionViews';

interface Profile {
  full_name: string | null;
  plan: 'community' | 'blueprint' | null;
  payment_status: string | null;
}

const MODULES = [
  { id: '01', title: 'The Million Dollar Agent Mindset', lessons: 2, tag: 'Mindset' },
  { id: '02', title: 'Effective Prospecting & Follow-Up Systems', lessons: 8, tag: 'Prospecting' },
  { id: '03', title: 'Closing Meetings & Overcoming Objections', lessons: 4, tag: 'Closing' },
  { id: '04', title: 'Winning Listings', lessons: 4, tag: 'Listings' },
  { id: '05', title: 'Buyer Qualification & Negotiation Skills', lessons: 5, tag: 'Negotiation' },
  { id: '06', title: 'Off Plan Investment Strategies', lessons: 4, tag: 'Off-Plan' },
  { id: '07', title: 'Securing Repeat Business & Referrals', lessons: 4, tag: 'Referrals' },
  { id: '08', title: 'Working Smart & Reaching Your Full Potential', lessons: 7, tag: 'Scale' },
];

const TAG_COLOR: Record<string, string> = {
  Mindset: 'rgba(147,197,253,0.85)', Prospecting: 'rgba(134,239,172,0.85)',
  Closing: '#E2C472', Listings: 'rgba(216,180,254,0.85)',
  Negotiation: 'rgba(252,165,165,0.85)', 'Off-Plan': 'rgba(251,191,36,0.85)',
  Referrals: 'rgba(52,211,153,0.85)', Scale: '#E2C472',
};

function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

// ── SIDEBAR NAV ───────────────────────────────────────────────────────────────
const NAV = [
  { section: null, items: [
    { id: 'dashboard', label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
    { id: 'live', label: 'Live Training', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23,7 16,12 23,17 23,7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg> },
  ]},
  { section: 'LEARNING', items: [
    { id: 'course', label: 'Course', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> },
    { id: 'modules', label: 'Modules', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg> },
    { id: 'resources', label: 'Resources', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg> },
    { id: 'materials', label: 'Learning Materials', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="10,8 16,12 10,16 10,8"/></svg> },
  ]},
  { section: 'COMMUNITY', items: [
    { id: 'network', label: 'Network', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> },
    { id: 'affiliate', label: 'Affiliate', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
  ]},
  { section: 'PREFERENCE', items: [
    { id: 'account', label: 'Account', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ]},
];

function Sidebar({ active, onNav, onSignOut, expanded, setExpanded, profile }: {
  active: string; onNav: (id: string) => void; onSignOut: () => void;
  expanded: boolean; setExpanded: (v: boolean) => void;
  profile: Profile | null;
}) {
  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 200,
        width: expanded ? 224 : 68,
        transition: 'width 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'rgba(14,10,4,0.97)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(255,215,120,0.045)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: expanded ? '4px 0 40px rgba(0,0,0,0.7)' : 'none',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '20px 0 18px', display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 15, flexShrink: 0 }}>
        <Image src="/ta-logo.png" alt="Tyron Ash" width={38} height={38} style={{ objectFit: 'contain', width: 'auto', height: 36, flexShrink: 0 }} />
        <div style={{ opacity: expanded ? 1 : 0, transition: 'opacity 180ms', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: '#fafafa', margin: 0, letterSpacing: '0.04em' }}>Tyron Ash</p>
          <p style={{ fontSize: 9, color: 'rgba(201,168,76,0.7)', margin: 0, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Members Portal</p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,215,120,0.055)', marginBottom: 10, flexShrink: 0 }} />

      {/* Nav sections */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 12 }}>
        {NAV.map((group, gi) => (
          <div key={gi} style={{ marginBottom: 4 }}>
            {/* Section label */}
            {group.section && (
              <div style={{ opacity: expanded ? 1 : 0, transition: 'opacity 180ms', padding: '12px 16px 6px', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,220,140,0.2)', textTransform: 'uppercase' }}>{group.section}</span>
              </div>
            )}
            {group.section && !expanded && <div style={{ height: 8 }} />}
            {/* Items */}
            {group.items.map(item => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNav(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    width: '100%', padding: '9px 0', paddingLeft: 15,
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: isActive ? 'linear-gradient(90deg, rgba(201,168,76,0.17), rgba(201,168,76,0.02))' : 'transparent',
                    borderLeft: isActive ? '2px solid #C9A84C' : '2px solid transparent',
                    color: isActive ? '#E2C472' : 'rgba(255,240,200,0.38)',
                    transition: 'all 150ms',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,240,200,0.75)'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(255,240,200,0.38)'; }}
                >
                  <span style={{ flexShrink: 0, width: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, whiteSpace: 'nowrap', opacity: expanded ? 1 : 0, transition: 'opacity 180ms' }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Help card — visible when expanded */}
      <div style={{ flexShrink: 0, margin: '0 10px 16px', overflow: 'hidden', borderRadius: 14, opacity: expanded ? 1 : 0, transform: expanded ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 200ms, transform 200ms', pointerEvents: expanded ? 'auto' : 'none' }}>
        <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)', borderRadius: 14, padding: '14px 16px', textAlign: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#fafafa', margin: '0 0 4px' }}>Need help?</p>
          <p style={{ fontSize: 11, color: 'rgba(255,240,200,0.3)', margin: '0 0 12px', lineHeight: 1.4 }}>Questions about the course or your account</p>
          <a href="mailto:support@tyronash.com" style={{ display: 'block', padding: '9px', borderRadius: 10, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', color: '#E2C472', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textDecoration: 'none', textTransform: 'uppercase' }}>
            Contact us
          </a>
        </div>
      </div>

      {/* Sign out */}
      <button
        onClick={onSignOut}
        style={{
          display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
          padding: '12px 0 16px', paddingLeft: 15,
          border: 'none', cursor: 'pointer', background: 'transparent',
          color: 'rgba(255,230,170,0.22)', transition: 'color 150ms', width: '100%',
          borderTop: '1px solid rgba(255,215,120,0.055)',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,240,200,0.55)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,230,170,0.22)')}
      >
        <span style={{ flexShrink: 0, width: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </span>
        <span style={{ fontSize: 12, whiteSpace: 'nowrap', opacity: expanded ? 1 : 0, transition: 'opacity 180ms' }}>Sign out</span>
      </button>
    </aside>
  );
}

// ── TOP BAR ───────────────────────────────────────────────────────────────────
function TopBar({ firstName, profile, activeNav, view }: { firstName: string; profile: Profile | null; activeNav: string; view: 'pending' | 'community' | 'blueprint' }) {
  const pageTitle: Record<string, string> = {
    dashboard: 'Dashboard', live: 'Live Training', course: 'Course',
    modules: 'Modules', resources: 'Resources', materials: 'Learning Materials', network: 'Network',
    affiliate: 'Affiliate', account: 'Account',
  };
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <div style={{
      height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', flexShrink: 0,
      borderBottom: '1px solid rgba(255,215,120,0.05)',
      background: 'rgba(16,12,5,0.55)',
      backdropFilter: 'blur(12px)',
    }}>
      {/* Left: page title */}
      <div>
        <h1 style={{ fontSize: 17, fontWeight: 800, color: '#fafafa', margin: 0, letterSpacing: '-0.01em' }}>{pageTitle[activeNav] ?? 'Dashboard'}</h1>
      </div>

      {/* Center: search pill */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.05)',
        borderRadius: 999, padding: '9px 16px', width: 280,
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,220,150,0.28)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="text"
          placeholder="Search modules, sessions..."
          style={{
            background: 'transparent', border: 'none', outline: 'none',
            fontSize: 13, color: '#fafafa', width: '100%',
          }}
          onFocus={e => (e.currentTarget.parentElement!.style.borderColor = 'rgba(201,168,76,0.25)')}
          onBlur={e => (e.currentTarget.parentElement!.style.borderColor = 'rgba(255,215,120,0.05)')}
        />
        <style>{`input::placeholder { color: rgba(255,220,150,0.28); }`}</style>
      </div>

      {/* Right: bell + avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Bell */}
        <button style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(255,215,120,0.045)', background: 'rgba(255,248,230,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,230,170,0.38)', transition: 'color 150ms' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#E2C472')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,230,170,0.38)')}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
        </button>

        {/* User pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '6px 12px 6px 6px', borderRadius: 12,
          background: 'rgba(255,248,230,0.04)',
          border: '1px solid rgba(255,215,120,0.05)',
        }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #C9A84C, #E2C472)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#0a0800' }}>
            {firstName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#fafafa', margin: 0, lineHeight: 1.2 }}>{firstName}</p>
            <p style={{ fontSize: 9, fontWeight: 700, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: view === 'blueprint' ? 'rgba(201,168,76,0.85)' : view === 'community' ? 'rgba(255,230,170,0.48)' : 'rgba(255,230,170,0.25)',
            }}>
              {view === 'blueprint' ? '✦ Blueprint' : view === 'community' ? 'Community' : 'Member'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PENDING VIEW ──────────────────────────────────────────────────────────────
function PendingView({ firstName }: { firstName: string }) {
  return (
    <div style={{ padding: '28px 28px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Welcome hero */}
      <div style={{ padding: '36px 36px', borderRadius: 20, background: 'rgba(255,248,230,0.03)', border: '1px solid rgba(201,168,76,0.15)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,150,45,0.18), transparent 70%)', pointerEvents: 'none' }} />
        <p style={{ fontSize: 14, color: 'rgba(255,230,170,0.4)', margin: '0 0 8px' }}>{getGreeting()},</p>
        <h2 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 900, color: '#fafafa', margin: '0 0 14px', letterSpacing: '-0.03em', lineHeight: 1 }}>{firstName}.</h2>
        <p style={{ fontSize: 15, color: 'rgba(255,230,170,0.35)', margin: 0, maxWidth: 520, lineHeight: 1.6 }}>Welcome to the Million Dollar Agent Blueprint. Your account is created and we're confirming your payment now.</p>
      </div>

      {/* Pending notice */}
      <div style={{ padding: '24px 28px', borderRadius: 20, background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>⏳</div>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: '#E2C472', margin: '0 0 8px' }}>Payment confirming</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,230,170,0.45)', margin: '0 0 10px', lineHeight: 1.6 }}>This usually takes just a few minutes. We'll email you the moment your access is active. If your payment went through but you're still seeing this after 10 minutes, reach out.</p>
          <a href="mailto:support@tyronash.com" style={{ fontSize: 13, color: 'rgba(201,168,76,0.8)', textDecoration: 'underline' }}>Contact support →</a>
        </div>
      </div>

      {/* Locked module preview */}
      <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,220,140,0.22)', fontWeight: 700, margin: '8px 0 12px' }}>What unlocks when payment confirms</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
        {MODULES.map(mod => (
          <div key={mod.id} style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(255,248,230,0.018)', border: '1px solid rgba(255,215,120,0.05)', display: 'flex', gap: 12, alignItems: 'center', opacity: 0.45 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,248,230,0.04)', border: '1px solid rgba(255,215,120,0.045)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>🔒</div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,230,170,0.4)', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mod.title}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,220,140,0.22)', margin: 0 }}>{mod.lessons} lessons</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DONUT CHART ───────────────────────────────────────────────────────────────
function Donut({ pct, size = 110, stroke = 9 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <defs><linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#E2C472"/></linearGradient></defs>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,215,120,0.055)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#dg)" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ - (pct/100)*circ}
        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)' }}/>
    </svg>
  );
}

// ── BLUEPRINT VIEW ────────────────────────────────────────────────────────────
function BlueprintView({ firstName, user, pct, completedCount, activityByDay, onStartCourse }: { firstName: string; user: User; pct: number; completedCount: number; activityByDay: Map<string, number>; onStartCourse: () => void }) {
  void firstName; void user;
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return { label: d.toLocaleDateString('en', { weekday: 'short' }), count: activityByDay.get(key) ?? 0 };
  });
  const weekTotal = last7.reduce((s, d) => s + d.count, 0);
  const weekMax = Math.max(1, ...last7.map(d => d.count));
  return (
    <div style={{ padding: '28px 28px 48px', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── ROW 1: Balance-style top cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', gap: 14 }}>

        {/* Card left — modules unlocked */}
        <div style={{ padding: '22px 22px', borderRadius: 20, background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.065)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,150,45,0.14), transparent 70%)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,230,170,0.32)', fontWeight: 600, margin: '0 0 6px' }}>All Modules</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#fafafa', margin: '0 0 14px' }}>Blueprint Access</p>
          <p style={{ fontSize: 32, fontWeight: 900, color: '#fafafa', margin: '0 0 2px', letterSpacing: '-0.04em', lineHeight: 1 }}>8</p>
          <p style={{ fontSize: 12, color: 'rgba(201,168,76,0.7)', margin: '0 0 14px', fontWeight: 600 }}>38 lessons · All unlocked</p>
          {/* Mini sparkline */}
          <svg width="100%" height="36" viewBox="0 0 140 36" preserveAspectRatio="none" style={{ display: 'block' }}>
            <defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(201,168,76,0.2)"/><stop offset="100%" stopColor="#E2C472"/></linearGradient></defs>
            <polyline points="0,28 20,22 40,26 60,14 80,18 100,8 120,12 140,4" fill="none" stroke="url(#sg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="140" cy="4" r="3" fill="#E2C472"/>
          </svg>
        </div>

        {/* Card center — big progress gauge */}
        <div style={{ padding: '22px 28px', borderRadius: 20, background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.065)', display: 'flex', alignItems: 'center', gap: 28 }}>
          <div>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,230,170,0.32)', fontWeight: 600, margin: '0 0 4px' }}>Your Progress</p>
            <p style={{ fontSize: 34, fontWeight: 900, color: '#fafafa', margin: '0 0 4px', letterSpacing: '-0.04em', lineHeight: 1 }}>{pct}%</p>
            <p style={{ fontSize: 12, color: 'rgba(201,168,76,0.7)', margin: '0 0 18px', fontWeight: 600 }}>{completedCount > 0 ? `${completedCount} of 38 lessons completed` : 'Start Module 01 to begin'}</p>
            <div style={{ display: 'flex', gap: 20 }}>
              {[{ v: String(completedCount), l: 'Completed' }, { v: '38', l: 'Total lessons' }].map(s => (
                <div key={s.l}>
                  <p style={{ fontSize: 18, fontWeight: 900, color: '#fafafa', margin: '0 0 2px', letterSpacing: '-0.02em' }}>{s.v}</p>
                  <p style={{ fontSize: 9, color: 'rgba(255,220,140,0.26)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flexShrink: 0, position: 'relative' }}>
            <Donut pct={pct} size={130} stroke={10} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: pct > 0 ? 18 : 11, fontWeight: pct > 0 ? 900 : 400, color: pct > 0 ? '#E2C472' : 'rgba(255,220,140,0.22)', letterSpacing: pct > 0 ? '-0.02em' : '0.1em' }}>{pct > 0 ? `${pct}%` : 'START'}</span>
            </div>
          </div>
        </div>

        {/* Card right — next module */}
        <div style={{ padding: '22px 22px', borderRadius: 20, background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.065)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.1), transparent 70%)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,230,170,0.32)', fontWeight: 600, margin: '0 0 6px' }}>Start Here</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#fafafa', margin: '0 0 14px' }}>Module 01</p>
          <p style={{ fontSize: 14, fontWeight: 800, color: '#fafafa', margin: '0 0 6px', lineHeight: 1.3 }}>The Million Dollar Agent Mindset</p>
          <p style={{ fontSize: 11, color: 'rgba(255,230,170,0.3)', margin: '0 0 16px' }}>2 lessons · ~30 min</p>
          <button onClick={onStartCourse} style={{ width: '100%', padding: '11px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #E2C472, #C9A84C)', color: '#0a0800', fontSize: 11, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 4px 16px rgba(201,168,76,0.35)' }}>
            Start →
          </button>
          {/* Mini line */}
          <svg width="100%" height="30" viewBox="0 0 140 30" preserveAspectRatio="none" style={{ display: 'block', marginTop: 12 }}>
            <polyline points="0,24 30,20 60,24 90,12 120,18 140,8" fill="none" stroke="rgba(252,165,165,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 3"/>
          </svg>
        </div>
      </div>

      {/* ── ROW 2: Activity chart + Module list ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>

        {/* Activity chart */}
        <div style={{ padding: '22px 24px', borderRadius: 20, background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.065)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,230,170,0.32)', fontWeight: 600, margin: '0 0 2px' }}>Learning Activity</p>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#fafafa', margin: 0 }}>{weekTotal > 0 ? `${weekTotal} lesson${weekTotal === 1 ? '' : 's'} this week` : 'No activity yet'}</p>
            </div>
            <span style={{ fontSize: 11, color: 'rgba(255,220,140,0.22)', padding: '4px 10px', borderRadius: 8, border: '1px solid rgba(255,215,120,0.045)' }}>This week</span>
          </div>

          {/* Empty chart with ghost bars */}
          <div style={{ position: 'relative', height: 100, marginBottom: 8 }}>
            {/* Ghost grid lines */}
            {[0, 25, 50, 75, 100].map(pct => (
              <div key={pct} style={{ position: 'absolute', left: 0, right: 0, bottom: `${pct}%`, height: 1, background: 'rgba(255,215,120,0.05)' }} />
            ))}
            {/* Bars — real lesson activity, last 7 days */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', gap: 8, padding: '0 4px' }}>
              {last7.map((d, i) => (
                <div key={i} title={d.count ? `${d.count} lesson${d.count === 1 ? '' : 's'}` : undefined} style={{ flex: 1, height: d.count ? `${Math.round((d.count / weekMax) * 100)}%` : 4, borderRadius: '3px 3px 0 0', background: d.count ? 'linear-gradient(180deg, #E2C472, rgba(201,168,76,0.25))' : 'rgba(255,215,120,0.05)', boxShadow: d.count ? '0 0 14px rgba(201,168,76,0.25)' : 'none', transition: 'height 500ms ease' }} />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {last7.map((d, i) => (
              <span key={i} style={{ fontSize: 9, color: 'rgba(255,220,140,0.22)' }}>{d.label}</span>
            ))}
          </div>

          {weekTotal === 0 && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,215,120,0.05)', textAlign: 'center' }}>
              <p style={{ fontSize: 12, color: 'rgba(255,230,170,0.26)', margin: 0 }}>Start Module 01 to track your learning here.</p>
            </div>
          )}
        </div>

        {/* Module list */}
        <div style={{ padding: '22px 22px', borderRadius: 20, background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.065)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,230,170,0.32)', fontWeight: 600, margin: 0 }}>Modules</p>
            <span style={{ fontSize: 10, color: 'rgba(255,220,140,0.22)' }}>8 total</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {MODULES.map((mod, i) => (
              <div key={mod.id} className="mod-row" style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10,
                background: 'rgba(255,248,230,0.022)', border: '1px solid rgba(255,215,120,0.045)',
                cursor: 'pointer', transition: 'all 150ms',
              }}
              onClick={onStartCourse}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.22)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,248,230,0.022)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,215,120,0.045)'; }}
              >
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#E2C472', fontWeight: 800, flexShrink: 0 }}>▶</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,240,200,0.7)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mod.title}</p>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#fafafa', margin: '0 0 1px' }}>{mod.lessons}</p>
                  <p style={{ fontSize: 8, color: 'rgba(255,220,140,0.22)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>L</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW 3: Live call + Affiliate ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>

        {/* Live Training */}
        <div style={{ padding: '22px 24px', borderRadius: 20, background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.065)', display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 600, margin: '0 0 6px' }}>Next Live Training</p>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#fafafa', margin: '0 0 8px', lineHeight: 1.3 }}>Weekly Coaching Call with Tyron</h3>
            <p style={{ fontSize: 12, color: 'rgba(255,230,170,0.36)', margin: '0 0 16px', lineHeight: 1.5 }}>Every Monday at 10:30 AM Dubai. Real deals, real objections, Q&A always included.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="#" style={{ padding: '10px 20px', borderRadius: 10, background: 'linear-gradient(135deg, #E2C472, #C9A84C)', color: '#0a0800', fontSize: 11, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 4px 16px rgba(201,168,76,0.35)' }}>Join Next Call →</a>
              <a href="#" style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid rgba(255,215,120,0.13)', color: 'rgba(255,230,170,0.5)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>View Archive</a>
            </div>
          </div>
          <div style={{ flexShrink: 0, textAlign: 'center', padding: '16px 20px', borderRadius: 16, background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.18)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E2C472', boxShadow: '0 0 10px rgba(226,196,114,0.8)', margin: '0 auto 8px' }} />
            <p style={{ fontSize: 10, color: 'rgba(255,230,170,0.32)', margin: '0 0 4px', whiteSpace: 'nowrap' }}>Monday</p>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#E2C472', margin: 0, whiteSpace: 'nowrap' }}>10:30 AM</p>
            <p style={{ fontSize: 9, color: 'rgba(255,220,140,0.22)', margin: '4px 0 0', whiteSpace: 'nowrap' }}>GST · Dubai</p>
          </div>
        </div>

        {/* Activity calendar — combo month grid + heatmap */}
        <ActivityCalendar activityByDay={activityByDay} />
      </div>

    </div>
  );
}

// ── COMMUNITY VIEW ────────────────────────────────────────────────────────────
function CommunityView({ firstName, user, activityByDay, onOpenMaterials }: { firstName: string; user: User; activityByDay: Map<string, number>; onOpenMaterials: () => void }) {
  return (
    <div style={{ padding: '28px 28px 48px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Top row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 14 }}>
        <div style={{ padding: '28px', borderRadius: 20, background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.065)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,150,45,0.12), transparent 70%)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 13, color: 'rgba(255,230,170,0.4)', margin: '0 0 4px' }}>{getGreeting()},</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, color: '#fafafa', margin: '0 0 12px', letterSpacing: '-0.03em' }}>{firstName}.</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,230,170,0.36)', margin: '0 0 20px', lineHeight: 1.6 }}>You're on the Community Plan — access the live calls, the network, the Monday coaching, and foundational learning materials every week.</p>
          <div style={{ display: 'flex', gap: 28, paddingTop: 16, borderTop: '1px solid rgba(255,215,120,0.055)' }}>
            {[{ v: '512+', l: 'Members' }, { v: 'Every Mon', l: 'Live calls' }].map(s => (
              <div key={s.l}><p style={{ fontSize: 18, fontWeight: 900, color: '#fafafa', margin: '0 0 2px', letterSpacing: '-0.02em' }}>{s.v}</p><p style={{ fontSize: 9, color: 'rgba(255,220,140,0.26)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.l}</p></div>
            ))}
          </div>
        </div>
        <div style={{ padding: '22px', borderRadius: 20, background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.065)' }}>
          <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 600, margin: '0 0 12px' }}>Next Live Call</p>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#fafafa', margin: '0 0 6px', lineHeight: 1.3 }}>Weekly Coaching with Tyron</h3>
          <p style={{ fontSize: 12, color: 'rgba(255,230,170,0.36)', margin: '0 0 16px', lineHeight: 1.5 }}>Every Monday, 10:30 AM Dubai. Real Q&A, real deals.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,248,230,0.03)', border: '1px solid rgba(255,215,120,0.045)', marginBottom: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E2C472', boxShadow: '0 0 8px rgba(226,196,114,0.8)', flexShrink: 0 }} />
            <p style={{ fontSize: 11, color: 'rgba(255,230,170,0.5)', margin: 0 }}>Monday · 10:30 AM GST</p>
          </div>
          <a href="#" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 10, background: 'linear-gradient(135deg, #E2C472, #C9A84C)', color: '#0a0800', fontSize: 11, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 4px 16px rgba(201,168,76,0.35)' }}>Join Next Call →</a>
        </div>
      </div>

      {/* Locked modules + Community CTA */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        <div style={{ padding: '22px', borderRadius: 20, background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.065)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,230,170,0.32)', fontWeight: 600, margin: 0 }}>Course Modules</p>
            <span style={{ fontSize: 9, padding: '3px 8px', borderRadius: 6, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(201,168,76,0.7)', fontWeight: 700 }}>Blueprint only</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {MODULES.map(mod => (
              <div key={mod.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, background: 'rgba(255,248,230,0.018)', border: '1px solid rgba(255,215,120,0.045)', opacity: 0.4 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,248,230,0.04)', border: '1px solid rgba(255,215,120,0.045)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, flexShrink: 0 }}>🔒</div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,230,170,0.36)', margin: 0, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mod.title}</p>
                <span style={{ fontSize: 10, color: 'rgba(255,220,140,0.22)', flexShrink: 0 }}>{mod.lessons}L</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: '22px', borderRadius: 20, background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.065)', flex: 1 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,230,170,0.32)', fontWeight: 600, margin: '0 0 12px' }}>The MDAB Network</p>
            <p style={{ fontSize: 12, color: 'rgba(255,230,170,0.36)', margin: '0 0 16px', lineHeight: 1.6 }}>512 agents across Dubai, London, and beyond. Post wins, ask questions, get accountability.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href="#" style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: 10, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: '#E2C472', fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Join WhatsApp Group →</a>
              <a href="#" style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: 10, background: 'rgba(255,248,230,0.03)', border: '1px solid rgba(255,215,120,0.045)', color: 'rgba(255,230,170,0.36)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>View Instagram →</a>
            </div>
          </div>

          <div style={{ padding: '20px 22px', borderRadius: 20, background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.065)' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,230,170,0.32)', fontWeight: 600, margin: '0 0 12px' }}>Affiliate</p>
            <p style={{ fontSize: 28, fontWeight: 900, color: '#fafafa', margin: '0 0 4px', letterSpacing: '-0.03em' }}>$0</p>
            <p style={{ fontSize: 11, color: 'rgba(255,220,140,0.26)', margin: '0 0 12px' }}>Earn 20% per Blueprint referral</p>
            <a href="#" style={{ display: 'block', textAlign: 'center', padding: '9px', borderRadius: 10, border: '1px solid rgba(134,239,172,0.2)', color: 'rgba(134,239,172,0.7)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Get My Link →</a>
          </div>
        </div>
      </div>

      {/* Activity calendar + Learning materials shortcut */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 14 }}>
        <ActivityCalendar activityByDay={activityByDay} />
        <div style={{ padding: '24px 26px', borderRadius: 20, background: 'rgba(255,248,230,0.028)', border: '1px solid rgba(255,215,120,0.065)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 600, margin: '0 0 8px' }}>Learning Materials</p>
          <h3 style={{ fontSize: 19, fontWeight: 900, color: '#fafafa', margin: '0 0 8px', letterSpacing: '-0.02em' }}>The webinar library is yours.</h3>
          <p style={{ fontSize: 13, color: 'rgba(255,230,170,0.36)', margin: '0 0 18px', lineHeight: 1.6 }}>Every past live training, recorded and on demand. New sessions added after every Monday call.</p>
          <button onClick={onOpenMaterials} style={{ alignSelf: 'flex-start', padding: '12px 22px', borderRadius: 11, border: 'none', background: 'linear-gradient(135deg, #E2C472, #C9A84C)', color: '#0a0800', fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 6px 22px rgba(201,168,76,0.4)' }}>
            Browse Webinars →
          </button>
        </div>
      </div>

      {/* Upgrade CTA */}
      <div style={{ padding: '28px 32px', borderRadius: 20, background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.03))', border: '1px solid rgba(201,168,76,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 700, margin: '0 0 8px' }}>Ready to go all in?</p>
          <h3 style={{ fontSize: 'clamp(16px,3vw,24px)', fontWeight: 900, color: '#fafafa', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Unlock the full Blueprint course.</h3>
          <p style={{ fontSize: 13, color: 'rgba(255,230,170,0.36)', margin: 0 }}>8 modules, 38 lessons, live access, lifetime updates. One payment.</p>
        </div>
        <a href="/demo" style={{ flexShrink: 0, padding: '14px 28px', borderRadius: 12, background: 'linear-gradient(135deg, #E2C472, #C9A84C)', color: '#0a0800', fontSize: 12, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 4px 24px rgba(201,168,76,0.4)', whiteSpace: 'nowrap' }}>
          Upgrade — $1,800 →
        </a>
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const progress = useProgress(user?.id);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/demo'; return; }
      setUser(user);
      const { data } = await supabase.from('profiles').select('full_name, plan, payment_status').eq('id', user.id).single();
      setProfile(data ?? { full_name: null, plan: null, payment_status: null });
      setLoading(false);
    }
    init();
  }, []);

  async function handleSignOut() { await supabase.auth.signOut(); window.location.href = '/demo'; }

  if (loading) return (
    <div style={{ background: '#0c0804', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(201,168,76,0.15)', borderTopColor: '#C9A84C', animation: 'spin 0.8s linear infinite', margin: '0 auto 14px' }} />
        <p style={{ color: 'rgba(255,220,140,0.2)', fontSize: 11, letterSpacing: '0.2em' }}>LOADING</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const firstName = profile?.full_name?.split(' ')[0] ?? user?.email?.split('@')[0] ?? 'Member';
  const isPaid = profile?.payment_status === 'paid';
  const isBlueprint = profile?.plan === 'blueprint';
  const view: 'pending' | 'community' | 'blueprint' = !isPaid ? 'pending' : isBlueprint ? 'blueprint' : 'community';

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'system-ui,-apple-system,sans-serif', position: 'relative' }}>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.22); border-radius: 4px; }
      `}</style>

      {/* ── BACKGROUND ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#0c0804', pointerEvents: 'none' }}>
        {/* Warm amber gradient blobs — dialled back */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '52%', height: '60%', background: 'radial-gradient(ellipse, rgba(215,150,45,0.14) 0%, rgba(201,168,76,0.04) 50%, transparent 72%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '5%', width: '40%', height: '50%', background: 'radial-gradient(ellipse, rgba(210,145,40,0.09) 0%, transparent 65%)', borderRadius: '50%' }} />
        {/* Futuristic touches: hairline gold beam + diagonal sheen */}
        <div style={{ position: 'absolute', top: 0, left: '18%', width: '64%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(226,196,114,0.4), transparent)' }} />
        <div style={{ position: 'absolute', top: '14%', left: '-12%', width: '58%', height: '44%', background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 65%)', transform: 'rotate(-14deg)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 120%, transparent 55%, rgba(0,0,0,0.5))' }} />
        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.022) 1px, transparent 1px)', backgroundSize: '64px 64px', opacity: 0.55 }} />
      </div>

      {/* ── SIDEBAR ── */}
      <Sidebar
        active={activeNav}
        onNav={setActiveNav}
        onSignOut={handleSignOut}
        expanded={sidebarOpen}
        setExpanded={setSidebarOpen}
        profile={profile}
      />

      {/* ── MAIN SHELL ── */}
      <div style={{ marginLeft: 68, minHeight: '100vh', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar firstName={firstName} profile={profile} activeNav={activeNav} view={view} />

        {/* Scrollable content */}
        <div key={activeNav} style={{ flex: 1, overflowY: 'auto', animation: 'fadeIn 0.4s ease both' }}>
          {progress.tableMissing && view === 'blueprint' && (
            <div style={{ margin: '16px 28px 0', padding: '12px 16px', borderRadius: 12, background: 'rgba(252,165,165,0.07)', border: '1px solid rgba(252,165,165,0.25)', color: 'rgba(252,165,165,0.8)', fontSize: 12 }}>
              Progress isn&apos;t saving yet — run <code>supabase/lesson_progress.sql</code> in your Supabase SQL Editor (one time setup).
            </div>
          )}
          {view === 'pending' ? (
            activeNav === 'account'
              ? <AccountView fullName={profile?.full_name ?? firstName} email={user?.email ?? ''} planLabel="Pending" onSignOut={handleSignOut} />
              : <PendingView firstName={firstName} />
          ) : activeNav === 'live' ? (
            <LiveView />
          ) : activeNav === 'course' ? (
            view === 'blueprint'
              ? <CourseView completed={progress.completed} markComplete={progress.markComplete} markIncomplete={progress.markIncomplete} pct={progress.pct} />
              : <LockedView sectionName="The course" />
          ) : activeNav === 'modules' ? (
            view === 'blueprint'
              ? <ModulesView completed={progress.completed} onOpenCourse={() => setActiveNav('course')} />
              : <LockedView sectionName="Modules" />
          ) : activeNav === 'resources' ? (
            view === 'blueprint' ? <ResourcesView /> : <LockedView sectionName="Resources" />
          ) : activeNav === 'materials' ? (
            <MaterialsView />
          ) : activeNav === 'network' ? (
            <NetworkView />
          ) : activeNav === 'affiliate' ? (
            <AffiliateView userEmail={user?.email ?? 'member'} />
          ) : activeNav === 'account' ? (
            <AccountView fullName={profile?.full_name ?? firstName} email={user?.email ?? ''} planLabel={view === 'blueprint' ? 'Blueprint' : 'Community'} onSignOut={handleSignOut} />
          ) : (
            <HomeView tier={view} firstName={firstName} pct={progress.pct} completed={progress.completed} activityByDay={progress.activityByDay} onStartCourse={() => setActiveNav('course')} onOpenMaterials={() => setActiveNav('materials')} />
          )}
        </div>
      </div>
    </div>
  );
}
