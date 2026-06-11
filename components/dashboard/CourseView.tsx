'use client';
import { useState } from 'react';
import { COURSE, findLesson } from '@/lib/courseData';
import { T, card, label, goldBtn, ghostBtn } from './ui';

interface Props {
  completed: Map<string, string>;
  markComplete: (id: string) => void;
  markIncomplete: (id: string) => void;
  pct: number;
}

export default function CourseView({ completed, markComplete, markIncomplete, pct }: Props) {
  const [activeLessonId, setActiveLessonId] = useState(COURSE[0].lessons[0].id);
  const [openModule, setOpenModule] = useState(COURSE[0].id);

  const current = findLesson(activeLessonId)!;
  const isDone = completed.has(activeLessonId);

  // flat list for next/prev
  const flat = COURSE.flatMap(m => m.lessons.map(l => l.id));
  const idx = flat.indexOf(activeLessonId);
  const nextId = flat[idx + 1];
  const prevId = flat[idx - 1];

  const goTo = (id: string) => {
    setActiveLessonId(id);
    const mod = findLesson(id)?.module;
    if (mod) setOpenModule(mod.id);
  };

  return (
    <div style={{ padding: '28px 28px 48px', display: 'grid', gridTemplateColumns: '1.9fr 1fr', gap: 16, alignItems: 'start' }}>

      {/* ── LEFT: player ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Video area */}
        <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
          {current.lesson.videoUrl ? (
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src={current.lesson.videoUrl}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={current.lesson.title}
              />
            </div>
          ) : (
            <div style={{ position: 'relative', paddingTop: '56.25%', background: 'radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.1), rgba(12,8,4,0.9) 70%)' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: `17px solid ${T.goldLight}`, marginLeft: 5 }} />
                </div>
                <p style={{ fontSize: 12, color: T.dim, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>Video coming soon</p>
                <p style={{ fontSize: 11, color: T.faint, margin: 0 }}>Lesson {current.lesson.id} · {current.lesson.duration}</p>
              </div>
            </div>
          )}
        </div>

        {/* Lesson info + actions */}
        <div style={card}>
          <p style={label}>Module {current.module.id} · {current.module.tag}</p>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: T.text, margin: '0 0 8px', letterSpacing: '-0.02em' }}>{current.lesson.title}</h2>
          <p style={{ fontSize: 13, color: T.dim, margin: '0 0 20px', lineHeight: 1.6 }}>{current.module.description}</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => (isDone ? markIncomplete(activeLessonId) : markComplete(activeLessonId))}
              style={isDone ? { ...ghostBtn, borderColor: 'rgba(134,239,172,0.3)', color: 'rgba(134,239,172,0.8)' } : goldBtn}
            >
              {isDone ? '✓ Completed — undo' : 'Mark as complete'}
            </button>
            {prevId && <button onClick={() => goTo(prevId)} style={ghostBtn}>← Previous</button>}
            {nextId && <button onClick={() => goTo(nextId)} style={ghostBtn}>Next lesson →</button>}
          </div>
        </div>
      </div>

      {/* ── RIGHT: curriculum ── */}
      <div style={{ ...card, padding: '18px 16px', maxHeight: 'calc(100vh - 140px)', overflowY: 'auto', position: 'sticky', top: 92 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 6px 14px' }}>
          <p style={{ ...label, margin: 0 }}>Curriculum</p>
          <span style={{ fontSize: 11, fontWeight: 800, color: T.goldLight }}>{pct}%</span>
        </div>
        <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,215,120,0.07)', margin: '0 6px 16px', overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: T.goldGrad, transition: 'width 600ms ease' }} />
        </div>

        {COURSE.map(mod => {
          const done = mod.lessons.filter(l => completed.has(l.id)).length;
          const open = openModule === mod.id;
          return (
            <div key={mod.id} style={{ marginBottom: 6 }}>
              <button
                onClick={() => setOpenModule(open ? '' : mod.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '10px 10px', borderRadius: 12, border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: open ? 'rgba(201,168,76,0.07)' : 'transparent',
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 900, color: done === mod.lessons.length ? 'rgba(134,239,172,0.8)' : T.goldLight, width: 20, flexShrink: 0 }}>{mod.id}</span>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: open ? T.text : 'rgba(255,240,200,0.55)', lineHeight: 1.3 }}>{mod.title}</span>
                <span style={{ fontSize: 10, color: T.faint, flexShrink: 0 }}>{done}/{mod.lessons.length}</span>
              </button>

              {open && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '4px 0 6px 6px' }}>
                  {mod.lessons.map(les => {
                    const active = les.id === activeLessonId;
                    const lesDone = completed.has(les.id);
                    return (
                      <button
                        key={les.id}
                        onClick={() => setActiveLessonId(les.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '8px 10px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left',
                          background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
                        }}
                      >
                        <span style={{
                          width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                          border: lesDone ? '1px solid rgba(134,239,172,0.6)' : '1px solid rgba(255,215,120,0.2)',
                          background: lesDone ? 'rgba(134,239,172,0.15)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 9, color: 'rgba(134,239,172,0.9)',
                        }}>{lesDone ? '✓' : ''}</span>
                        <span style={{ flex: 1, fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? T.goldLight : 'rgba(255,240,200,0.45)', lineHeight: 1.35 }}>{les.title}</span>
                        <span style={{ fontSize: 9, color: T.faint, flexShrink: 0 }}>{les.duration}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
