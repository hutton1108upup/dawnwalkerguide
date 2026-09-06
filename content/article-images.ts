import type { ArticleImage } from './types';

const recap = {
  title: 'Rebel Wolves / Bandai Namco — official gameplay reveal, June 2025',
  url: 'https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-gameplay-reveal-recap',
};

// Images are editorial illustrations, not retail tests. Preserve the original preview marks.
// Source URLs and keyword-to-section rationale are recorded beside each img data record.
export const articleImages = {
  // /guides/time-limit/#what-spends-time | keyword: blood of dawnwalker time limit.
  // Noon HUD includes the remaining family deadline; this is not a quest-cost tooltip.
  // Original: https://static.bandainamcoent.eu/high/dawnwalker/the-blood-of-dawnwalker/02-news/DAWNWALKER-LivestreamEventRecap/03%20Enter%20Svartrau.jpg
  timeDay: {
    src: '/images/dawnwalker-time-limit-daytime-hud.webp', width: 1280, height: 720,
    alt: 'Coen at Svartrau’s gate in The Blood of Dawnwalker, with the noon phase and remaining family deadline in the HUD',
    caption: 'Daytime HUD from the official pre-beta demonstration. The visible deadline is that demonstration’s progress, not a recommended schedule or a task’s time cost.',
    source: recap, spoiler: 'light',
  },
  // /guides/time-limit/#segments | keyword: dawnwalker day and night segments.
  // Shows Moonrise and the campaign HUD; does not prove an eight-segment retail budget.
  // Original: https://static.bandainamcoent.eu/high/dawnwalker/the-blood-of-dawnwalker/02-news/DAWNWALKER-LivestreamEventRecap/05%20Vampire%20POV.jpg
  timeNight: {
    src: '/images/dawnwalker-day-night-moonrise-hud.webp', width: 1280, height: 720,
    alt: 'Coen overlooking Svartrau at moonrise in The Blood of Dawnwalker, with the night phase shown in the HUD',
    caption: 'Moonrise in the official pre-beta demonstration illustrates the phase change. Read the source-backed segment explanation above separately from this older interface.',
    source: recap, spoiler: 'light',
  },
  // /guides/beginner/#forms | keyword: blood of dawnwalker beginner guide; gameplay.
  // A daytime approach to the cathedral illustrates checking routes before changing form.
  // Original: https://static.bandainamcoent.eu/high/dawnwalker/the-blood-of-dawnwalker/02-news/DAWNWALKER-LivestreamEventRecap/09%20Transversal.jpg
  beginner: {
    src: '/images/dawnwalker-beginner-daytime-exploration.webp', width: 1280, height: 720,
    alt: 'Coen exploring the cathedral square among townspeople during the day in The Blood of Dawnwalker',
    caption: 'Daytime exploration in the official pre-beta footage. The reveal uses the cathedral to introduce how available approaches can differ between day and night.',
    source: recap,
  },
  // /guides/combat/#controls | keyword: blood of dawnwalker combat.
  // Actual sword encounter, not a controller settings screenshot or damage benchmark.
  // Original: https://static.bandainamcoent.eu/high/dawnwalker/the-blood-of-dawnwalker/02-news/DAWNWALKER-LivestreamEventRecap/10%20Combat.jpg
  combat: {
    src: '/images/dawnwalker-combat-sword-encounter.webp', width: 1280, height: 720,
    alt: 'Coen facing a sword-wielding opponent on a wooded path in The Blood of Dawnwalker',
    caption: 'A daytime sword encounter from the official pre-beta reveal, illustrating the close-range combat discussed here. It does not demonstrate a particular retail control preset.',
    source: recap,
  },
  // /guides/combat/#builds | keyword: dawnwalker combat; equipment.
  // The Chopper inventory tooltip illustrates equipment inspection, not a best-build claim.
  // Original: https://static.bandainamcoent.eu/high/dawnwalker/the-blood-of-dawnwalker/02-news/DAWNWALKER-LivestreamEventRecap/02%20Inventory.jpg
  equipment: {
    src: '/images/dawnwalker-combat-weapon-inventory.webp', width: 1280, height: 720,
    alt: 'The Blood of Dawnwalker inventory showing Coen’s equipment slots and The Chopper weapon tooltip',
    caption: 'Equipment inspection in the official pre-beta build. The displayed weapon values are preview material, not current statistics or a recommendation for the best weapon.',
    source: recap,
  },
  // /guides/release-date/#released | keyword: the blood of dawnwalker release date.
  // Official launch-announcement artwork provides release context, not gameplay evidence.
  // Original: https://static.bandainamcoent.eu/high/dawnwalker/the-blood-of-dawnwalker/02-news/DW_launch_trailer_thumbnail.jpg
  release: {
    src: '/images/dawnwalker-release-launch-trailer.webp', width: 1280, height: 720,
    alt: 'The Blood of Dawnwalker launch trailer artwork featuring Coen and a vampire beside the game title',
    caption: 'Official launch-trailer artwork accompanying the publisher’s September 3, 2026 release announcement. Promotional artwork, not a gameplay screenshot.',
    source: { title: 'Rebel Wolves / Bandai Namco — official launch announcement', url: 'https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-now-available-pc-playstation-5-and-xbox-series-xs' },
  },
} satisfies Record<string, ArticleImage>;
