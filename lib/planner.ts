import type { Quest } from '../content/types';
export const isConfirmed = (quest: Quest) => ['verified-retail', 'official-confirmed', 'multi-source-confirmed'].includes(quest.verificationStatus);
export type PlanStage = 'prologue' | 'campaign';
export const isPrologueQuest = (quest: Quest) => quest.routeTags.includes('prologue');
export function goalScore(q: Quest, goal: string) {
  if (goal === 'Avoid Missables') return q.missable === true ? 2 : 0;
  if (goal === 'Main Story Focus' || goal === 'Save Family First') return q.type === 'main' ? 2 : 0;
  if (goal === 'Best Equipment') return q.rewards.length;
  if (goal === 'Romance') return q.routeTags.some(t => t.toLowerCase().includes('romance')) ? 2 : q.routeTags.includes('relationships') ? 1 : 0;
  return 0;
}
export function summarizePlan(quests: Quest[], slugs: string[], day: number, phase: 'day' | 'night', used: number, stage: PlanStage = 'campaign') {
  const allSelected = [...new Set(slugs)].flatMap(slug => { const q = quests.find(q => q.slug === slug); return q ? [q] : []; });
  const selected = allSelected.filter(q => stage === 'prologue' ? isPrologueQuest(q) : !isPrologueQuest(q));
  const excludedCount = allSelected.length - selected.length;
  const knownSegments = selected.reduce((sum, q) => sum + (q.timeCost ?? 0), 0);
  const unknownCosts = selected.filter(q => q.timeCost === null).length;
  const elapsedSegments = stage === 'prologue' ? null : (Math.max(1, Math.min(30, day)) - 1) * 16 + (phase === 'night' ? 8 : 0) + Math.max(0, Math.min(7, used));
  const conflicts: string[] = [];
  selected.forEach((a, index) => selected.slice(index + 1).forEach(b => {
    if (a.lockouts.includes(b.slug) || b.lockouts.includes(a.slug) || a.lockouts.some(tag => b.lockouts.includes(tag))) conflicts.push(`${a.name} / ${b.name}`);
  }));
  return { selected, excludedCount, knownSegments, unknownCosts, elapsedSegments, remainingSegments: elapsedSegments === null ? null : 480 - elapsedSegments - knownSegments, conflicts, unconfirmed: selected.filter(q => !isConfirmed(q)).length };
}
