# Prompt Log

**Name:** Nguyen Tran Nhat Minh
**Course:** MGMT6110 Human-AI Collaboration
**Problem Set 2:** SimplyInvest

# Prompt 1

ROLE

You are a senior product designer and front-end engineer specializing
in simple financial products for people with little or no investing experience.

GOAL

Build a minimalist educational investment simulator called SimplyInvest.

Tagline:

"Understand before you invest."

The user has little or no experience with financial markets.

The core job is:

Help the user understand what investing an amount of money into a stock
would approximately represent in shares.

The task is successful when the user can enter an amount, choose a company,
see the estimated number of shares, understand the basic numbers used,
and review the simulation.

OUTPUT

Build a responsive React and TypeScript front end with no more than
three screens:

1. Investment
2. Review
3. Success

SCREEN 1 — INVESTMENT

Show:

- "How much would you like to invest?"
- SGD amount input
- Three companies:
  Apple (AAPL)
  Microsoft (MSFT)
  NVIDIA (NVDA)

- Latest available stock price
- SGD to USD exchange rate
- "You could own approximately X shares"
- CTA: "See investment"

For this first version only, use clearly labelled MOCK market data.

SCREEN 2 — REVIEW

Clearly show:

- SGD amount
- selected company
- SGD to USD rate
- stock price in USD
- estimated shares

CTA:

"Confirm simulation"

SCREEN 3 — SUCCESS

Show the simulated result and clearly state:

"No real money was invested."

Allow the user to start another simulation.

GUARDRAILS

Do not build a real trading platform.
Do not execute real transactions.
Do not add login.
Do not add a database.
Do not add portfolio management.
Do not add charts.
Do not add stock news.
Do not add recommendations.
Do not tell the user whether a stock is a good or bad investment.
Do not add crypto.
Do not add order books, leverage, futures or advanced trading features.
Do not call an external API yet.
Do not create more than three screens.

Avoid financial jargon wherever possible.

Use everyday language such as:
- "How much would you like to invest?"
- "Choose a company"
- "You could own"
- "See investment"

instead of professional trading terminology.

CONTEXT

This is an educational simulation for MGMT6110.

The current version deliberately uses mock market data.
A later step will replace those claims with real external data
through a server-side API.


# Prompt 2

Review the current SimplyInvest interface only for first-time comprehension.

The target user has little or no investing experience.

The user should understand within five seconds:

1. this is an educational investment simulation,
2. they enter an amount of money,
3. they choose a company,
4. the product shows approximately how many shares that amount could represent.

Improve the wording and visual hierarchy only where necessary.

Keep:
- the existing three-screen flow,
- the current layout direction,
- the company choices,
- the simulation concept.

Do not add new features.
Do not add charts, news, portfolio features, recommendations, or educational lessons.

Prioritize one clear job per screen.

On Screen 1, make the main question and the result the two strongest visual elements.

Do not redesign the application if the current structure already supports this goal.

##Came back with:

A clearer hierarchy centred on the amount, company and estimated shares. The previous educational blocks were reduced, and the three screens became more focused on the simulation flow.

##Action: 

I kept the overall structure because the core task was understandable quickly. I identified remaining terminology and mobile-layout issues for the next iterations.


##What changed next and why:

I decided to simplify necessary financial terminology rather than remove it, because the user still needs to understand what a share price and currency conversion mean.

#Prompt 3

Review all wording in the current SimplyInvest interface for a user who has
never invested before.

Do not redesign the application.
Do not add new features.

Keep the existing three-screen flow:
1. Investment
2. Review
3. Success

GOAL

A complete beginner should understand the interface without knowing
professional financial or trading terminology.

Keep necessary concepts such as:
- shares
- stock price
- currency conversion
- stock symbol

but explain them briefly in everyday language when they first appear.

SPECIFIC CHANGES

1. Keep the company name as the primary label.
   Make the ticker symbol secondary.
   When a ticker first appears, clarify subtly that it is the company's
   stock-market symbol.

   Example:
   Apple
   AAPL · stock symbol

2. Where the SGD to USD rate appears, help the user understand why it matters.

   Prefer wording such as:

   "Currency conversion"
   "1 SGD = 0.75 USD"
   "US shares are priced in US dollars."

   Avoid technical language such as:
   base currency,
   quote currency,
   FX pair.

3. Replace any CTA wording that could be ambiguous.

   On Screen 1, use:
   "Review simulation"

   instead of:
   "See investment"

4. Keep:
   "You could own approximately X shares"

   because this is the product's main beginner-friendly answer.

5. Do not introduce terminology such as:
   market order,
   position,
   execution,
   bid,
   ask,
   order book,
   P&L.

6. Do not add a glossary, tooltip system, tutorial, modal, FAQ,
   or additional educational section.

7. Keep explanations short and inline at the moment they are needed.

GUARDRAILS

Do not change calculation logic.
Do not change the mock data.
Do not connect an API yet.
Do not add charts, news, portfolio features, recommendations, or trading tools.
Do not redesign the visual structure unless a small wording adjustment requires it.


# Prompt 4

Review and optimize the current SimplyInvest interface specifically for a mobile viewport of approximately 390px width.

Do not redesign the product.
Do not add new features.
Do not change the calculation logic or mock data.

Keep the existing three-screen flow:

1. Investment
2. Review
3. Success

GOAL

A complete beginner should be able to use SimplyInvest comfortably on a phone with one hand, without zooming or horizontal scrolling.

MOBILE REQUIREMENTS

Across all three screens:

- No horizontal scrolling.
- No clipped or overlapping text.
- No financial number should overflow its container.
- Primary buttons should be easy to tap.
- Keep comfortable spacing between interactive elements.
- Keep text readable without shrinking important information too much.
- Preserve the existing desktop experience.

SCREEN 1 — INVESTMENT

Optimize:

1. Investment amount input
   - Keep it easy to tap and edit.
   - Make SGD clearly visible.
   - Ensure large amounts do not overflow.

2. Quick amount choices
   - S$100
   - S$500
   - S$1,000
   - S$2,500
   - S$5,000

   Allow them to wrap naturally into multiple rows if necessary.
   Do not create horizontal scrolling.

3. Company selection
   - Apple
   - Microsoft
   - NVIDIA

   On mobile, adapt the cards so they remain easy to compare and select.
   Prefer a vertical stack or another simple responsive arrangement rather than squeezing three cards into one row.

   Keep:
   - company name as primary
   - stock symbol as secondary
   - stock price readable
   - selected state obvious

4. Estimated shares section
   - Keep "You could own approximately X shares" as the strongest visual result.
   - Keep the selected company clearly connected to the number.
   - Keep currency conversion and stock price secondary.

5. CTA
   - "Review simulation"
   - Make it full-width or appropriately prominent on mobile.
   - Keep it easy to reach and tap.

SCREEN 2 — REVIEW

Use a clear vertical mobile layout.

Keep the information in this order:

1. SGD amount
2. Selected company
3. Currency conversion
4. Stock price
5. Estimated shares

Make sure:
- labels remain close to the values they explain,
- long financial values do not overflow,
- estimated shares remains visually prominent,
- "Change inputs" and "Confirm simulation" are easy to use on mobile.

If two buttons do not fit comfortably side by side, stack them.

SCREEN 3 — SUCCESS

Keep:
- "Simulation complete"
- estimated shares as the primary result,
- clear statement that no real money was invested,
- "Start another simulation"

Make sure the result card and primary CTA fit comfortably on a 390px screen.

GUARDRAILS

Do not add:
- a mobile navigation menu,
- bottom navigation,
- charts,
- news,
- portfolio features,
- recommendations,
- additional screens,
- new educational sections.

Do not remove important beginner-friendly explanations.

Only make responsive layout, spacing, typography, wrapping and tap-target improvements required for mobile usability.
