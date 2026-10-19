# AI-USAGE.md

How Claude (Claude Code, Sonnet 5.5) was used to build the FlowPilot landing page. Everything below describes what actually happened in the build session, except the three role prompts, which are the starting prompts for the roles (see section 1).

## Workflow in short

1. Gave Claude the assessment brief and had it set up the project (Vite, React, TypeScript, Tailwind, React Hook Form, Testing Library, ESLint).
2. Built the page one section at a time: for each, I sent the Figma desktop and mobile links, Claude pulled the design through the Figma MCP, implemented it, ran tests, lint and the build, and checked screenshots at several widths.
3. Reviewed the result myself in the browser and sent corrections (spacing, breakpoints, colours, behaviour), which Claude applied and re-verified.

## 1. Agents / roles

I used Claude in three roles. The role prompts below are the ones the roles started from. They were drafted with Claude's help and then adapted to the project as it went, so they are not solely my own wording.

### Project Planner

**Responsibility:** understand the requirements, review the Figma, break the work into sections and components, identify reuse, define the order of work and flag risks.

**Initial prompt:**

```
You are a senior frontend lead planning a build for a junior developer.
Project: FlowPilot marketing landing page. Stack: React, TypeScript, Tailwind CSS v4,
React Hook Form, React Testing Library. No backend. Time limit: 4 hours.

I will paste the requirements brief and describe the Figma frames
(1440px desktop; 375px mobile for header, open nav, hero and contact form).

Task: do NOT write code. Produce:
1. Your understanding of the requirements, and any ambiguities to confirm with me.
2. A component breakdown with props and reuse opportunities (avoid over-abstracting).
3. Responsive decisions needed at 375 / 768 / 1440 for sections with no mobile design.
4. An ordered build plan with time estimates, highest-risk items first.
5. Risks (form conditional logic, a11y of tabs/slider/menu, responsive layout).
```

In practice, I handed Claude the brief first and told it not to implement anything yet ("read it thoroughly... I will tell you one by one things"). It saved the requirements so later steps could be checked against them.

### Frontend Implementation Agent

**Responsibility:** React, TypeScript, Tailwind, responsive implementation, state, form validation, interaction logic and debugging, one section at a time.

**Initial prompt:**

```
You are a frontend engineer working in my existing project.
Context: Vite + React 19 + TypeScript + Tailwind v4 + React Hook Form. Tests use
Vitest + React Testing Library. Components live in src/components.
Existing conventions: <paste relevant files / conventions>.

Task: implement <ONE component/section> to match <Figma description>.
Requirements: <behaviour, responsive rules at 375/768/1440, a11y rules>.
Constraints: content driven by typed data, no duplicated markup, no new dependencies
without asking, keep it simple.
Output: the files to create/change, plus a short note on decisions and trade-offs.
```

In practice each section started with "Implement this component", the desktop Figma node and the mobile Figma node. The project rules I added along the way (palette tokens only, rem only, working down to 320px) were saved so they applied to every later section.

### Reviewer / QA Agent

**Responsibility:** independently review responsiveness, accessibility, React structure, TypeScript, validation, interactions, maintainability and obvious bugs after meaningful development.

**Initial prompt:**

```
You are an independent code reviewer and QA engineer. You did not write this code.
Review <files/section> against these requirements: <paste requirements>.
Check: responsive behaviour at 375/768/1440, accessibility (semantic HTML, heading order,
labels, focus, keyboard use, aria), React structure and state, TypeScript quality,
form validation and conditional logic, interaction edge cases, maintainability.
Output: a list of findings ranked by severity, each with file, the problem, a concrete
failure scenario, and a suggested fix. Do not rewrite the code. Say what you could not verify.
```

After the page was finished I ran this role as a separate, independent pass: a fresh Claude subagent that had not seen the build, given only the requirements, the project rules and read/run access (no edits). It ran the tests, lint and build (all clean) and read the code. It found no high-severity bugs, but reported five medium and about a dozen low issues. I had the medium issues fixed (except one, below) and most of the low ones:

- **Fixed (medium):** the mobile menu stayed open and locked scrolling if the window grew past the desktop breakpoint; the testimonial slide was not announced to screen readers because its live region was replaced on every change; focus was lost and the success message not announced after submitting; the logo marquee had no way to pause.
- **Fixed (low):** clipped focus outlines on the scrolling tab and pricing rows, a whitespace-only message and the email address a@b.c passing validation, centred reduced-motion marquee cutting off its first items, two tab panels sharing one tab, the mobile menu label hard-coded in a component, dead branches in the pricing toggle, and white not being a palette token.
- **Not changed (decided by me):** the testimonial arrows being hidden below 1280px. The reviewer flagged it as a deviation from the brief, but it is what I asked for, to follow the mobile design.
- **Left as known limitations:** Pro shown first on mobile pricing (focus order differs from visual order), colours baked into the downloaded SVG icons, and the placeholder Log In and legal links.

## 2. One strong prompt and why it worked

> Implement 1.09rem outside space both left and right sides all over page all components as mcp nodes doesn't include this. for example dashboard mockup component has grey background but after these spacing white background color of page visible at sides.

Why it worked:

- It gave an exact value (`1.09rem`) and an exact scope (both sides, whole page).
- It explained the reason (the Figma nodes don't include this spacing), so Claude knew it was a deliberate departure from the design and recorded it as such in a code comment.
- It gave one concrete, checkable example of the expected result (page background visible at the sides of a coloured section).
- Claude could implement it in a single place (one wrapper in `App.tsx`) and verify it from a screenshot, rather than touching every component.

(I later removed this spacing myself after measuring that the mobile design was made at 410px while the Figma node is 375px wide. See section 7.)

## 3. One weak prompt and the improved version

**Weak prompt:**

> There is a container on mobile design please implement it all over page.

**Why it was weak:** it did not say what the "container" is. It could have meant a max-width wrapper, side padding, a card, or a background box. Claude had to guess, and said so: it read it as the side-gutter wrapper.

**Improved prompt:**

> In the mobile frames, content sits 20px in from the screen edges inside a centred wrapper. Create one shared `Container` component with those gutters (1.25rem on mobile, 2rem from sm, 4rem from lg, max width 90rem) and use it in the header and every section, so spacing is consistent. Keep full-width section backgrounds.

(The guess happened to be right, and the result is the `Container` component. The improved version above is the rewrite I would send now: it names the thing, gives the values, the scope and the constraint.)

## 4. A Claude recommendation I rejected or modified

**Recommendation:** when building the footer, Claude added a one-line description under the logo and three social links (X, LinkedIn, GitHub). Its reasoning was that the brief's footer requirements list "short description" and "social links", even though neither Figma footer shows them.

**Why it was not suitable:** the Figma is the visual source of truth, and neither the desktop nor the mobile footer contains those elements. The extra links also pointed to made-up destinations (the sites' homepages) because there are no real FlowPilot accounts.

**What I did instead:** I asked Claude to remove all of it. The footer now has only the logo, copyright and the Privacy, Terms and Security links, exactly as designed.

Other times I corrected Claude's choices:

- **Yearly pricing.** Following the brief's "monthly pricing at initial handoff", Claude disabled the Yearly toggle. I asked for it to work, so Claude enabled it and added yearly prices. Those prices (ten times monthly) are Claude's placeholders, listed as a known limitation in the README.
- **Linter.** The Vite template ships with oxlint. I asked for ESLint, and Claude found `typescript-eslint` would not install alongside TypeScript 7 (its peer range is `>=4.8.4 <6.1.0`), so it pinned TypeScript to 6.0 instead of forcing the install with `--legacy-peer-deps`.

## 5. Debugging example

**Problem.** The dashboard preview in the hero looked wrong at 375px, while the Figma frame at 375px looked fine.

- **Expected behaviour:** at 375px the dashboard looks like the mobile design: sidebar on the left, "Good morning, Sarah!" on one line, stat cards in a row, and "In Progress" fully visible at the end of the first task row.
- **Actual behaviour:** the greeting wrapped onto two lines, the stat labels were cramped, and "In Progress" was clipped at the right edge of the card.

**Investigation (evidence inspected).**

- Rendered the page in a 375px-wide iframe and took a screenshot (headless Edge will not go below about 500px, so a plain screenshot cannot show 375px or 320px).
- Compared the card's rendered width with the design. The preview was about 300px wide, but the Figma frame assumes 335px.
- Worked out why: at that point the page had an outer side margin of 1.09rem (35px in total) on top of the section's own 20px padding. 375 − 35 − 40 = 300px, so the 110px sidebar left too little room for the content column.
- Checked that 320px had the same fault for the same reason, only worse.

**Claude prompt.**

> FlowPilot dashboard ui is breaking in 375px but not breaking in 375px design. Fix it.

(I would add the measured widths next time, for example "the card is 300px but the design assumes 335px". Claude found them itself from the screenshot.)

**Fix.** Instead of hiding the sidebar at a fixed screen width, Claude made the preview wrapper a size container and hid the sidebar only when the preview itself is narrower than 20.9rem (335px), using a Tailwind container query. That way it stays correct whatever the page gutters are.

**Verification.**

- Screenshots in the 375px, 320px and 414px iframes after the fix: no clipped text at any width, sidebar present at 414px, hidden at 375px and 320px.
- Tests, lint and the production build all passed.
- After I removed the outer margin (section 7), I checked 375px again: the preview is back to 335px wide, the sidebar is visible, and the rest of the layout matches the Figma frame.

## 6. Where Claude helped most

- **Design to code through the Figma MCP.** Pulling each node's layout, text and assets, then converting it to Tailwind with the project's tokens, saved most of the time on the ten sections. Claude also noticed where the desktop and mobile frames used different copy or icons.
- **Verification loop.** After every section it ran the tests, lint and build and took screenshots at 1440, 768, 375 and 320px, which found real problems early (the 320px overflow, the "Most Popular" strip corners, the cut-off tab row).
- **Accessible interaction patterns.** The mobile menu focus trap, the ARIA tab pattern, the carousel markup, and form errors tied to fields with `aria-describedby`.
- **Real-browser check.** At the end Claude drove headless Edge over the DevTools protocol (emulating 320, 375, 768 and 1440px with touch) and ran 33 checks: no horizontal overflow, mobile menu behaviour, tabs, pricing toggle, a real touch swipe on the testimonials, the marquee moving and pausing, the whole contact form flow, and no console warnings. It caught one real problem (the marquee did not pause on focus, because only keyboard focus matched the CSS rule), which was fixed.
- **Tests.** Writing and fixing the 34 tests, including the form's timing behaviour with fake timers.
- **Mechanical refactors.** Converting the whole project from px to rem and moving every colour into the palette file, with a final search to confirm none were missed.

## 7. Decisions I made myself

- **Palette tokens only, no hardcoded colours.** I told Claude to pull the colours from the Figma page into one palette file and use variables everywhere.
- **rem only.** I asked for every pixel value, including arbitrary Tailwind values, to be converted to rem.
- **320px is a requirement for every component.** I set this after the dashboard broke at 320px, and asked Claude to remember it for all later sections.
- **Removing the outer page margin.** I had asked for a 1.09rem margin on both sides of the whole page. After comparing against the designs I removed it, because the mobile design was made at 410px while the Figma node is 375px wide, so the spacing came from the design's own canvas and not from the page.
- **Mobile behaviour of the logo strip and testimonials.** I chose a single-row looping marquee for the mobile logos instead of two rows, and I decided the testimonial controls should be dots on mobile (with swipe/drag) and arrows on desktop only.
- **Follow the design over the brief for the footer.** I removed the social links and description that Claude had added.
- **UI polish calls from my own review in the browser.** I asked for the pricing cards to stay the same height when one card has more content, for the "Most Popular" strip to follow the card's rounded corners, and for the mobile workflow tabs to scroll to the edge of their banner instead of being cropped inside its padding.
- **Yearly pricing works** even though the brief only requires monthly pricing at handoff.
- **Tooling:** ESLint instead of oxlint.
