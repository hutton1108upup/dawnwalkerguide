import type { Article, Choice, Missable, Quest, Source } from './types';

// Dates describe source review, never a claim of our own retail playtesting.
const checked = '2026-09-05';
const releaseGuidance = 'Release guidance · not independently tested';
const reportedBuild = 'Source build not specified · not independently tested';
const source = (title: string, url: string, note?: string): Source => ({ title, url, note });
const officialTime = source('Bandai Namco — August 2026 gameplay features', 'https://en.bandainamcoent.eu/dawnwalker/news/explore-the-blood-of-dawnwalkers-features-ahead-of-release-new-gameplay-trailer', 'Official mechanics overview; not a retail test by this site.');
const reveal = source('Bandai Namco — gameplay reveal recap', 'https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-gameplay-reveal-recap');
const xboxTime = source('Xbox Wire — hands-on preview and developer interview', 'https://news.xbox.com/en-us/2026/07/07/the-blood-of-dawnwalker-hands-on-preview/', 'July 2026 preview; eight daytime and eight nighttime segments.');
const prologue = source('Lauren Morton, PC Gamer — prologue playthrough report', 'https://www.pcgamer.com/games/rpg/blood-of-dawnwalker-prologue-quests-order/', 'September 2, 2026; author reports repeated prologue runs. Costs are reported, not tested here.');
const tapestry = source('Sean Martin, PC Gamer — Blasphemy', 'https://www.pcgamer.com/games/rpg/blood-of-dawnwalker-blasphemy-walkthrough/');
const esme = source('Sean Martin, PC Gamer — Esme opening choice', 'https://www.pcgamer.com/games/rpg/blood-of-dawnwalker-should-you-force-feed-coens-mum-esme/');
const recipe = source('Sean Martin, PC Gamer — Anca’s recipe', 'https://www.pcgamer.com/games/rpg/blood-of-dawnwalker-ancas-recipe-instructions/');
const ocha = source('Sean Martin, PC Gamer — The Heart Wants What It Wants', 'https://www.pcgamer.com/games/rpg/blood-of-dawnwalker-the-heart-wants-what-it-wants-walkthrough/');
const romance = source('Lauren Morton, PC Gamer — romance playthrough report', 'https://www.pcgamer.com/games/rpg/blood-of-dawnwalker-romances/');
const tips = source('Sean Martin, PC Gamer — 80-hour playthrough tips', 'https://www.pcgamer.com/games/rpg/blood-of-dawnwalker-tips/');
const launch = source('Bandai Namco — official launch announcement', 'https://www.bandainamcoent.com/news/the-blood-of-dawnwalker-is-now-available');
const hotfix = source('Rebel Wolves — Hotfix 1.0.2, September 4', 'https://dawnwalkergame.com/us/en/news/hotfix-102', 'Distinguish fixed items from the separate known-issues list.');
const steam = source('Steam — official store and PC requirements', 'https://store.steampowered.com/app/3751260/The_Blood_of_Dawnwalker/');
const steamFiles = source('Steam Support — verify game files', 'https://help.steampowered.com/en/faqs/view/0C48-FCBD-DA71-93EB');
const steamLaunch = source('Steam Support — games fail to launch', 'https://help.steampowered.com/en/faqs/view/5814-D9A3-BE42-62DF');

const seedQuest = (data: Pick<Quest, 'slug' | 'name' | 'timeCost' | 'howToStart'> & Partial<Quest>): Quest => ({
  type: 'side', location: 'Laslea · prologue', timeOfDay: 'unknown', prerequisites: [], deadline: null,
  missable: null, lockouts: [], rewards: [], routeTags: ['prologue'], character: 'Not catalogued', faction: 'Not established',
  spoilerSafeSummary: 'A reported prologue activity. Read its current journal entry before committing time.',
  verificationStatus: 'community-report', gameVersion: reportedBuild, lastVerified: checked, sources: [prologue], ...data,
});

export const quests: Quest[] = [
  seedQuest({ slug: 'withering-away', name: 'Withering Away', type: 'main', timeCost: 2, howToStart: 'Pieter’s request.', character: 'Esme / Anca', routeTags: ['prologue', 'family'], spoilerSafeSummary: 'An early family errand. Keep the preparation instructions available.', sources: [prologue, recipe] }),
  seedQuest({ slug: 'live-bait', name: 'Live Bait', timeCost: null, howToStart: 'Speak to Yanna near home.', character: 'Yanna', routeTags: ['prologue', 'family'], spoilerSafeSummary: 'Reported cost: 1 segment, or 2 if you play tag. The planner leaves this conditional total unknown.' }),
  seedQuest({ slug: 'blasphemy', name: 'Blasphemy', timeCost: 1, howToStart: 'Speak to Gremla in Laslea.', character: 'Gremla', deadline: 'Before the prologue Blood Mass', missable: true, routeTags: ['prologue', 'protect-npcs'], spoilerSafeSummary: 'A missing banner puts a villager in a difficult position.', sources: [prologue, tapestry] }),
  seedQuest({ slug: 'page-turner', name: 'Page-Turner', timeCost: 1, howToStart: 'Optional time with Anca during Withering Away.', character: 'Anca', routeTags: ['prologue', 'relationships'], spoilerSafeSummary: 'The reported one-segment cost applies if you stay through the rain.' }),
  seedQuest({ slug: 'deep-down', name: 'Deep Down', timeCost: 1, howToStart: 'Gavril, fields near Laslea Gate.', character: 'Gavril' }),
  seedQuest({ slug: 'enter-not', name: 'Enter Not', type: 'activity', timeCost: 0, howToStart: 'Abandoned house in the northwest forest.', routeTags: ['prologue', 'exploration'] }),
  seedQuest({ slug: 'dead-drop', name: 'Dead Drop', type: 'activity', timeCost: 0, howToStart: 'Flowered grave east of town.', routeTags: ['prologue', 'exploration'] }),
  seedQuest({ slug: 'into-the-den', name: 'Into The Den', timeCost: 1, howToStart: 'Bear den east of Northern Foothills.', missable: false, routeTags: ['prologue', 'exploration'], spoilerSafeSummary: 'Reported as available after the prologue; a candidate to postpone.' }),
  seedQuest({ slug: 'the-heart-wants-what-it-wants', name: 'The Heart Wants What It Wants', timeCost: null, timeOfDay: 'unknown', location: 'Altenmarkt', howToStart: 'Ocha and Nora at the inn.', character: 'Ocha / Nora', routeTags: ['relationships', 'training'], spoilerSafeSummary: 'A later character quest with a consequential branch. Total time cost is not established.', sources: [ocha] }),
];

export const choices: Choice[] = [
  {
    slug: 'blasphemy-return-the-banner', title: 'Blasphemy: return the banner?', questSlug: 'blasphemy',
    question: 'Should you recover the tapestry or keep the thief’s secret?', recommendation: 'Editorial: favor returning it if protecting the villager matters more than the alternative reward.',
    options: [
      { label: 'Ask for its return', bestFor: 'Protecting Gremla', timeCost: null, reward: 'Money and XP reported; amounts not catalogued.', lockout: 'The other branch’s amulet is not the reported reward.' },
      { label: 'Keep the secret', bestFor: 'The alternative item', timeCost: null, reward: 'Daylight Amulet.', lockout: 'Gremla dies at the evening Mass.' },
    ],
    lightConsequence: 'The item reward and the villager’s safety favor different branches.', fullConsequence: 'PC Gamer reports that returning the banner saves Gremla. Keeping Premysl’s secret grants the Daylight Amulet, but Gremla is killed at Mass.',
    reversible: 'No reversal established. Keep an earlier save if you want to compare.', verificationStatus: 'community-report', sources: [tapestry],
  },
  {
    slug: 'force-feed-esme', title: 'Esme: should you force her to eat?', questSlug: 'withering-away',
    question: 'Does the opening feeding decision lock a later path?', recommendation: 'Editorial: choose the response that fits your Coen. Both options are reasonable roleplaying choices.',
    options: [
      { label: 'Follow Pieter’s instruction', bestFor: 'Roleplaying obedience', timeCost: null, reward: 'No distinct reward documented.', lockout: 'No later lockout reported.' },
      { label: 'Decline', bestFor: 'Roleplaying reluctance', timeCost: null, reward: 'No distinct reward documented.', lockout: 'No later lockout reported.' },
    ],
    lightConsequence: 'The immediate reaction differs. Both paths continue the family errand.', fullConsequence: 'The report says Pieter still sends Coen for herbs either way. Do not confuse this scene with preparing Esme’s medicine later; that is a separate decision.',
    reversible: 'The scene can be revisited from an earlier save; no need to restart for a reported long-term advantage.', verificationStatus: 'community-report', sources: [esme],
  },
  {
    slug: 'ocha-spell-or-fight', title: 'Ocha: use the spell or fight?', questSlug: 'the-heart-wants-what-it-wants',
    question: 'Which approach preserves the city follow-up?', recommendation: 'Editorial: bring the ring for the spell if you want our suggested route. Read the additional context before the follow-up conversation.',
    options: [
      { label: 'Bring the ring for the spell', bestFor: 'Preserving the city option', timeCost: null, reward: 'Broad Swing is the reported quest reward.', lockout: 'The later conversation still determines where Ocha goes.' },
      { label: 'Fight, or use the wrong memento', bestFor: 'A different story outcome', timeCost: null, reward: 'No additional reward advantage established.', lockout: 'The reported city follow-up is lost.' },
    ],
    lightConsequence: 'The approach affects Ocha’s later options. The ring does not provide a rescue outcome for everyone involved.',
    fullConsequence: 'Andrei dies on both routes. After the successful spell, encouraging new experiences can keep Ocha with Nora in the city, opening Swordmastery training and Study in Crimson. Favoring home sends her to the mountains. The source did not confirm training there.',
    reversible: 'No in-world reversal established. Save before the memento decision and later conversation.', verificationStatus: 'community-report', sources: [ocha],
  },
];

export const missables: Missable[] = [
  { id: 'gremla-banner', name: 'Gremla’s prologue outcome', group: 'Before the Blood Mass', type: 'NPC', condition: 'Resolve the banner decision before the evening event.', lightCondition: 'Returning the banner is the protective branch.', fullCondition: 'Keeping the thief’s secret leads to Gremla’s death at Mass.', href: '/guides/choices/blasphemy-return-the-banner/', verificationStatus: 'community-report' },
  { id: 'esme-medicine', name: 'Esme’s medicine preparation', group: 'Before the Blood Mass', type: 'Quest', condition: 'Review the recipe before the preparation conversation.', lightCondition: 'An incorrect mixture has a serious later consequence.', fullCondition: 'The cited recipe report warns of a harmful Mass outcome; this entry does not document every recovery path.', href: '/guides/quests/withering-away/', verificationStatus: 'community-report' },
  { id: 'ocha-city', name: 'Ocha’s city follow-up', group: 'Later character decisions', type: 'Quest', condition: 'Check the memento and the follow-up conversation before committing.', lightCondition: 'A successful spell preserves an additional city option.', fullCondition: 'Use the ring, then encourage new experiences to preserve the reported city training and Study in Crimson follow-up.', href: '/guides/choices/ocha-spell-or-fight/', verificationStatus: 'community-report' },
  { id: 'daylight-amulet', name: 'Blasphemy’s alternate reward', group: 'Before the Blood Mass', type: 'Item', condition: 'The two banner branches give different rewards.', lightCondition: 'The alternate item comes with a harmful character consequence.', fullCondition: 'The Daylight Amulet is reported on the secret-keeping branch, which costs Gremla her life.', href: '/guides/choices/blasphemy-return-the-banner/', verificationStatus: 'community-report' },
];

const article = (data: Pick<Article, 'slug' | 'title' | 'description' | 'quickAnswer' | 'sections' | 'sources'> & Partial<Article>): Article => ({
  category: 'guides', kicker: 'Field guide', verificationStatus: 'official-confirmed', gameVersion: releaseGuidance,
  updated: checked, indexable: true, related: ['/tools/30-day-planner/', '/guides/time-limit/'], keywords: [], ...data,
});

export const articles: Article[] = [
  article({
    slug: 'time-limit', title: 'How the 30-day time limit works', description: 'Understand time segments, exploration, commitment costs and the limits of a Dawnwalker planning budget.', kicker: 'Time & planning',
    quickAnswer: 'Exploration is not a real-time countdown. Certain quest actions spend segments. A full day-night cycle has 16 segments: eight in daylight and eight at night.', sources: [officialTime, xboxTime, reveal],
    sections: [
      { id: 'read-the-clock', title: 'Read the prompt before committing', paragraphs: ['The official overview sets a 30-day, 30-night family deadline. The hourglass shows a narrative activity’s cost. Your current in-game prompt is the best check when a guide and your save disagree.'] },
      { id: 'budget', title: 'Understand the arithmetic', paragraphs: ['Thirty complete cycles at 16 segments each gives a 480-segment reference budget. This is arithmetic, not a promise that every route fits. Prerequisites, phase changes and optional branches can add costs.'], table: { headers: ['Unit', 'Planner interpretation'], rows: [['1 segment', 'One action-budget unit'], ['Daylight phase', '8 segments'], ['Night phase', '8 segments'], ['Calendar cycle', '16 segments'], ['Prologue', 'Separate day-zero context; do not deduct it twice']] } },
      { id: 'routine', title: 'A calm planning routine', paragraphs: ['Editorial method: gather information first, then commit. Add the activities you actually want to your queue and leave space for decisions whose costs are not yet known.'], bullets: ['Check your current phase and remaining segments.', 'Read the next action’s displayed cost.', 'Review any event-based warning.', 'After completing it, update your queue from the game.'] },
      { id: 'unknown-costs', title: 'Unknown is not free', paragraphs: ['An unknown-cost task remains outside an exact subtotal. A zero means a source reported zero for that activity; it does not make every connected step free. The planner cannot prove a route is safe just because its known subtotal fits.'] },
    ], keywords: ['blood of dawnwalker time limit', '30 days', 'time segments'],
  }),
  article({
    slug: 'quest-order', title: 'Choose your next quest without rushing', description: 'A goal-based Dawnwalker quest-order method with a separate prologue budget and explicit unknown costs.', kicker: 'Route planning', verificationStatus: 'community-report',
    quickAnswer: 'Prioritize an event you want to influence, then a character you care about, then optional rewards. The order below is an editorial decision method, not a tested complete-game route.', sources: [prologue, tips],
    sections: [
      { id: 'prologue', title: 'Keep the prologue separate', paragraphs: ['Our initial quest catalog concentrates on the prologue. Its daytime budget is not the complete campaign calendar. A later-game queue should start from the time shown in your own save.'] },
      { id: 'priority', title: 'Choose a priority for this session', paragraphs: ['Avoid mixing an NPC-protection run with an item-collection checklist until you have looked at their branch tradeoffs. Some goals ask for different decisions.'], table: { headers: ['Your goal', 'What to inspect first', 'What to postpone'], rows: [['Protect characters', 'Event warnings and choice consequences', 'Unrelated rewards'], ['Explore relationships', 'Character conversations and prerequisites', 'An assumed fastest route'], ['Collect equipment', 'Reward branch and its cost', 'Claims that both branches fit one save'], ['Finish the story', 'Your chosen main objective', 'Optional activities with unclear value']] } },
      { id: 'queue', title: 'Build a short queue', paragraphs: ['Editorial method: choose only the next two or three meaningful commitments. A short queue is easier to correct after new dialogue or a changed objective. Add a task with unknown cost only when you are willing to inspect and revise the budget before starting.'] },
      { id: 'reset', title: 'Recheck after a major event', paragraphs: ['The cited playthrough tips report new opportunities in familiar areas. Review the journal again after a story change. A route written before that event should not silently carry over unchanged.'] },
    ], related: ['/tools/30-day-planner/', '/guides/quests/', '/guides/completionist-route/'], keywords: ['blood of dawnwalker quest order', 'best order'],
  }),
  article({
    slug: 'missable-quests', title: 'Missable quests: what to check before you move on', description: 'Track a small set of documented event and decision risks without pretending to list every missable in Dawnwalker.', kicker: 'Avoid regrets', verificationStatus: 'community-report',
    quickAnswer: 'Use the checklist as a record of reviewed decisions. Its first entries cover a prologue event and a later character branch; it is not a complete list of all missable content.', sources: [tapestry, ocha, recipe],
    sections: [
      { id: 'types', title: 'Three different ways to miss something', paragraphs: ['A deadline, an incompatible reward and an unavailable follow-up need different responses. Do not treat every warning as a quest you must complete immediately.'], table: { headers: ['Risk', 'Useful response'], rows: [['Event deadline', 'Review before advancing the event'], ['Exclusive reward', 'Choose which outcome matters to this run'], ['Follow-up dependency', 'Check the earlier branch before committing']] } },
      { id: 'evidence', title: 'What this checklist actually covers', paragraphs: ['The linked reports document the banner decision, the medicine preparation and Ocha’s city follow-up. Use the linked detail page to reveal only the consequence you need. No universal day-number deadline is supplied for the campaign.'] },
      { id: 'review', title: 'Before a major conversation', paragraphs: ['Editorial checklist: read the objective; note who is affected; decide whether an item or relationship matters more; keep an earlier save when the game allows. A checked box means you reviewed the entry, not that the game has automatically completed it.'] },
      { id: 'coverage', title: 'Leave room for discoveries', paragraphs: ['An absent entry means we have not catalogued it. It does not establish that the activity is safe to ignore. Follow new warnings in your journal, and compare the source date and build context before relying on a precise condition.'] },
    ], related: ['/tools/missable-checklist/', '/guides/choices/', '/guides/quests/blasphemy/'], keywords: ['blood of dawnwalker missable quests', 'permanent lockout'],
  }),
  article({
    slug: 'choices', title: 'Make choices with only the spoilers you need', description: 'Compare Dawnwalker decisions by your goal, reward and consequence using layered spoilers.', kicker: 'Decisions', verificationStatus: 'community-report',
    quickAnswer: 'Start with the question and your goal. Reveal a light consequence when you need direction; open the full outcome only when the exact tradeoff matters.', sources: [esme, tapestry, ocha],
    sections: [
      { id: 'goal', title: 'Define “best” before choosing', paragraphs: ['The best response for a protective character run may differ from the best response for collecting an item. Our recommendations state their goal so you can disagree with them without misunderstanding the underlying report.'] },
      { id: 'layers', title: 'Use the three spoiler layers', paragraphs: ['The choice tool separates the decision from the reveal. You can browse questions without immediately reading a named death or a later unlock.'], table: { headers: ['Layer', 'What to expect'], rows: [['Hidden', 'The decision topic'], ['Light', 'The direction of the tradeoff'], ['Full', 'Specific reported rewards and consequences']] } },
      { id: 'certainty', title: 'A report is not an exhaustive proof', paragraphs: ['When a writer reports no long-term effect, that is a useful observation. It does not establish that every possible save, future patch or dialogue combination behaves identically. Unknown costs stay unknown even on a documented choice.'] },
      { id: 'save', title: 'Compare branches deliberately', paragraphs: ['Editorial method: preserve a save before the decision if possible, record the option and immediately visible result, then keep one branch as your main run. A checklist cannot merge mutually exclusive histories into the same playthrough.'] },
    ], related: ['/guides/choices/', '/tools/missable-checklist/', '/guides/quest-order/'], keywords: ['blood of dawnwalker choices', 'should you'],
  }),
  article({
    slug: 'beginner', title: 'A beginner’s first-session checklist', description: 'Start Dawnwalker with a clear grasp of commitment costs, day and night abilities, dialogue and combat options.', kicker: 'Start here',
    quickAnswer: 'Learn the commitment prompt before optimizing a route. Explore, inspect your journal and choose a manageable next objective; the clock does not measure how slowly you read a guide.', sources: [officialTime, reveal, tips],
    sections: [
      { id: 'forms', title: 'Learn both sides of Coen', paragraphs: ['Day and night offer different abilities and approaches. When a route seems inaccessible, inspect the current phase and available actions before assuming the quest is broken.'] },
      { id: 'journal', title: 'Read the journal as a decision screen', paragraphs: ['The playthrough report identifies sun and moon markers for phase-specific activities and notes that optional dialogue can expose additional choices. Pause to inspect these cues rather than rapidly selecting the next highlighted line.'] },
      { id: 'session', title: 'Give the first session one goal', paragraphs: ['Editorial advice: choose a small objective such as understanding a combat encounter, finishing a family errand or finding a character. Do not turn the entire map into a mandatory checklist before you know which story you want.'], bullets: ['Identify the next commitment and its cost.', 'Decide how much spoiler detail you want.', 'Preserve a useful save when possible.', 'After the objective, compare the outcome with the journal.'] },
      { id: 'tools', title: 'Use the tools when a decision needs them', paragraphs: ['The planner helps compare known costs; the checklist helps remember reviewed warnings; choices show branch tradeoffs. None reads your game save or automatically knows which steps you have already completed.'] },
    ], related: ['/guides/time-limit/', '/guides/combat/', '/tools/30-day-planner/'], keywords: ['blood of dawnwalker beginner guide', 'gameplay'],
  }),
  article({
    slug: 'completionist-route', title: 'Plan a completion-focused run honestly', description: 'Build a personal coverage plan around compatible goals instead of an unsupported promise to complete everything in one run.', kicker: 'For careful explorers',
    quickAnswer: 'There is no verified 100% route in this MVP. Choose compatible goals, separate exclusive outcomes and track what you have reviewed before making irreversible commitments.', sources: [officialTime, tips],
    sections: [
      { id: 'define', title: 'Define what completion means to you', paragraphs: ['Editorial method: write a short list of must-see characters, must-have rewards and story outcomes. Treat these as preferences to compare, not as proof that every combination is possible.'] },
      { id: 'matrix', title: 'Split one run from future alternatives', paragraphs: ['Use a simple planning matrix before you add more tasks. It prevents an alternate branch from appearing as an unfinished obligation in your current run.'], table: { headers: ['Bucket', 'What belongs here'], rows: [['This run', 'Compatible priorities you intend to pursue'], ['Alternative save', 'A different decision you want to inspect'], ['Future playthrough', 'A goal that conflicts with this run'], ['Needs evidence', 'An alleged requirement without a reliable source']] } },
      { id: 'buffer', title: 'Do not spend an unknown budget twice', paragraphs: ['A queue subtotal only accounts for known listed costs. Leave uncertain work visible, review the actual commitment prompts and revise the queue after branch changes. We do not prescribe a supposedly safe fixed number of spare days.'] },
      { id: 'success', title: 'Measure progress by chosen goals', paragraphs: ['The official description explicitly asks players to choose how they spend limited time. A report of one player finishing with days left is not a guarantee for another route. Review your own priorities before chasing an arbitrary percentage.'] },
    ], related: ['/guides/quest-order/', '/tools/missable-checklist/', '/guides/romance/'], keywords: ['blood of dawnwalker completionist route', 'can you do everything'],
  }),
  article({
    slug: 'stuttering', category: 'fixes', title: 'Stuttering: official workaround and a repeatable check', description: 'Try the developer-listed Full Screen workaround and compare frame pacing without assuming a universal FPS fix.', kicker: 'PC · known issue', indexable: true,
    quickAnswer: 'The September 4 hotfix notice still lists stutter in windowed or borderless mode and suggests Full Screen. Treat that as a workaround to test, not a claim that every stutter was fixed.', sources: [hotfix],
    sections: [
      { id: 'mode', title: 'Test the documented display-mode workaround', paragraphs: ['Record your current display mode, switch to Full Screen and repeat the same short scene. If the result is worse or unchanged, restore your previous choice. This site has not benchmarked the workaround.'] },
      { id: 'comparison', title: 'Change one thing per comparison', paragraphs: ['Editorial test protocol: keep resolution, graphics settings, location and camera movement constant. Compare repeated hitches as well as the average frame rate. A higher average alone may not explain an interruption.'] },
      { id: 'log', title: 'Keep a useful issue record', paragraphs: ['Record the game build, GPU and driver, display mode, resolution, location, trigger and whether the problem repeats after relaunching. These details make a report more useful than “the game lags.”'] },
      { id: 'scope', title: 'Know what has not been established', paragraphs: ['We have no controlled hardware measurements or universal configuration fix. If the symptom is an application crash, use the crash checklist instead. This page documents the developer’s workaround and a way to check it on your system.'] },
    ], related: ['/fixes/crashing/', '/fixes/best-settings/'], keywords: ['blood of dawnwalker stuttering'],
  }),
  article({
    slug: 'best-settings', category: 'fixes', title: 'PC settings: establish your own stable baseline', description: 'Compare official PC requirements and run a small controlled settings test without invented performance benchmarks.', kicker: 'PC · general triage', indexable: false, verificationStatus: 'unverified',
    quickAnswer: 'No benchmark-backed “best settings” preset is available here. Start with the game’s preset, set a personal frame-rate target and change one setting at a time in the same scene.', sources: [steam],
    sections: [
      { id: 'requirements', title: 'Check requirements before a preset', paragraphs: ['The official Steam listing specifies 16 GB RAM and 60 GB SSD space for both minimum and recommended configurations. Requirements describe hardware eligibility, not a guaranteed frame rate.'], table: { headers: ['Component', 'Minimum', 'Recommended'], rows: [['CPU', 'i5-11400F / Ryzen 7 2700X', 'i7-11700K / Ryzen 7 5700X'], ['GPU', 'GTX 1060 / RX 580', 'RTX 4060 / RX 7600 XT / Arc B580'], ['VRAM', '6 GB', '8 GB']] } },
      { id: 'baseline', title: 'Create a comparable baseline', paragraphs: ['Editorial test: record resolution, preset and any scaling or frame-generation option actually present on your hardware. Capture the same short gameplay section twice before adjusting anything. Avoid inventing menu settings from another Unreal Engine game.'] },
      { id: 'tradeoff', title: 'Choose what you want to improve', paragraphs: ['If response feels delayed, compare input feel as well as the displayed FPS. If image quality matters more, compare moving foliage, fine edges and dark areas. Keep a change only when it improves your chosen target.'] },
      { id: 'platforms', title: 'Do not transfer PC results to consoles', paragraphs: ['This page does not establish PS5, PS5 Pro, Series S or Steam Deck performance. A hardware requirement or a PC workaround cannot prove a console mode or handheld compatibility result.'] },
    ], related: ['/fixes/stuttering/', '/fixes/crashing/', '/guides/release-date/'], keywords: ['blood of dawnwalker best settings', 'PC requirements', 'FPS'],
  }),
  article({
    slug: 'crashing', category: 'fixes', title: 'Crashing: a careful first-response checklist', description: 'Separate launch, shader-compilation and in-game crashes; collect a useful report and follow official guidance.', kicker: 'PC · general triage', indexable: false, verificationStatus: 'unverified',
    quickAnswer: 'Record when the crash happens, verify the game installation through Steam and check the official known-issues notice. No universal Dawnwalker crash cure is verified here.', sources: [steamFiles, steamLaunch, hotfix],
    sections: [
      { id: 'classify', title: 'Identify the failing step', paragraphs: ['An immediate launch failure, a shader-compilation crash and a repeatable crash in one scene are different observations. Write down the exact message and whether the application closes or the whole system restarts.'], table: { headers: ['Observation', 'First useful record'], rows: [['Before the main menu', 'Launch error and system specifications'], ['During shader compilation', 'Exact message and official known-issue match'], ['In a particular scene', 'Save location and repeatable action'], ['After a recent change', 'Build, driver or setting that changed']] } },
      { id: 'files', title: 'Check the installation', paragraphs: ['Steam provides a file-verification command in the game’s Properties under Installed Files. After verification, repeat the original failing step. A successful file check does not rule out every other cause.'] },
      { id: 'official', title: 'Read the shader-crash notice carefully', paragraphs: ['The developer’s September 4 notice includes a known shader-compilation issue and links hardware guidance. Follow the official notice and your hardware manufacturer for any firmware instructions. This guide does not prescribe BIOS values, voltages or undocumented launch flags.'] },
      { id: 'report', title: 'Escalate with a reproducible report', paragraphs: ['Include your platform, game version, CPU, GPU, driver, error text and shortest reproduction steps. Preserve saves before any reinstall or support-directed file operation. Stop repeating a change that cannot be tied to an improvement.'] },
    ], related: ['/fixes/stuttering/', '/fixes/best-settings/'], keywords: ['blood of dawnwalker crashing', 'shader compilation crash'],
  }),
  article({
    slug: 'quests/withering-away', title: 'Withering Away: prepare before the conversation', description: 'Separate Esme’s opening choice from the later medicine preparation and review the recipe before committing.', kicker: 'Quest notes · prologue', verificationStatus: 'community-report',
    quickAnswer: 'For Anca’s recipe, use hot water and three spoonfuls of herbs. The opening feeding choice is a separate decision; its reported lack of lasting impact does not apply to the medicine preparation.', sources: [recipe, esme],
    sections: [
      { id: 'before', title: 'Before preparing the herbs', paragraphs: ['The recipe report notes that you cannot consult the instructions during the preparation conversation. Keep the in-game note available beforehand rather than relying on memory.'] },
      { id: 'steps', title: 'A preparation checkpoint', paragraphs: ['Editorial checklist: finish reading the note, record the water instruction and quantity, then select the matching responses carefully. If you want to compare results, preserve a save before entering the scene.'], bullets: ['Confirm you are following Anca’s recipe.', 'Read both preparation prompts before selecting.', 'Do not substitute the opening feeding advice for recipe instructions.'] },
      { id: 'consequence', title: 'Why preparation deserves attention', paragraphs: ['The source warns that an incorrect mixture has a serious consequence at the evening event. Follow the original linked recipe for the exact solution if you want that level of help.'], spoiler: 'light' },
      { id: 'route', title: 'Fit the errand into your own route', paragraphs: ['Add the quest to a prologue queue and compare it with the other outcomes you care about. A preparation guide does not confirm every surrounding dialogue branch, optional interaction or later recovery path.'] },
    ], related: ['/guides/choices/force-feed-esme/', '/tools/30-day-planner/', '/guides/quest-order/'], keywords: ['withering away', 'Anca recipe'],
  }),
  article({
    slug: 'quests/blasphemy', title: 'Blasphemy: decide what you want to protect', description: 'Prepare for the banner decision with a clear view of the event deadline and layered consequence details.', kicker: 'Quest notes · prologue', verificationStatus: 'community-report',
    quickAnswer: 'Review the banner decision before the evening Blood Mass. Use the linked choice comparison to decide whether the character outcome or alternate reward matters more to your run.', sources: [tapestry],
    sections: [
      { id: 'objective', title: 'Keep the objective in focus', paragraphs: ['The authored report follows Gremla’s missing tapestry investigation. This page is a decision checkpoint, not a replacement for its clue-by-clue walkthrough.'] },
      { id: 'decision', title: 'Separate solving from choosing', paragraphs: ['Finding the culprit is not the same as selecting the outcome. Before finishing the conversation, decide whether your current run prioritizes helping the affected villager or exploring the alternative reward branch.'] },
      { id: 'review', title: 'Check before advancing the event', paragraphs: ['Editorial checklist: confirm the quest result in your journal, review the spoiler layer you are comfortable with and make sure you have intentionally accepted the tradeoff. Do not mark both branches as obtainable on the same history.'] },
      { id: 'source', title: 'Use the full comparison when ready', paragraphs: ['The linked choice page contains the reported item and character consequences. Later-game effects beyond the source’s observation have not been independently tested by this site.'] },
    ], related: ['/guides/choices/blasphemy-return-the-banner/', '/tools/missable-checklist/', '/guides/quest-order/'], keywords: ['blasphemy dawnwalker', 'return tapestry'],
  }),
  article({
    slug: 'quests/the-heart-wants-what-it-wants', title: 'The Heart Wants What It Wants: protect a follow-up', description: 'Check the memento branch and later conversation before committing to Ocha’s outcome.', kicker: 'Quest notes · Altenmarkt', verificationStatus: 'community-report',
    quickAnswer: 'The approach and the later conversation both matter. If you want the reported city follow-up, read the Ocha choice comparison before resolving the memento decision.', sources: [ocha],
    sections: [
      { id: 'two-decisions', title: 'Track two commitments', paragraphs: ['Treat the initial approach and the character’s later plans as separate checkpoints. A successful first step is not evidence that every follow-up choice leads to the same destination.'] },
      { id: 'goal', title: 'Choose a goal without reading every spoiler', paragraphs: ['Editorial method: decide whether you want access to the city follow-up or a different character outcome. Then reveal the minimum consequence detail needed in the choice tool. You do not need an ending summary to compare these options.'] },
      { id: 'time', title: 'Leave the cost unknown', paragraphs: ['The cited walkthrough does not establish a complete segment cost. This task is therefore excluded from an exact known-cost total. Read the game’s prompts for every commitment and revise your budget as you proceed.'] },
      { id: 'after', title: 'Confirm the result in your journal', paragraphs: ['After the conversation, record the available objective and character location in your own notes. The source leaves some alternative-location training behavior unresolved, so do not assume identical services everywhere.'] },
    ], related: ['/guides/choices/ocha-spell-or-fight/', '/tools/missable-checklist/', '/guides/choices/'], keywords: ['the heart wants what it wants dawnwalker', 'Ocha choice'],
  }),
  article({
    slug: 'combat', title: 'Combat: choose a control style you can read', description: 'Understand adaptive versus directional combat and create a focused practice routine without invented builds.', kicker: 'Combat basics',
    quickAnswer: 'The official overview describes adaptive attack/block controls and a directional alternative. Choose the one that lets you read encounters consistently, then practice timing before chasing a build.', sources: [officialTime, reveal],
    sections: [
      { id: 'controls', title: 'Two control approaches', paragraphs: ['Adaptive omniattack and omniblock simplify directional input. Directional combat rewards deliberate attack and defense timing, including parries and ripostes. These are control choices, not a published ranking of damage output.'] },
      { id: 'practice', title: 'Practice one thing at a time', paragraphs: ['Editorial routine: in an encounter you can revisit, focus first on recognizing an incoming attack, then on a consistent defensive response, then on a short punish. If you cannot explain why an attempt failed, reduce the number of actions you are trying to learn at once.'] },
      { id: 'forms', title: 'Reassess your tools after a phase change', paragraphs: ['Coen’s daytime and nighttime abilities differ. Review the actions currently available before repeating a tactic that depended on a different form. Do not spend scarce upgrades solely because a generic RPG build calls them mandatory.'] },
      { id: 'builds', title: 'What this guide does not rank', paragraphs: ['We have no independent damage tests or complete boss matchup database. No weapon, skill or upgrade is presented as a mathematically best build. Use observed difficulty in your own encounters to decide what to investigate next.'] },
    ], related: ['/guides/beginner/', '/guides/time-limit/', '/fixes/best-settings/'], keywords: ['blood of dawnwalker combat', 'gameplay', 'build'],
  }),
  article({
    slug: 'romance', title: 'Romance options and a spoiler-light planning method', description: 'A sourced overview of Anca, Crake and Lacra, with a practical way to prioritize relationship content.', kicker: 'Relationships', verificationStatus: 'community-report',
    quickAnswer: 'PC Gamer’s playthrough report lists Anca, Crake and Lacra as romance options and reports that more than one partner is possible. We do not provide a tested mandatory-dialogue checklist.', sources: [romance],
    sections: [
      { id: 'options', title: 'The reported options', paragraphs: ['Use this as a sourced overview, not proof that every relationship choice is interchangeable. The original report contains detailed sequences and substantial later-story spoilers.'], table: { headers: ['Character', 'How to use this overview'], rows: [['Anca', 'Prioritize her conversations if she is your chosen relationship focus'], ['Crake', 'Review his character questline before advancing related decisions'], ['Lacra', 'Keep her objectives visible in your personal priorities']] } },
      { id: 'dialogue', title: 'Read optional conversation', paragraphs: ['The report emphasizes character questlines and dialogue. It does not establish that every early flirt is a mandatory flag. Avoid restarting a long save based solely on an unsupported claim that you missed one perfect line.'] },
      { id: 'budget', title: 'Give a relationship room in your plan', paragraphs: ['Editorial method: reserve attention for the character you want to follow rather than collecting every available errand first. Add only known activities and read their time prompts; we have not assigned a fabricated total relationship cost.'] },
      { id: 'spoilers', title: 'Stop at the detail you actually need', paragraphs: ['If you only want to know whether a relationship is possible, the overview is enough. If you need an exact branch or epilogue condition, consult the original report deliberately. We do not label one partner canonical.'] },
    ], related: ['/guides/quest-order/', '/guides/completionist-route/', '/guides/choices/'], keywords: ['blood of dawnwalker romance options', 'Anca romance', 'Lacra'],
  }),
  article({
    slug: 'steam-deck', category: 'fixes', title: 'Steam Deck: compatibility is not verified here', description: 'Check current storefront compatibility and prepare a useful handheld test without relying on invented FPS figures.', kicker: 'Steam Deck · status check', indexable: false, verificationStatus: 'unverified',
    quickAnswer: 'This site has not verified Steam Deck compatibility or measured handheld performance. Check the current Steam compatibility panel before treating a desktop requirements list as a handheld recommendation.', sources: [steam],
    sections: [
      { id: 'status', title: 'Start with the current store status', paragraphs: ['Compatibility labels can change after game and platform updates. The source review for this MVP did not establish a verified badge, a supported Proton version or a stable frame-rate target.'] },
      { id: 'record', title: 'Record the handheld configuration', paragraphs: ['Editorial test checklist: record the SteamOS version, compatibility setting, power limit, resolution and in-game preset. Without those details, two performance reports may describe very different conditions.'] },
      { id: 'compare', title: 'Test more than a quiet opening scene', paragraphs: ['If you already have access, compare controls, small text readability, loading, suspend/resume and a demanding encounter. These are suggested checks, not results we have measured.'] },
      { id: 'scope', title: 'Wait for evidence before choosing a preset', paragraphs: ['We do not provide launch flags, a recommended Proton override or a claimed battery life without supporting tests. This status page is excluded from indexing until useful platform-specific evidence is available.'] },
    ], related: ['/fixes/best-settings/', '/guides/release-date/'], keywords: ['blood of dawnwalker Steam Deck'],
  }),
  article({
    slug: 'ps5', category: 'fixes', title: 'PS5: update status and performance evidence', description: 'Separate confirmed PS5 availability from unverified frame-rate, Pro enhancement and display-mode claims.', kicker: 'PlayStation · status check', indexable: false,
    quickAnswer: 'PS5 availability is confirmed. This site has no measured PS5 or PS5 Pro performance results, so it does not recommend an unverified graphics mode or promise a frame-rate target.', sources: [launch, hotfix],
    sections: [
      { id: 'version', title: 'Confirm the installed update', paragraphs: ['Check the version installed on your console before comparing reports. The official September 4 notice announces Hotfix 1.0.2 across the launch platforms; its existence alone is not proof that a particular performance issue is resolved.'] },
      { id: 'controls', title: 'Read controller issues precisely', paragraphs: ['The notice also lists a missing PS5-gamepad mapping option among known issues. It does not establish a tested solution here. Use the linked notice for subsequent developer updates.'] },
      { id: 'comparison', title: 'Keep a useful console comparison', paragraphs: ['Editorial protocol: record the console model, game version, display refresh rate and any graphics mode actually offered by the game. Repeat the same scene and describe what changed instead of borrowing PC settings advice.'] },
      { id: 'unknown', title: 'What still needs evidence', paragraphs: ['PS5 Pro enhancements, mode-specific resolution, frame-rate stability and VRR behavior have not been verified in this MVP. This page remains outside indexing until platform-specific tests or documentation support more concrete guidance.'] },
    ], related: ['/guides/release-date/', '/guides/beginner/'], keywords: ['blood of dawnwalker PS5', 'PS5 Pro performance'],
  }),
  article({
    slug: 'release-date', title: 'Release date, platforms and where to check updates', description: 'The publisher announced Dawnwalker’s launch on September 3, 2026 for PC, PS5 and Xbox Series X|S.', kicker: 'Release reference',
    quickAnswer: 'The publisher’s launch announcement is dated September 3, 2026. The Blood of Dawnwalker is available for PC, PlayStation 5 and Xbox Series X|S.', sources: [launch, steam, hotfix],
    sections: [
      { id: 'released', title: 'The game is released', paragraphs: ['Rebel Wolves developed the open-world action RPG, with Bandai Namco publishing. This site uses the publisher’s dated launch announcement rather than treating old reveal pages as current availability notices.'] },
      { id: 'dates', title: 'Why a store may show another date', paragraphs: ['Steam displays September 2 while the publisher announcement is dated September 3. We have not verified a universal unlock-time explanation. Check the storefront for your region rather than interpreting those dates as a fresh delay.'] },
      { id: 'patch', title: 'Track your installed version separately', paragraphs: ['An official Hotfix 1.0.2 notice followed on September 4. A release date does not establish which patch your installation has, and a patch announcement does not prove that our guides were retested on it.'] },
      { id: 'check', title: 'A useful setup check', paragraphs: ['Editorial checklist: confirm the purchased platform, compare PC requirements if relevant, finish the available update and record the version shown by your installation. Consult the original store for current editions, pricing and regional availability.'] },
    ], related: ['/guides/beginner/', '/fixes/best-settings/', '/fixes/stuttering/'], keywords: ['the blood of dawnwalker release date', 'PS5', 'Xbox Series X S', 'PC'],
  }),
];
