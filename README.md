# FlowPilot Landing Page

A responsive, single-page marketing landing page for FlowPilot, built for the Claude AI-Assisted Frontend Assessment. It is frontend only: there is no backend or API, and the contact form only simulates a submit.

All sections from the brief are implemented: header with mobile menu, hero, trusted companies, features, interactive tabs, testimonials slider, pricing, contact form and footer.

## Technology

| Purpose | Tool |
| --- | --- |
| UI | React 19 |
| Language | TypeScript 6.0 (pinned below 6.1 because typescript-eslint does not yet support TypeScript 7) |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Forms | React Hook Form |
| Build / dev server | Vite |
| Testing | Vitest, jsdom, React Testing Library, `jest-dom`, `user-event` |
| Linting | ESLint (typescript-eslint, react-hooks, react-refresh) |
| Fonts | Inter and Plus Jakarta Sans, loaded from Google Fonts in `index.html` |

## Setup

Requires Node.js 20 or newer (developed on Node 22).

```bash
npm install
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint with ESLint |

## Project structure

```
src/
  components/   One folder per component: Name/Name.tsx, Name/Name.test.tsx and an index.ts that
                re-exports it, so other files import it as ../Name
  data/         Typed content for each section (copy, plans, tabs, testimonials, ...)
  styles/
    palette.css Colour palette and shadows as Tailwind @theme tokens
  assets/icons/ SVGs exported from Figma
  test/
    setup.ts    jest-dom matchers and automatic cleanup
  App.tsx       Page composition
  index.css     Tailwind entry, fonts, animations
  main.tsx      App entry point
```

### Component structure

| Section | Components | Data |
| --- | --- | --- |
| Header | `Header`, `MobileMenu`, `Logo` | `navigation.ts` |
| Hero | `Hero`, `DashboardMockup`, `Button` | `hero.ts` |
| Trusted companies | `TrustedCompanies` | `trustedCompanies.ts` |
| Features | `Features`, `FeatureCard` | `features.ts` |
| Interactive tabs | `FeatureTabs` | `featureTabs.ts` |
| Testimonials | `TestimonialSlider` | `testimonials.ts` |
| Pricing | `Pricing`, `PricingCard` | `pricing.ts` |
| Contact | `Contact`, `ContactForm`, `FormField` | `contact.ts` |
| Footer | `Footer`, `Logo` | `footer.ts` |

`Container` is the shared page wrapper (centred, max 90rem, side gutters of 1.25rem, 2rem from `sm` and 4rem from `lg`) used by every section. `Button` is shared by the hero and pricing cards.

Section content is data-driven: tabs, testimonials, pricing plans, features and form options are all read from `src/data/`, so there is no duplicated section markup.

## Responsive behaviour

The reference widths are mobile 375px, tablet 768px and desktop 1440px, and every component is checked down to 320px. Figma provides mobile frames only for some sections; the rest, and the whole tablet range, are my own decisions.

| Breakpoint | What changes |
| --- | --- |
| `lg` (1024px) | Desktop navigation replaces the hamburger menu; features go from 2 to 4 columns; pricing becomes a 3-column grid (below it the plans scroll sideways); footer becomes one row |
| `xl` (1280px) | Hero, interactive tabs, testimonials and contact switch to their two-column layouts; dashboard preview uses its full-size layout |
| `md` (768px) | Trusted companies stop being a marquee; contact form moves into a card; features use 2 columns |

The dashboard preview drops its sidebar when the preview itself is narrower than 20.9rem (a container query), so it never overflows on narrow screens.

## Accessibility

- Semantic landmarks and one `h1`, with `h2` per section and `h3` for cards.
- Mobile menu is a modal dialog: it moves focus in, traps Tab, closes on Escape or on link select, restores focus, and exposes `aria-expanded`.
- Tabs follow the ARIA tab pattern with roving focus, arrow/Home/End keys and one tab panel.
- Testimonials are marked up as a carousel with named slides in a persistent live region; the dots are focusable buttons and Left/Right arrows work inside the slider.
- The mobile logo marquee is focusable so keyboard users can pause it (it also pauses on hover and press).
- On a successful submit, focus moves to the success message so it is announced.
- Form fields have real labels, `aria-required`, `aria-invalid`, and error messages connected through `aria-describedby`.
- Visible focus outlines on all interactive elements; transitions and the marquee respect `prefers-reduced-motion`.

## Testing

Tests use Vitest with React Testing Library in a jsdom environment: 34 tests in 9 files, run with `npm test`.

| File | What it covers |
| --- | --- |
| `Header.test.tsx` | Mobile menu opens and closes, shows every link, closes on link select and Escape, restores focus, traps focus, closes when the viewport grows to desktop width |
| `Hero.test.tsx` | Headline, copy and trust notes, CTA targets, dashboard image |
| `TrustedCompanies.test.tsx` | Heading and company list |
| `Features.test.tsx` | Heading, four cards in order, `#features` target |
| `FeatureTabs.test.tsx` | One selected tab, content changes on click, arrow-key navigation, a single labelled tab panel |
| `TestimonialSlider.test.tsx` | Initial slide and indicator, next/previous with wrap-around, swipe, dot navigation, live region stays mounted |
| `Pricing.test.tsx` | Plans and prices, "Most Popular" and CTA links, monthly/yearly toggle |
| `ContactForm.test.tsx` | Empty form cannot submit, field rules (including whitespace-only message and a weak email), live character count, `200+` shows and requires Preferred Demo Time, field hides and stops blocking when team size changes, submitting state, repeat clicks ignored, success message, focus moves to the success message |
| `Footer.test.tsx` | Logo, copyright with current year, legal links |

## Key decisions

- **Palette tokens, no hardcoded colours.** All colours come from `src/styles/palette.css`, extracted from the Figma file (it has no variables, so values were read from the design). Tailwind v4 turns each token into utilities such as `text-ink` and `bg-surface`. The only colour not from Figma is `--color-error`, for validation messages.
- **rem everywhere.** Sizes, spacing, radii, shadows and letter spacing are written in rem (16px base), including arbitrary Tailwind values.
- **The page scales above 1440px.** Because everything is in rem, `index.css` sets the root font size to the larger of the browser default and 1/90 of the viewport width (exactly 16px at 1440px). Zooming the browser out (for example to 25%) or opening the page on a very wide screen scales the whole page up, so it looks as it does at 100% on a 1440px screen instead of shrinking into a narrow column. Below 1440px nothing changes. On a 1920px screen at 100% zoom the page is therefore about a third larger than the design.
- **Shared `Container`.** One wrapper gives every section the same gutters instead of per-section padding.
- **Data-driven sections.** Content is typed data in `src/data/`, which keeps components small and makes adding a tab, plan or testimonial a data-only change.
- **Forms with React Hook Form.** `shouldUnregister: true` removes the Preferred Demo Time field from the values and from validation when team size is not `200+`. The submit is simulated with a one-second delay, the button is disabled while it runs, and repeat submits are ignored.
- **Mobile logo strip is a marquee.** Below 768px the company names scroll in a seamless loop; from 768px they are a static row. It stops for users who prefer reduced motion.
- **Testimonial controls differ by screen.** Arrows are desktop only, dots are mobile only, and the card can be swiped or dragged.
- **Tablet and 320px are designed, not stretched.** Breakpoints were chosen from where content stops fitting (for example the desktop nav needs 1024px, the hero columns need 1280px), not from fixed device widths.
- **Follow the Figma over the brief where they differ.** The footer has only the logo, copyright and legal links, because the design shows nothing else.
- **ESLint instead of oxlint**, with TypeScript pinned to 6.0 so the toolchain installs without `--legacy-peer-deps`.

## Known limitations

- **How it was tested.** Besides the 34 unit tests, a scripted run in headless Edge (driven over the DevTools protocol, emulating 320px, 375px, 768px and 1440px with touch) clicked through the mobile menu, tabs, pricing toggle, testimonial swipe, marquee and the contact form, and checked for horizontal overflow and console warnings. All 33 checks passed. Layouts were compared with screenshots, and I also tested the page manually myself. The scripted browser run is not part of the repository.
- **Placeholder content where the design is silent.** Only the first testimonial (Jessica Lee) and the Plan tab are in the design. The other two testimonials, the Automate and Collaborate tab copy, and all yearly prices (ten times monthly) are invented.
- **Pricing bar on the Plan tab** is filled to about two thirds while its label says 40%, copied from the design.
- **Placeholder links.** Log In, Privacy, Terms and Security have no pages yet, so they all link to the top of the page. "FAQ" in the navigation goes to the contact form because there is no FAQ section.
- **No real submit.** The contact form never sends data anywhere.
- **No tablet frames in Figma.** The 768px layouts are my interpretation.
- **Mobile Figma frames for some sections were loose exports.** I read the intent (for example the pricing carousel and the clipped third workflow tab) rather than copying positions exactly.
- **Fonts need network access** (Google Fonts); without it the page falls back to system fonts.
- **Testimonial arrows are desktop only.** Below 1280px the slider is controlled by dots, swipe/drag and the keyboard (by design, to match the mobile frames).
- **Icon colours are baked into the downloaded SVGs** (they are images), so they cannot use the palette tokens.
- **Mobile pricing order** puts Pro first using CSS `order`, so the visual order differs from the DOM order below 1024px.
