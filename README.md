# Equinox Environments  Monorepo

Two front-end apps for **Equinox Environments India Pvt Ltd** in one npm-workspaces monorepo:

| App | Path | Dev URL | What it is |
|---|---|---|---|
| **Website** | [`apps/web`](apps/web) | http://localhost:5173 | The public marketing site (React 19 + R3F + GSAP). |
| **Admin dashboard** | [`apps/dashboard`](apps/dashboard) | http://localhost:5174 | The content & enquiry management console. |

Both apps share one brand design system via [`packages/config`](packages/config), so they look and feel identical.

---

## 🗂️ Structure

```
Equinox/
├── package.json            # workspace root + scripts
├── packages/
│   └── config/             # shared Tailwind brand preset (colors, fonts, shadows, motion)
│       └── tailwind.preset.js
└── apps/
    ├── web/                # marketing website (moved here from the old root)
    │   ├── index.html
    │   ├── vite.config.js
    │   ├── tailwind.config.js   # → presets: [brandPreset]
    │   └── src/ …
    └── dashboard/          # admin dashboard (new)
        ├── index.html
        ├── vite.config.js       # dev server on :5174
        ├── tailwind.config.js   # → presets: [brandPreset]
        └── src/ …
```

---

## 🚀 Getting started

From the repo root:

```bash
npm install            # once — links the workspaces (web/dashboard/config)

npm run dev:web        # website   → http://localhost:5173
npm run dev:dashboard  # dashboard → http://localhost:5174

npm run build          # build both apps
npm run build:web
npm run build:dashboard
```

> Requires Node 18+. The two dev servers use different ports, so you can run both at once.

---

## 🖥️ The Dashboard (`apps/dashboard`)

A production-shaped admin console. **Frontend-only** for now — it runs on an in-memory
mock database with a service layer shaped exactly like a real REST API, so wiring a
backend later means editing one file.

**Features**
- 🔐 Login screen with a mock auth session (persisted in `localStorage`)
- 📊 Overview with KPI tiles + hand-built SVG charts (area / bar / donut, no chart lib)
- 📦 Full CRUD for **Products, Services, Events, Gallery, Clients, Team**
- 📨 **Enquiries** inbox — detail view, status workflow (new → in progress → resolved), priority
- ⚙️ **Settings** — company profile + notification preferences
- 🍞 Toasts, confirm dialogs, optimistic delete, search + filters, responsive sidebar

**Demo login** — pre-filled on the sign-in screen:
`admin@equinoxenvi.com` / `equinox`

### Where things live

```
apps/dashboard/src/
├── main.jsx / App.jsx        # entry + routes + providers
├── config/nav.js             # sidebar navigation
├── lib/                      # utils + motion variants
├── mocks/db.js               # 🔑 seed data (stands in for a backend)
├── services/                 # API layer — swap apiClient.js for real fetch()
│   ├── apiClient.js          #   mock REST client (latency + in-memory store)
│   ├── resource.service.js   #   per-resource CRUD services
│   ├── analytics.service.js
│   └── auth.service.js
├── store/                    # React context: Auth, Data, Toast
├── hooks/
├── components/
│   ├── ui/                   # Button, Card, Badge, Modal, Table, Field, …
│   ├── charts/               # AreaChart, BarChart, DonutChart (pure SVG)
│   ├── common/               # PageHeader, StatCard, Toolbar, RowActions, …
│   └── layout/               # Sidebar, Topbar, DashboardLayout
└── pages/                    # one folder per section + form modals
```

### Going live with a real API
Everything the UI does flows through `src/services/apiClient.js`. Replace its
`list / get / create / update / remove` bodies with real `fetch` calls to your
backend — no page or component code needs to change.

---

## 🎨 Design system (`packages/config`)

The brand tokens live in [`packages/config/tailwind.preset.js`](packages/config/tailwind.preset.js)
and are consumed by both apps' `tailwind.config.js` via `presets: [brandPreset]`.

| Token | Hex | Use |
|---|---|---|
| `brand-blue` | `#3DA94E` | Primary green |
| `brand-sky` | `#6FCF79` | Light green |
| `brand-green` | `#2E9E43` | Accent green |
| `brand-navy` | `#0F3320` | Deep forest (dark surfaces) |
| `brand-gray` | `#F2F7F2` | Mint light |

Fonts: **Poppins** (display) + **Inter** (body). Semantic tokens (`surface`, `ink`,
`line`, …) are driven by CSS variables in each app's `index.css`.

---

© 1997–2026 Equinox Environments India Pvt Ltd.
