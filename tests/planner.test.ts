import test from 'node:test';
import assert from 'node:assert/strict';
import type { Quest } from '../content/types';
import { goalScore, summarizePlan } from '../lib/planner';
const quest = (slug: string, overrides: Partial<Quest> = {}): Quest => ({slug, name:slug, type:'side', location:'Unknown', timeCost:2,timeOfDay:'either',howToStart:'',prerequisites:[],deadline:null,missable:null,lockouts:[],rewards:[],routeTags:[],character:'Unknown',faction:'Unknown',spoilerSafeSummary:'',verificationStatus:'community-report',gameVersion:'Unknown',lastVerified:'2026-09-05',sources:[], ...overrides});
test('day and night each contain eight segments, not one day per segment', () => {
 const result=summarizePlan([quest('a')],['a'],2,'night',3);
 assert.equal(result.elapsedSegments,27); assert.equal(result.remainingSegments,451); assert.equal(result.knownSegments,2);
});
test('unknown costs stay separately visible and do not become zero estimates',()=>{
 const r=summarizePlan([quest('a',{timeCost:null}),quest('b')],['a','b'],1,'day',0);
 assert.equal(r.unknownCosts,1);assert.equal(r.knownSegments,2);assert.equal(r.unconfirmed,2);
});
test('stale and duplicate saved slugs cannot inflate selected totals',()=>{
 const r=summarizePlan([quest('a')],['a','a','deleted'],1,'day',0);
 assert.deepEqual(r.selected.map(q=>q.slug),['a']);
});
test('explicit lockouts and shared mutually exclusive tags surface conflicts',()=>{
 const r=summarizePlan([quest('a',{lockouts:['b']}),quest('b'),quest('c',{lockouts:['route-exclusive']}),quest('d',{lockouts:['route-exclusive']})],['a','b','c','d'],1,'day',0);
 assert.equal(r.conflicts.length,2);
});
test('the final night reports negative known-cost balance when over budget',()=>{
 const r=summarizePlan([quest('a',{timeCost:4})],['a'],30,'night',7);
 assert.equal(r.remainingSegments,-3);
});
test('empty plans still report the current day accurately',()=>{
 const r=summarizePlan([],[],30,'night',0);
 assert.equal(r.remainingSegments,8);assert.equal(r.unknownCosts,0);
});
test('prologue segments never produce a campaign remaining-time estimate',()=>{
 const r=summarizePlan([quest('a',{routeTags:['prologue'],timeCost:2})],['a'],20,'night',7,'prologue');
 assert.equal(r.knownSegments,2);assert.equal(r.remainingSegments,null);assert.equal(r.elapsedSegments,null);
});
test('switching into campaign excludes saved prologue costs and reports excluded selections',()=>{
 const r=summarizePlan([quest('a',{routeTags:['prologue'],timeCost:2}),quest('b',{timeCost:4})],['a','b'],1,'day',0,'campaign');
 assert.equal(r.knownSegments,4);assert.equal(r.remainingSegments,476);assert.equal(r.excludedCount,1);assert.deepEqual(r.selected.map(q=>q.slug),['b']);
});
test('romance goal prioritizes explicit romance and then relationship leads',()=>{
 assert.equal(goalScore(quest('a',{routeTags:['romance']}),'Romance'),2);
 assert.equal(goalScore(quest('b',{routeTags:['relationships']}),'Romance'),1);
 assert.equal(goalScore(quest('c',{routeTags:['exploration']}),'Romance'),0);
});
