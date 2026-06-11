'use client';
import { useState } from 'react';
import { COURSE, TOTAL_LESSONS } from '@/lib/courseData';
import { T, card, label, goldBtn, ghostBtn } from './ui';

const wrap = { padding: '28px 28px 48px', display: 'flex', flexDirection: 'column' as const, gap: 16 };

// ── LIVE TRAINING ─────────────────────────────────────────────────────────────
export function LiveView() {
  const sessions = [
    { day: 'Monday', time: '10:30 AM GST', title: 'Weekly Coaching Call with Tyron', desc: 'Real deals, real objections, open Q&A.', live: true },
    { day: 'Wednesday', time: '6:00 PM GST', title: 'Deal Review Workshop', desc: 'Bring a live deal, leave with a plan.', live: false },
    { day: 'First Friday', time: '4:00 PM GST', title: 'Monthly Market Briefing', desc: 'Dubai market data and where the opportunities are.', live: false },
  ];
  return (
    <div style={wrap}>
      <div style={{ ...card, display: 'flex', gap: 24, alignItems: 'center', background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.02))', border: '1px solid rgba(201,168,76,0.22)' }}>
        <div style={{ flex: 1 }}>
          <p style={{ ...label, color: 'rgba(201,168,76,0.7)' }}>Next Live Session</p>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: T.text, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Weekly Coaching Call with Tyron</h2>
          <p style={{ fontSize: 13, color: T.dim, margin: '0 0 18px', lineHeight: 1.6 }}>Every Monday at 10:30 AM Dubai time. Join on Zoom, cameras optional, questions encouraged.</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href="#" style={goldBtn}>Join Next Call →</a>
            <a href="#" style={ghostBtn}>Add to Calendar</a>
          </div>
        </div>
        <div style={{ flexShrink: 0, textAlign: 'center', padding: '20px 26px', borderRadius: 16, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: T.goldLight, boxShadow: '0 0 12px rgba(226,196,114,0.8)', margin: '0 auto 8px' }} />
          <p style={{ fontSize: 11, color: T.dim, margin: '0 0 4px' }}>Monday</p>
          <p style={{ fontSize: 18, fontWeight: 900, color: T.goldLight, margin: 0 }}>10:30 AM</p>
          <p style={{ fontSize: 9, color: T.faint, margin: '4px 0 0' }}>GST · Dubai</p>
        </div>
      </div>

      <p style={{ ...label, margin: '8px 0 0' }}>Weekly schedule</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {sessions.map(s => (
          <div key={s.title} style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: T.goldLight }}>{s.day}</span>
              <span style={{ fontSize: 11, color: T.faint }}>{s.time}</span>
            </div>
            <p style={{ fontSize: 14, fontWeight: 800, color: T.text, margin: '0 0 6px' }}>{s.title}</p>
            <p style={{ fontSize: 12, color: T.dim, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <div style={card}>
        <p style={label}>Replay archive</p>
        <p style={{ fontSize: 13, color: T.dim, margin: 0, lineHeight: 1.6 }}>Replays are uploaded within 24 hours of each call. The archive appears here once the first call is recorded.</p>
      </div>
    </div>
  );
}

// ── MODULES OVERVIEW ──────────────────────────────────────────────────────────
export function ModulesView({ completed, onOpenCourse }: { completed: Map<string, string>; onOpenCourse: () => void }) {
  return (
    <div style={wrap}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {COURSE.map(mod => {
          const done = mod.lessons.filter(l => completed.has(l.id)).length;
          const pct = Math.round((done / mod.lessons.length) * 100);
          return (
            <div key={mod.id} style={{ ...card, cursor: 'pointer', transition: 'border-color 150ms' }}
              onClick={onOpenCourse}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,215,120,0.065)')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: 'rgba(201,168,76,0.35)', letterSpacing: '-0.03em' }}>{mod.id}</span>
                <span style={{ fontSize: 9, padding: '3px 9px', borderRadius: 6, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: T.goldLight, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{mod.tag}</span>
              </div>
              <p style={{ fontSize: 15, fontWeight: 800, color: T.text, margin: '0 0 6px', lineHeight: 1.3 }}>{mod.title}</p>
              <p style={{ fontSize: 12, color: T.dim, margin: '0 0 14px', lineHeight: 1.5 }}>{mod.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.faint, marginBottom: 8 }}>
                <span>{mod.lessons.length} lessons</span><span>{pct}%</span>
              </div>
              <div style={{ height: 5, borderRadius: 4, background: 'rgba(255,215,120,0.07)', overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: T.goldGrad }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── RESOURCES ─────────────────────────────────────────────────────────────────
export function ResourcesView() {
  const groups = [
    { name: 'Scripts', items: ['Cold calling script pack', 'Objection handling cheat sheet', 'WhatsApp follow-up templates'] },
    { name: 'Templates', items: ['Listing presentation deck', 'Buyer qualification form', 'Open house sign-in sheet'] },
    { name: 'Checklists', items: ['New listing launch checklist', 'Transaction-to-close checklist', '90-day new agent plan'] },
  ];
  return (
    <div style={wrap}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {groups.map(g => (
          <div key={g.name} style={card}>
            <p style={label}>{g.name}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              {g.items.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', borderRadius: 10, background: 'rgba(255,248,230,0.022)', border: '1px solid rgba(255,215,120,0.045)' }}>
                  <span style={{ fontSize: 13 }}>📄</span>
                  <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: 'rgba(255,240,200,0.6)' }}>{item}</span>
                  <span style={{ fontSize: 9, color: T.faint, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Soon</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={card}>
        <p style={{ fontSize: 12, color: T.dim, margin: 0 }}>Downloads are being prepared. They unlock here as each module goes live.</p>
      </div>
    </div>
  );
}

// ── NETWORK ───────────────────────────────────────────────────────────────────
export function NetworkView() {
  return (
    <div style={wrap}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 14 }}>
        <div style={card}>
          <p style={label}>The MDAB Network</p>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: T.text, margin: '0 0 10px', letterSpacing: '-0.02em' }}>512+ agents. One standard.</h2>
          <p style={{ fontSize: 13, color: T.dim, margin: '0 0 20px', lineHeight: 1.6 }}>Dubai, London and beyond. Post wins, ask questions, find accountability partners and get answers from agents doing the volume you want.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="#" style={goldBtn}>Join WhatsApp Group →</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={ghostBtn}>Instagram</a>
          </div>
        </div>
        <div style={card}>
          <p style={label}>Community guidelines</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
            {['Share wins, big or small', 'Ask specific questions, get specific answers', 'No spam, no self-promo without value', 'What is shared in the group stays in the group'].map(rule => (
              <div key={rule} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: T.goldLight, fontSize: 11, marginTop: 2 }}>✦</span>
                <p style={{ fontSize: 12.5, color: 'rgba(255,240,200,0.55)', margin: 0, lineHeight: 1.5 }}>{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AFFILIATE ─────────────────────────────────────────────────────────────────
export function AffiliateView({ userEmail }: { userEmail: string }) {
  const [copied, setCopied] = useState(false);
  const link = `https://mdab.com/?ref=${encodeURIComponent(userEmail.split('@')[0])}`;
  const copy = () => { navigator.clipboard?.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return (
    <div style={wrap}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        {[{ v: '$0', l: 'Earned' }, { v: '0', l: 'Referrals' }, { v: '20%', l: 'Commission' }, { v: '$360', l: 'Per Blueprint sale' }].map(s => (
          <div key={s.l} style={card}>
            <p style={{ fontSize: 30, fontWeight: 900, color: T.text, margin: '0 0 4px', letterSpacing: '-0.03em' }}>{s.v}</p>
            <p style={{ ...label, margin: 0 }}>{s.l}</p>
          </div>
        ))}
      </div>
      <div style={card}>
        <p style={label}>Your referral link</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          <code style={{ flex: 1, minWidth: 220, padding: '12px 14px', borderRadius: 10, background: 'rgba(255,248,230,0.03)', border: '1px solid rgba(255,215,120,0.08)', color: T.goldLight, fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link}</code>
          <button onClick={copy} style={goldBtn}>{copied ? '✓ Copied' : 'Copy link'}</button>
        </div>
        <p style={{ fontSize: 12, color: T.dim, margin: '14px 0 0', lineHeight: 1.6 }}>Earn 20% on every Blueprint enrolment through your link. Payouts monthly via bank transfer once you pass $100.</p>
      </div>
    </div>
  );
}

// ── ACCOUNT ───────────────────────────────────────────────────────────────────
export function AccountView({ fullName, email, planLabel, onSignOut }: { fullName: string; email: string; planLabel: string; onSignOut: () => void }) {
  return (
    <div style={wrap}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div style={card}>
          <p style={label}>Profile</p>
          {[{ l: 'Name', v: fullName }, { l: 'Email', v: email }, { l: 'Plan', v: planLabel }].map(row => (
            <div key={row.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid rgba(255,215,120,0.05)' }}>
              <span style={{ fontSize: 12, color: T.faint }}>{row.l}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{row.v}</span>
            </div>
          ))}
        </div>
        <div style={card}>
          <p style={label}>Security</p>
          <p style={{ fontSize: 12.5, color: T.dim, margin: '8px 0 16px', lineHeight: 1.6 }}>Reset your password via email link, or sign out of this device.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="/reset-password" style={ghostBtn}>Change password</a>
            <button onClick={onSignOut} style={{ ...ghostBtn, borderColor: 'rgba(252,165,165,0.25)', color: 'rgba(252,165,165,0.7)' }}>Sign out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── LOCKED (upgrade gate) ─────────────────────────────────────────────────────
export function LockedView({ sectionName }: { sectionName: string }) {
  return (
    <div style={{ ...wrap, alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <div style={{ ...card, maxWidth: 480, padding: '40px 36px' }}>
        <div style={{ fontSize: 34, marginBottom: 14 }}>🔒</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: T.text, margin: '0 0 10px', letterSpacing: '-0.02em' }}>{sectionName} is a Blueprint feature</h2>
        <p style={{ fontSize: 13, color: T.dim, margin: '0 0 22px', lineHeight: 1.6 }}>Upgrade to the full Blueprint to unlock all 8 modules, {TOTAL_LESSONS} lessons, resources and progress tracking.</p>
        <a href="/demo" style={goldBtn}>Upgrade — $1,800 →</a>
      </div>
    </div>
  );
}
