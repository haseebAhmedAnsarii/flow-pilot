# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

FlowPilot: a frontend-only, single-page marketing landing page (React 19, TypeScript 6, Tailwind CSS v4, React Hook Form, Vitest + React Testing Library) built from a Figma file for a timed assessment. There is no backend; the contact form only simulates a submit. `README.md` and `AI-USAGE.md` are submission deliverables and must stay accurate (test counts, component tables, limitations, and the AI-usage record).

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # tsc -b && vite build (type-check + production build)
npm run lint         # ESLint (typescript-eslint, react-hooks, react-refresh)
npm test             # Vitest, single run
npm run test:watch   # Vitest watch mode
npx vitest run src/components/ContactForm/ContactForm.test.tsx   # one test file
npx vitest run -t "disables the button while submitting"      # one test by name
```

TypeScript is pinned to 6.0 because `typescript-eslint` does not yet support TypeScript 7; do not upgrade it without checking that.

## Architecture

- `src/App.tsx` just stacks `Header`, then `<main>` with one component per section, then `Footer`. Each section component owns its `<section id="...">`; the ids (`features`, `how-it-works`, `pricing`, `testimonials`, `contact`) must match the hrefs in `src/data/navigation.ts` and the CTA hrefs in the data files.
- **Content lives in `src/data/*.ts`** (typed arrays and strings: plans, tabs, testimonials, form options and limits, nav links). Components read from data rather than duplicating markup, so adding a tab, plan or testimonial is a data-only change.
- **`Container`** is the shared page wrapper (max 90rem, gutters 1.25rem / 2rem from `sm` / 4rem from `lg`). Every section, including the header, uses it. Full-width section backgrounds go on the `<section>`, content inside `Container`.
- **Design tokens:** all colours and shadows are `@theme` tokens in `src/styles/palette.css`, extracted from Figma (which has no variables). Use utilities such as `text-ink`, `bg-surface`, `border-border`, `shadow-card`. The one colour not from Figma is `--color-error`.
- Each component is a folder under `src/components/` (`Name/Name.tsx`, `Name/Name.test.tsx`, and an `index.ts` that re-exports it, so siblings import `../Name`). Tests live next to the component; `src/test/setup.ts` loads the `jest-dom` matchers and cleanup. jsdom has no `matchMedia`, so `src/hooks/useMediaQuery.ts` and the header's resize effect guard for it.

## Conventions the owner requires

- **rem only.** No px values anywhere in code, including Tailwind arbitrary values (`h-[2.625rem]`, `border-[0.0625rem]`, `outline-[0.125rem]`). Tailwind's built-in px utilities (`border`, `outline-2`) are replaced with rem arbitrary values. `index.css` sets the root font size to `max(100%, 1.1111vw)`, so above 1440px the whole page scales up (this is what keeps it looking the same when the browser is zoomed out). SVG assets exported from Figma have intrinsic px sizes, so give every `<img>` an explicit rem size.
- **No hardcoded colours.** Add a token to `palette.css` instead. Tailwind's `white` is also defined there.
- **Every component must work down to 320px** as well as the 375 / 768 / 1440 reference widths. Breakpoints used: `md` 768 (static logo row, card-style form), `lg` 1024 (desktop nav, 3-column pricing, footer row), `xl` 1280 (two-column hero, tabs, testimonials, contact). Tailwind breakpoints are in rem and relative to the browser default font size, not the scaled root.
- Where the Figma and the brief disagree, the owner follows the Figma (for example the footer has no social links or description).
- Figma frames are loose exports: the mobile node may be 375 wide although the design was made at 410, and some frames only exist for mobile or desktop. Tablet layouts are the developer's own decisions.

## Behaviour worth knowing before editing

- **Contact form** (`ContactForm.tsx`, React Hook Form): `shouldUnregister: true` is what makes the Preferred Demo Time field (shown only for team size `200+`) disappear from values and validation when the size changes. Submit is simulated with a delay from `data/contact.ts`; on success the form is replaced by a message that takes focus. Validation messages are tied to fields with `aria-describedby`.
- **Menu, tabs, slider:** mobile menu traps focus, closes on Escape, link select and when the viewport reaches `lg`. Tabs use roving tabindex with arrow/Home/End keys and a single tab panel. The testimonial slider keeps one persistent live region (only its contents swap), shows arrows from `xl` only and dots below it, and supports swipe/drag.
- **Logo marquee** (below `md`): the name list is rendered twice (the copy is `aria-hidden`) for a seamless loop; it is focusable so it can be paused, and it stops for `prefers-reduced-motion`.
- **Pricing:** plans store a price per billing period; yearly prices and the extra testimonials/tab copy are placeholders. Pro is shown first on mobile with CSS `order`, so DOM order differs from visual order below `lg`. Cards in a row stretch to equal height.

## Working in this repo

- Use the Figma MCP (`get_design_context`) for design-to-code, with the desktop and mobile node links the owner gives, then adapt to the project's tokens, rem units and data files rather than pasting generated code.
- Headless Edge cannot render narrower than about 500px. To check 320 or 375px, screenshot the page inside an iframe of that width, or drive Edge over the DevTools protocol with device-metrics emulation.
- On Windows the `Edit`/`Write` tools need the file read first, and shell here is Git Bash: avoid backticks and `${}` inside double-quoted `node -e` strings (they are expanded by the shell); write helper scripts to files instead.
