# DesignCode

**Design it. Code it. Ship it.**

Practice object-oriented design with real production scenarios. 100+ curated problems from companies like SpaceX, Stripe, and Meta.

## 🚀 Live Demo

[https://designcode-xxx.vercel.app](https://designcode-xxx.vercel.app) _(replace with your actual URL)_

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Supabase (Postgres + Auth)
- **Execution:** Piston API (Python & JavaScript)
- **Hosting:** Vercel

## Execution Engine

Currently using **Piston** - a free, open-source code execution engine.

- **Public Instance:** https://emkc.org/api/v2/piston
- **Cost:** $0 (truly free, unlimited)
- **Supported Languages:** Python, JavaScript, and 40+ more

For production scale (1000+ users), we'll migrate to self-hosted Judge0 on Railway (~$5/month for unlimited execution).

## Local Development

1. Clone the repository:
```bash
   git clone https://github.com/YOUR_USERNAME/designcode.git
   cd designcode
```

2. Install dependencies:
```bash
   npm install
```

3. Copy `.env.example` to `.env.local` and fill in your credentials:
```bash
   cp .env.example .env.local
```

4. Get your Supabase credentials:
   - Create project at [supabase.com](https://supabase.com)
   - Copy Project URL and anon key to `.env.local`

5. Run the development server:
```bash
   npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Required variables (see `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/publishable key

## Project Structure
```
designcode/
├── app/
│   ├── api/
│   │   ├── execute/         # Piston code execution
│   │   └── test-supabase/   # Supabase connection test
│   ├── layout.tsx
│   └── page.tsx             # Homepage with tests
├── lib/
│   └── supabase/            # Supabase client utilities
├── .env.local               # Your secrets (gitignored)
├── .env.example             # Template
└── README.md
```

## Roadmap

- [x] **Sprint 0:** Foundation & Infrastructure ✅
- [ ] **Sprint 1:** Ugly MVP (5 problems)
- [ ] **Sprint 2:** Platform Features (Auth, Dashboard)
- [ ] **Sprint 3:** Polish + Content (15 problems)
- [ ] **Sprint 4:** Scale Content (30 problems)
- [ ] **Sprint 5:** Scale to 100 + Harden
- [ ] **Sprint 6:** Launch

## Supported Languages

- Python 3.8+
- JavaScript (Node.js)

## Cost Structure

**Current (Sprint 0-3):**
- Vercel: $0 (Free tier)
- Supabase: $0 (Free tier)
- Piston: $0 (Public instance)
- **Total: $0/month**

**At Scale (1000+ users):**
- Judge0 self-hosted: $5/month (Railway)
- Supabase Pro: $25/month
- Vercel: $20/month
- **Total: $50/month**

### Current Project Structure

```
designcode/
├── app/
│   ├── api/
│   │   ├── execute/
│   │   │   └── route.ts        # Piston execution
│   │   └── test-supabase/
│   │       └── route.ts        # Supabase test
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx                # Test page
├── lib/
│   └── supabase/
│       ├── client.ts           # Browser client
│       └── server.ts           # Server client
├── .env.local                  # Your secrets (gitignored)
├── .env.example                # Template
├── .gitignore
├── README.md
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```