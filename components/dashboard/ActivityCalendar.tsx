'use client';
import { useMemo, useState } from 'react';
import { T, card, label } from './ui';

const DOW = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/**
 * Combo activity calendar — month grid + heatmap intensity.
 * activityByDay: "YYYY-MM-DD" -> lessons completed that day.
 */
export default function ActivityCalendar({ activityByDay }: { activityByDay: Map<string, number> }) {
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });

  const cells = useMemo(() => {
    const first = new Date(view.y, view.m, 1);
    const lead = (first.getDay() + 6) % 7; // Monday = 0
    const count = new Date(view.y, view.m + 1, 0).getDate();
    return [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];
  }, [view]);

  const keyFor = (d: number) => `${view.y}-${String(view.m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const isToday = (d: number) => d === today.getDate() && view.m === today.getMonth() && view.y === today.getFullYear();

  const bgFor = (n: number) =>
    n >= 3 ? 'rgba(201,168,76,0.45)' : n === 2 ? 'rgba(201,168,76,0.26)' : 'rgba(201,168,76,0.12)';

  const move = (delta: number) => {
    const next = new Date(view.y, view.m + delta, 1);
    setView({ y: next.getFullYear(), m: next.getMonth() });
  };

  const monthTotal = cells.reduce<number>((sum, d) => (d ? sum + (activityByDay.get(keyFor(d)) ?? 0) : sum), 0);

  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <p style={label}>Activity</p>
          <p style={{ fontSize: 15, fontWeight: 800, color: T.text, margin: 0 }}>{MONTHS[view.m]} {view.y}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, color: T.faint }}>{monthTotal} lesson{monthTotal === 1 ? '' : 's'}</span>
          {(['‹', '›'] as const).map((ch, i) => (
            <button key={ch} onClick={() => move(i === 0 ? -1 : 1)}
              style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid rgba(255,215,120,0.1)', background: 'rgba(255,248,230,0.03)', color: 'rgba(255,230,170,0.5)', fontSize: 14, cursor: 'pointer' }}>
              {ch}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {DOW.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 9, color: T.faint, textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: 4 }}>{d}</div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={`e${i}`} />;
          const n = activityByDay.get(keyFor(d)) ?? 0;
          return (
            <div key={d}
              title={n ? `${n} lesson${n === 1 ? '' : 's'} completed` : undefined}
              style={{
                aspectRatio: '1', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: isToday(d) ? 800 : 500,
                color: n >= 2 ? '#0a0800' : isToday(d) ? T.goldLight : 'rgba(255,240,200,0.4)',
                background: n > 0 ? bgFor(n) : 'transparent',
                border: isToday(d) ? `1px solid ${T.gold}` : '1px solid transparent',
              }}>
              {d}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 9, color: T.faint }}>
        Less
        {['rgba(201,168,76,0.12)', 'rgba(201,168,76,0.26)', 'rgba(201,168,76,0.45)'].map(c => (
          <span key={c} style={{ width: 10, height: 10, borderRadius: 3, background: c, display: 'inline-block' }} />
        ))}
        More
      </div>
    </div>
  );
}
