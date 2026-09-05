# SEO content and media implementation

Approved scope: the September 6 content audit and the user's authorization to implement, verify locally, push main, and deploy to Cloudflare. Keep the existing design and browser-local tools.

1. Recheck official mechanics, official video/image provenance, and named playthrough sources. Record claim scope and media credits in docs/seo-evidence.md.
2. Extend content/types.ts and ArticleView with ordered steps, section citations, related reading, FAQ, and attributed images. Add a click-to-load YouTube component with an external fallback and no requests to YouTube before activation.
3. Improve the time, quest-order, medicine, choice and stuttering answers; improve beginner/missable coverage without inventing a full route. Keep incomplete content noindex. Remove self links and give choice titles identifiable subjects.
4. Verify evidence-sensitive data and media behavior with targeted tests, then run all existing tests, typecheck, production build and desktop/mobile browser QA. Inspect screenshots and console output.
5. Determine the configured Cloudflare target/account before mutation. Prefer static export if the complete route set can be preserved, since all current functionality is build-time content or browser-local state. Validate exported routes, PNG MIME types, RSS, sitemap and 404 behavior.
6. Selectively commit the reviewed changes, push the exact commit to origin/main, deploy that build, and verify the platform URL. Treat the existing game-name domain guideline conflict as a separate release decision.

Acceptance: useful direct answers; traceable and qualified claims; no hidden-spoiler regression; media provenance and privacy disclosure; no missing routes or mobile overflow; exact Git/deployment evidence. No subagents or external messages.
