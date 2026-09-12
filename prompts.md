# Prompt Log

**Name:** Nguyen Tran Nhat Minh
**Course:** MGMT6110 Human-AI Collaboration
**Problem Set 2:** SimplyInvest

## Prompt 1

### Prompt

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


## Prompt 2

### Prompt

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

### Action: 

I kept the overall structure because the core task was understandable quickly. I identified remaining terminology and mobile-layout issues for the next iterations.


### What changed next and why:

I decided to simplify necessary financial terminology rather than remove it, because the user still needs to understand what a share price and currency conversion mean.

##Prompt 3

### Prompt

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


## Prompt 4

### Prompt

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


## Prompt 5

### Prompt

Perform a final front-end QA review of the current SimplyInvest prototype before I connect it to a real market-data API.

Do not redesign the application.
Do not add new features.
Do not change the mock calculation logic.
Do not connect any external API yet.

Keep the existing three-screen flow:

1. Investment
2. Review
3. Success

GOAL

Confirm that the current prototype is ready for backend integration and that a complete beginner can understand and complete the simulation without financial-market knowledge.

CHECK THE FULL USER FLOW

1. The user enters an SGD amount.
2. The user chooses Apple, Microsoft, or NVIDIA.
3. The user sees approximately how many shares that amount could represent.
4. The user can understand why currency conversion is needed.
5. The user opens the Review screen.
6. The user can see the SGD amount, selected company, currency conversion, stock price, and estimated shares.
7. The user confirms the simulation.
8. The Success screen clearly states that no real money was invested.
9. The user can start another simulation.

REVIEW THESE CRITERIA

A. PURPOSE CLARITY

A first-time visitor should understand within a few seconds that SimplyInvest is an educational investment simulation.

The product should answer one simple question:

"If I invest this amount in this company, approximately how many shares could that represent?"

B. BEGINNER LANGUAGE

The user should not need to understand professional trading terminology.

Do not use unnecessary terms such as:

- market order
- position
- execution
- bid
- ask
- quote asset
- base asset
- order book
- P&L

Necessary concepts such as:
- shares
- stock price
- stock symbol
- currency conversion

should be explained briefly in plain language where needed.

C. PRODUCT SCOPE

Confirm that no unnecessary features have been added.

There should be no:

- stock charts
- news
- portfolio tracking
- watchlists
- stock recommendations
- ratings
- risk scores
- buy/sell orders
- brokerage connections
- social features
- account balances
- crypto
- additional screens

D. SIMULATION CLARITY

The user must never believe that SimplyInvest is executing a real investment.

Confirm that:

- the prototype is clearly labelled as an educational simulation,
- the current market data is clearly identified as mock data,
- the confirmation CTA says "Confirm simulation",
- the Success screen explicitly states that no real money was invested,
- no wording implies that shares were actually purchased.

E. VISUAL HIERARCHY

On the Investment screen, the strongest answer should be:

"You could own approximately X shares"

The entered amount and selected company should clearly connect to that result.

Currency conversion and stock price should remain visible but secondary.

On the Review screen, information should appear in this logical order:

1. SGD amount
2. Selected company
3. Currency conversion
4. Stock price
5. Estimated shares

On the Success screen, the simulated ownership result should remain the visual focus.

F. MOBILE USABILITY

Check all three screens at approximately 390px width.

Confirm:

- no horizontal scrolling,
- no clipped text,
- no overlapping elements,
- no number overflow,
- quick amount buttons wrap cleanly,
- company choices remain easy to select,
- primary buttons are easy to tap,
- the Review screen works as a vertical layout,
- the Success result card fits comfortably,
- no zooming is required.

G. FUNCTIONAL QA

Check that:

- changing the investment amount updates the calculation,
- quick amount buttons work,
- selecting another company updates the result,
- Review displays the correct selected values,
- Change inputs returns to the Investment screen,
- Confirm simulation goes to Success,
- Start another simulation resets or restarts the flow correctly,
- no button is broken,
- no value displays undefined, NaN, null, or an obviously invalid number.

OUTPUT

Fix only issues that fail one of the checks above.

Do not make stylistic changes just for variety.

Do not add anything new.

After making the fixes, summarize:

1. Which issues you found.
2. Which issues you changed.
3. Which parts already passed and were left unchanged.
4. Any remaining limitation that should be addressed when real API data is connected.

--- 

## Manual Check — Verify Alpha Vantage Response

Before asking the agent to build the back end, I called the Alpha Vantage
endpoints manually.

I verified that:

- SGD to USD exchange rate is under:
  `Realtime Currency Exchange Rate → 5. Exchange Rate`

- FX refresh time is under:
  `6. Last Refreshed`

- AAPL stock price is under:
  `Global Quote → 05. price`

- Stock price date is under:
  `07. latest trading day`

I did this before prompting because I did not want the agent to guess
the API response structure.

---

## Prompt 6

### Prompt

ROLE

You are a senior full-stack developer working in my existing SimplyInvest
React and TypeScript project.

Do not redesign the existing interface.
Do not rewrite the product.
Add a secure back end that replaces the current mock market-data values
with real external data from Alpha Vantage.

GOAL

SimplyInvest currently helps a complete beginner answer:

"If I invest this amount of SGD in this company,
approximately how many shares could that represent?"

The current front end uses mock:

1. SGD to USD exchange rate
2. stock price

Replace these two claims with real Alpha Vantage data while preserving
the existing three-screen user experience.

Create three serverless functions:

1. api/fx.js
2. api/quote.js
3. api/health.js


--------------------------------
1. API/FX.JS
--------------------------------

Fetch SGD to USD using Alpha Vantage:

function=CURRENCY_EXCHANGE_RATE
from_currency=SGD
to_currency=USD

Read the credential only from:

process.env.ALPHAVANTAGE_API_KEY

From the actual response, use:

"Realtime Currency Exchange Rate"
→ "5. Exchange Rate"
→ "6. Last Refreshed"
→ "7. Time Zone"

Return only normalized fields needed by the front end.

For example:

{
  "from": "SGD",
  "to": "USD",
  "rate": 0.78925131,
  "lastRefreshed": "2026-09-12 09:30:16",
  "timeZone": "UTC"
}

Convert numeric strings into JavaScript numbers before returning them.

Do not return bid price, ask price or other unused upstream fields.


--------------------------------
2. API/QUOTE.JS
--------------------------------

Accept only these stock symbols:

AAPL
MSFT
NVDA

Reject unsupported symbols with a clear 400 response.

Fetch Alpha Vantage GLOBAL_QUOTE for the selected symbol.

Read the credential only from:

process.env.ALPHAVANTAGE_API_KEY

From the actual response, use:

"Global Quote"
→ "01. symbol"
→ "05. price"
→ "07. latest trading day"

Return only normalized fields needed by the front end.

For example:

{
  "symbol": "AAPL",
  "priceUSD": 332.27,
  "latestTradingDay": "2026-09-11"
}

Convert the price from text into a JavaScript number.

Do not return:

- open
- high
- low
- volume
- previous close
- change
- change percent

SimplyInvest is an educational investment simulator,
not a trading terminal.


--------------------------------
3. API/HEALTH.JS
--------------------------------

Create:

/api/health

It should report:

- service name: SimplyInvest
- whether ALPHAVANTAGE_API_KEY is configured
- whether Alpha Vantage can be reached
- upstream HTTP status if available
- checkedAt timestamp

Never return:

- the credential
- any part of the credential
- credential length
- credential prefix


--------------------------------
FRONT-END INTEGRATION
--------------------------------

Replace the current mock exchange rate and mock stock price with calls to:

/api/fx

and:

/api/quote?symbol=AAPL

or MSFT / NVDA depending on the selected company.

Never call Alpha Vantage directly from browser code.

Calculate the simulated investment transparently:

USD value =
SGD investment amount × SGD-to-USD exchange rate

Estimated shares =
USD value ÷ latest available stock price

Example using the real response provided in CONTEXT:

S$1,000
× 0.78925131
=
US$789.25131

US$789.25131
÷ US$332.27
≈
2.375 AAPL shares

Round values only for display.
Keep sufficient precision internally for the calculation.


--------------------------------
PRODUCT WORDING
--------------------------------

Replace any current "Mock Market Data" wording now that external data is used.

Keep the product clearly labelled as:

"Educational Simulation"

Clearly state:

"No real money is invested."

For stock data, use:

"Latest available price"

Do not use:

"Live price"
"Real-time stock price"

For FX data, show the exchange rate and its last-refreshed information
in a simple beginner-friendly way.

Keep explanations short.

Do not introduce financial jargon.


--------------------------------
FAILURE STATES
--------------------------------

The front end must distinguish these four situations:

LOADING

"Getting the latest available market data..."

EMPTY DATA

"We could not find market data for this company."

PROVIDER REFUSED OR RETURNED AN ERROR

"The market data provider could not complete this request."

PROVIDER UNREACHABLE

"We cannot reach the market data service right now. Please try again later."

Do not use one generic spinner or one generic error for all situations.

Never display:

undefined
NaN
null
raw provider error messages


--------------------------------
SERVER-SIDE SAFETY
--------------------------------

Before each Alpha Vantage request:

Check:

process.env.ALPHAVANTAGE_API_KEY

If it is missing or empty:

- return HTTP 503
- name ALPHAVANTAGE_API_KEY as the missing variable
- do not call Alpha Vantage

After each upstream request:

- check response.ok before assuming the request succeeded
- inspect the JSON body before assuming it contains valid market data

Alpha Vantage may return an HTTP success response containing a provider
message instead of the expected market-data structure.

Detect cases where the expected response object is missing.

Do not let an invalid provider response become:

undefined
NaN
or a misleading investment result.


--------------------------------
CACHING
--------------------------------

Add Cache-Control headers so SimplyInvest does not call Alpha Vantage
for every amount change or page view.

The user's investment amount should be calculated locally from the
already-fetched rate and stock price.

Do not fetch new market data every time the user changes S$1,000 to S$2,000.

Use a reasonable cache for:

- FX data
- stock quote data

Keep the implementation simple and explain the cache duration you chose.


--------------------------------
OUTPUT
--------------------------------

Create:

api/fx.js
api/quote.js
api/health.js

The api folder must be at the PROJECT ROOT,
beside package.json.

Correct:

project/
  api/
    fx.js
    quote.js
    health.js
  src/
  package.json

Incorrect:

project/
  src/
    api/

Make sure package.json contains:

"type": "module"

Preserve:

- Investment screen
- Review screen
- Success screen
- current mobile responsiveness
- existing beginner-friendly visual design


--------------------------------
GUARDRAILS
--------------------------------

Never write ALPHAVANTAGE_API_KEY into any file.

Never create:

VITE_ALPHAVANTAGE_API_KEY

Never expose the credential in:

- browser code
- response
- log
- README
- comment

Do not add:

- database
- login
- brokerage
- real transaction
- portfolio
- charts
- news
- watchlists
- recommendations
- buy/sell functionality
- crypto
- additional screens

Do not redesign SimplyInvest.

Do not add new npm packages unless absolutely necessary.

Keep the scope focused on the existing beginner investment simulation.


--------------------------------
CONTEXT — REAL API RESPONSES
--------------------------------

REAL SGD → USD RESPONSE:

{
  "Realtime Currency Exchange Rate": {
    "1. From_Currency Code": "SGD",
    "2. From_Currency Name": "Singapore Dollar",
    "3. To_Currency Code": "USD",
    "4. To_Currency Name": "United States Dollar",
    "5. Exchange Rate": "0.78925131",
    "6. Last Refreshed": "2026-09-12 09:30:16",
    "7. Time Zone": "UTC",
    "8. Bid Price": "0.78924689",
    "9. Ask Price": "0.78925964"
  }
}

REAL AAPL GLOBAL_QUOTE RESPONSE:

{
  "Global Quote": {
    "01. symbol": "AAPL",
    "02. open": "327.4500",
    "03. high": "336.2200",
    "04. low": "326.3000",
    "05. price": "332.2700",
    "06. volume": "50716865",
    "07. latest trading day": "2026-09-11",
    "08. previous close": "326.5700",
    "09. change": "5.7000",
    "10. change percent": "1.7454%"
  }
}


## Promt 7

### Prompt

Review only api/fx.js.

Do not redesign the application.
Do not change any other file unless required for compatibility.

The endpoint is mostly correct, but fix these two data-integrity issues.

1. DO NOT SILENTLY SERVE STALE CACHE ON PROVIDER FAILURE

Currently, when Alpha Vantage returns Note/Information or when the fetch
throws an error, the endpoint may return cachedFx with HTTP 200.

Remove this silent fallback behavior.

If Alpha Vantage refuses or rate-limits the request, return the existing
provider-error response.

If Alpha Vantage is unreachable, return the existing
PROVIDER_UNREACHABLE response.

A cached response may only be returned through the normal cache path while
it is still within the intended cache freshness period.

Do not make stale market data look like a successful fresh response.

2. DO NOT INVENT PROVIDER TIMESTAMPS

Currently, lastRefreshed falls back to the server's current time when the
provider field is missing.

Do not do this.

Use only the provider's actual value:

lastRefreshed: rawRateObj['6. Last Refreshed'] || null

Also use:

timeZone: rawRateObj['7. Time Zone'] || null

If the provider does not return freshness metadata, preserve null rather
than creating a timestamp.

GUARDRAILS

Keep:
- process.env.ALPHAVANTAGE_API_KEY
- current normalized response structure
- numeric parsing and validation
- response.ok check
- provider-message detection
- timeout handling
- existing cache duration
- Cache-Control headers

Do not expose the API key.
Do not add packages.
Do not change the front-end design.
Do not modify quote.js or health.js in this task.

After the change, briefly state exactly what changed and why.
