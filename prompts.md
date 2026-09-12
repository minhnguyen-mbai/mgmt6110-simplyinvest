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
