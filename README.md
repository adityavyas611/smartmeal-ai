# SmartMeal AI

A production-ready AI micro-app that generates personalized daily cooking plans — breakfast, lunch, and dinner — with grocery lists, nutrition info, budget analysis, and ingredient substitutions.

## Features

- **Personalized meal planning** — Tailored to people count, dietary preference, allergies, cuisine, skill level, time, and weight goals
- **Full-day coverage** — Breakfast, lunch, and dinner with prep time, ingredients, instructions, cost, calories, and macros
- **Grocery list** — Consolidated shopping list with estimated costs
- **Ingredient substitutions** — Smart swaps (e.g., Milk → Almond Milk)
- **Budget feasibility** — Total cost vs. budget with status (Within / Slightly Over / Over) and cheaper alternatives
- **Auto-optimization** — Regenerates budget-friendly plans when over budget
- **Safety validation** — Dietary and allergy compliance checks
- **Dark mode** — System-aware theme with manual toggle
- **Accessible UI** — Semantic HTML, ARIA labels, keyboard navigation

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/) (Radix primitives)
- [Zod](https://zod.dev/) validation
- [OpenAI API](https://platform.openai.com/)

## Getting Started

### Prerequisites

- Node.js 20+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and add your OpenAI API key:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

> **Security:** Never commit `.env.local` or expose your API key client-side. The key is only used in the server-side API route.

Optional — override the default model (`gpt-4o-mini`):

```env
OPENAI_MODEL=gpt-4o
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Production build

```bash
npm run build
npm start
```

## Deployment

This app is a standard Next.js project and deploys to any platform that supports Node.js:

| Platform | Notes |
|----------|-------|
| **Vercel** | Connect repo, set `OPENAI_API_KEY` in Environment Variables |
| **Railway / Render / Fly.io** | Set env var, run `npm run build && npm start` |
| **Docker** | Use Node 20 Alpine, copy app, set `OPENAI_API_KEY` |

Environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key (server-side only) |
| `OPENAI_MODEL` | No | Model override (default: `gpt-4o-mini`) |

## Project Structure

```
src/
├── app/
│   ├── api/generate-meal-plan/   # API route (OpenAI integration)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # Shadcn UI primitives
│   ├── forms/                    # Preference form
│   ├── results/                  # Meal cards, grocery, budget
│   ├── states/                   # Loading, empty, error
│   ├── layout/                   # Header, theme toggle
│   └── providers/                # Theme provider
├── hooks/
│   └── use-meal-plan.ts          # Client-side meal plan hook
├── lib/
│   ├── utils.ts
│   └── validations/              # Zod schemas
├── services/
│   ├── ai/                       # Shared prompts & validation
│   └── openai/                   # OpenAI service layer
└── types/                        # TypeScript interfaces
```

## API

### `POST /api/generate-meal-plan`

**Request body:**

```json
{
  "preferences": {
    "numberOfPeople": 2,
    "dietaryPreference": "vegetarian",
    "allergies": ["peanuts"],
    "budget": 25,
    "cookingSkillLevel": "beginner",
    "availableCookingTime": 90,
    "pantryIngredients": ["rice", "lentils"],
    "cuisinePreference": "Indian",
    "weightGoal": "maintain-weight"
  },
  "optimizeForBudget": false
}
```

**Response:** `{ success: true, data: MealPlan }` or `{ success: false, error: string }`

## License

MIT
