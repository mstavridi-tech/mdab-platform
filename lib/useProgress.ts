'use client';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TOTAL_LESSONS } from '@/lib/courseData';

/**
 * Lesson progress backed by Supabase (lesson_progress table).
 * Falls back to in-memory state if the table doesn't exist yet,
 * so the UI never breaks before the SQL has been run.
 */
export function useProgress(userId: string | undefined) {
  const [completed, setCompleted] = useState<Map<string, string>>(new Map()); // lesson_id -> completed_at
  const [loaded, setLoaded] = useState(false);
  const [tableMissing, setTableMissing] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('lesson_id, completed_at')
        .eq('user_id', userId);
      if (cancelled) return;
      if (error) {
        setTableMissing(true); // table not created yet — run supabase/lesson_progress.sql
      } else if (data) {
        setCompleted(new Map(data.map(r => [r.lesson_id as string, r.completed_at as string])));
      }
      setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, [userId]);

  const markComplete = useCallback(async (lessonId: string) => {
    setCompleted(prev => new Map(prev).set(lessonId, new Date().toISOString()));
    if (!userId || tableMissing) return;
    await supabase.from('lesson_progress').upsert(
      { user_id: userId, lesson_id: lessonId },
      { onConflict: 'user_id,lesson_id', ignoreDuplicates: true }
    );
  }, [userId, tableMissing]);

  const markIncomplete = useCallback(async (lessonId: string) => {
    setCompleted(prev => { const next = new Map(prev); next.delete(lessonId); return next; });
    if (!userId || tableMissing) return;
    await supabase.from('lesson_progress').delete()
      .eq('user_id', userId).eq('lesson_id', lessonId);
  }, [userId, tableMissing]);

  // "YYYY-MM-DD" -> number of lessons completed that day (local time)
  const activityByDay = new Map<string, number>();
  completed.forEach(ts => {
    const d = new Date(ts);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    activityByDay.set(key, (activityByDay.get(key) ?? 0) + 1);
  });

  const pct = Math.round((completed.size / TOTAL_LESSONS) * 100);

  return { completed, markComplete, markIncomplete, activityByDay, pct, loaded, tableMissing };
}
