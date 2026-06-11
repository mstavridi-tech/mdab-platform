'use client';
import { findLesson } from '@/lib/courseData';
import ActivityCalendar from './ActivityCalendar';

// Blanted-reference layout, warm gold. Cards are near-borderless glass:
// luminance gradients + deep soft shadows, radius 24, big numerals, airy gaps.

const G = '#C9A84C', GL = '#E2C472';
const glass: React.CSSProperties = {
  borderRadius: 24,
  background: 'linear-gradient(165deg, rgba(255,248,230,0.05), rgba(255,248,230,0.012) 60%)',
  border: '1px solid rgba(255,248,230,0.045)',
  boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
};
const h = { label: { fontSize: 14, fontWeight: 600, color: 'rgba(255,240,210,0.55)', margin: 0 } as React.CSSProperties };

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

interface Props {
  tier: 'blueprint' | 'community';
  firstName: string;
  pct: number;
  completed: Map<string, string>;
  activityByDay: Map<string, number>;
  onStartCourse: () => void;
  onOpenMaterials: () => void;
}

export default function HomeView({ tier, firstName, pct, completed, activityByDay, onStartCourse, onOpenMaterials }: Props) {
  const year = new Date().getFullYear();
  const thisMonth = new Date().getMonth();

  // lessons per month, current year
  const byMonth = Array(12).fill(0) as number[];
  activityByDay.forEach((n, key) => {
    const [y, m] = key.split('-').map(Number);
    if (y === year) byMonth[m - 1] += n;
  });
  const maxMonth = Math.max(1, ...byMonth);
  const monthCount = byMonth[thisMonth];

  // recent completions, newest first
  const recent = [...completed.entries()]
    .sort((a, b) => b[1].localeCompare(a[1]))
    .slice(0, 4)
    .map(([id, ts]) => ({ info: findLesson(id), ts: new Date(ts) }));

  const isBp = tier === 'blueprint';

  return (
    <div style={{ padding: '36px 40px 56px', display: 'grid', gridTemplateColumns: '1.85fr 1fr', gap: 28, alignItems: 'start' }}>

      {/* ════ LEFT ════ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* Hero — floats on background like the reference */}
        <div style={{ padding: '8px 6px 0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div>
              <p style={h.label}>{isBp ? 'Total Progress' : `Welcome back, ${firstName}`}</p>
              <p style={{ fontSize: 48, fontWeight: 800, color: '#fff', margin: '8px 0 10px', letterSpacing: '-0.045em', lineHeight: 1 }}>
                {isBp ? `${pct}%` : 'Community'}
              </p>
              <p style={{ fontSize: 13.5, color: 'rgba(255,240,210,0.45)', margin: 0 }}>
                {isBp
                  ? <>This month&apos;s learning <span style={{ color: GL, fontWeight: 700 }}>+{monthCount} lesson{monthCount === 1 ? '' : 's'}</span></>
                  : <>Live calls every Monday <span style={{ color: GL, fontWeight: 700 }}>· webinar library open</span></>}
              </p>
            </div>
            <button style={{ marginLeft: 'auto', padding: '10px 18px', borderRadius: 12, background: 'rgba(255,248,230,0.05)', border: '1px solid rgba(255,248,230,0.07)', color: 'rgba(255,240,210,0.65)', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
              Monthly ▾
            </button>
          </div>

          {/* Bar chart — wide rounded glowing bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3.2%', height: 190, marginTop: 34 }}>
            {MONTH_LABELS.map((m, i) => {
              const v = byMonth[i];
              const hgt = v > 0 ? Math.max(18, (v / maxMonth) * 100) : 12 + (i % 3) * 4;
              const active = i === thisMonth;
              return (
                <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, height: '100%', justifyContent: 'flex-end' }}>
                  <div title={v ? `${v} lessons` : undefined} style={{
                    width: '100%', maxWidth: 38, height: `${hgt}%`, borderRadius: 12,
                    background: active
                      ? `linear-gradient(180deg, ${GL}, rgba(201,168,76,0.35))`
                      : v > 0
                        ? 'linear-gradient(180deg, rgba(226,196,114,0.55), rgba(201,168,76,0.15))'
                        : 'linear-gradient(180deg, rgba(255,248,230,0.07), rgba(255,248,230,0.025))',
                    boxShadow: active ? '0 0 34px rgba(226,196,114,0.45)' : 'none',
                    transition: 'height 600ms cubic-bezier(0.22,1,0.36,1)',
                  }} />
                  <span style={{ fontSize: 11, fontWeight: active ? 800 : 500, color: active ? '#fff' : 'rgba(255,240,210,0.3)' }}>{m}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut card */}
        <div style={{ ...glass, padding: '34px 38px', display: 'flex', alignItems: 'center', gap: 40, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: -60, top: -60, width: 260, height: 260, background: 'radial-gradient(circle, rgba(201,168,76,0.16), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg width="170" height="170" style={{ transform: 'rotate(-90deg)' }}>
              <defs><linearGradient id="hd" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={GL}/><stop offset="100%" stopColor="rgba(201,168,76,0.35)"/></linearGradient></defs>
              <circle cx="85" cy="85" r="70" fill="none" stroke="rgba(255,248,230,0.06)" strokeWidth="18"/>
              <circle cx="85" cy="85" r="70" fill="none" stroke="url(#hd)" strokeWidth="18" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={2 * Math.PI * 70 * (1 - (isBp ? Math.max(pct, 2) : Math.min(monthCount * 10, 100)) / 100)}
                style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)', filter: 'drop-shadow(0 0 14px rgba(226,196,114,0.35))' }}/>
            </svg>
          </div>
          <div>
            <p style={h.label}>{isBp ? "This Month's Learning" : 'This Month'}</p>
            <p style={{ fontSize: 34, fontWeight: 800, color: '#fff', margin: '8px 0 18px', letterSpacing: '-0.04em' }}>
              {isBp ? `${monthCount} lessons` : 'Mon 10:30 AM'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {(isBp
                ? [{ c: GL, t: 'Completed lessons' }, { c: 'rgba(226,196,114,0.45)', t: 'In progress' }, { c: 'rgba(255,248,230,0.18)', t: 'Remaining' }]
                : [{ c: GL, t: 'Live coaching calls' }, { c: 'rgba(226,196,114,0.45)', t: 'Webinar library' }, { c: 'rgba(255,248,230,0.18)', t: 'Network access' }]
              ).map(l => (
                <div key={l.t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 15, height: 15, borderRadius: 5, background: l.c, display: 'inline-block' }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,240,210,0.5)' }}>{l.t}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={isBp ? onStartCourse : onOpenMaterials} style={{ marginLeft: 'auto', alignSelf: 'flex-end', padding: '13px 24px', borderRadius: 13, border: 'none', background: `linear-gradient(135deg, ${GL}, ${G})`, color: '#0a0800', fontSize: 12, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 8px 28px rgba(201,168,76,0.45)' }}>
            {isBp ? 'Continue →' : 'Webinars →'}
          </button>
        </div>
      </div>

      {/* ════ RIGHT ════ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>

        {/* Membership card */}
        <div>
          <p style={{ fontSize: 17, fontWeight: 800, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.01em' }}>Membership</p>
          <div style={{
            borderRadius: 22, padding: '26px 26px 22px', minHeight: 168, position: 'relative', overflow: 'hidden',
            background: isBp
              ? 'linear-gradient(135deg, #8a6d2a 0%, #C9A84C 48%, #ecd9a0 100%)'
              : 'linear-gradient(135deg, #2c2616 0%, #5d4c22 55%, #8a6d2a 100%)',
            boxShadow: '0 26px 60px rgba(201,168,76,0.3)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ position: 'absolute', top: -130, right: -50, width: 280, height: 280, border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: -150, right: -80, width: 360, height: 360, border: '1px solid rgba(255,255,255,0.16)', borderRadius: '50%' }} />
            <div style={{ width: 44, height: 33, borderRadius: 7, background: 'linear-gradient(135deg, #f6ecc9, #d8c388)', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)' }} />
            <div>
              <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '0 0 4px', textShadow: '0 1px 6px rgba(0,0,0,0.25)' }}>{isBp ? 'MDAB Blueprint' : 'MDAB Community'}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0, letterSpacing: '0.14em' }}>{firstName.toUpperCase()} · MEMBER</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 14 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <p style={{ fontSize: 17, fontWeight: 800, color: '#fff', margin: '0 0 14px', letterSpacing: '-0.01em' }}>Recent Activity</p>
          <div style={{ ...glass, padding: '6px 20px' }}>
            {recent.length === 0 && (
              <p style={{ fontSize: 12.5, color: 'rgba(255,240,210,0.4)', padding: '16px 0', margin: 0 }}>
                {isBp ? 'Complete your first lesson and it shows up here.' : 'Watch a webinar or join a call to see activity here.'}
              </p>
            )}
            {recent.map((r, i) => r.info && (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < recent.length - 1 ? '1px solid rgba(255,248,230,0.05)' : 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✓</div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.info.lesson.title}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,240,210,0.35)', margin: '2px 0 0' }}>Module {r.info.module.id} · {r.info.module.tag}</p>
                </div>
                <span style={{ fontSize: 10.5, color: 'rgba(255,240,210,0.3)', flexShrink: 0 }}>{r.ts.toLocaleDateString('en', { day: 'numeric', month: 'short' })}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity calendar */}
        <ActivityCalendar activityByDay={activityByDay} />
      </div>
    </div>
  );
}
