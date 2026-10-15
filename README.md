# IxDF Pakistan website

React + Vite + React Router. Design direction: dark navy / violet eclipse hero with teal and amber accents,
GITEX-inspired structure (oversized headlines with rotated pill tags, stats band, marquees, quote cards,
summit panel, social rail).

## Run

    npm install
    npm run dev       # http://localhost:5173
    npm run build     # production build in dist/
    npm run preview

## Structure

- `src/data/data.js`   all content (events, chapters, universities, partners, team, news). **Placeholder content: replace before launch.**
- `src/pages/`         Home, Events (+detail), Chapters (+detail), Universities, Partners, News (+article), Team, Join
- `src/components/`    Layout, HeroCanvas (moving eclipse), Skyline, ChapterMap, SplitText/Blobs/TextStrip (Bits.jsx)
- `src/styles/global.css`  design tokens and all styles
- `reference/`         GITEX screenshots and the hero mockup used as visual direction

Forms (join / collaborate / sponsor / event registration / campus request / newsletter) show a confirmation only.
Connect `LeadForm`'s `onSubmit` in `src/components/Bits.jsx` to a backend or form service.

For static hosting, configure a fallback to `index.html` so deep links like `/events/...` work.

## Images

Photos and gradient backgrounds in public/img/ come from Unsplash (free licence, see public/img/CREDITS.md).
They are mapped in src/data/images.js, and per event / news / chapter via the img / photo fields in src/data/data.js.
Replace the stock photos with real IxDF Pakistan event photography when you have it.

