# Pòtfolyo Pèsonèl — Steven Plaisival

Sit wèb pòtfolyo pèsonèl, bati ak React, Node.js/Express ak MySQL. Gen yon pati piblik (Akèy,
Sou Mwen, Pwojè, Kontak — chak paj ak pwòp idantite vizyèl) ak yon panèl admin sekirize pou jere
kontni an san touche kòd la.

## Estrikti Depo a

```
.
├── client/   Frontend React (Vite)
├── server/   Backend API Express + MySQL
└── Cahier_de_Charges_Portfolio_Personnel.pdf
```

## Teknoloji

| Kouch | Teknoloji |
|---|---|
| Frontend | React 19, Vite, React Router, Tailwind CSS v4, React Hook Form |
| Backend | Node.js, Express, MySQL2, JWT, bcrypt, Helmet, express-validator |
| Baz Done | MySQL / MariaDB |
| Tès | Jest + Supertest (backend) |

## Enstalasyon

### 1 — Baz Done

```bash
mysql -u root < server/database/schema.sql
```

Kreye yon itilizatè MySQL dedye pou aplikasyon an epi bay li aksè sou `portfolio_db`.

### 2 — Backend

```bash
cd server
cp .env.example .env       # ranpli DB_*, JWT_SECRET, ADMIN_*
npm install
npm run seed                # kreye premye itilizatè admin
npm run dev                 # sèvè a sou http://localhost:5000
```

### 3 — Frontend

```bash
cd client
cp .env.example .env        # VITE_API_URL (opsyonèl an dev, pwoksi deja konfigire)
npm install
npm run dev                 # sit la sou http://localhost:5173
```

## Tès

```bash
cd server
npm test
```

## Fonksyonalite

- **Pati piblik** — Akèy, Sou Mwen (konpetans + eksperyans), Pwojè, Kontak (fòm sekirize).
  Chak paj gen pwòp idantite vizyèl (Editorial Dark Mono / Ayiti Modern / Terminal / Brutalist).
  Sit la disponib an Kreyòl, Fransè ak Anglè.
- **Panèl Admin** (`/admin`) — koneksyon JWT, modifye pwofil (ak upload foto), jere pwojè
  (ajoute/modifye/efase), li ak jere mesaj kontak yo, chanje idantifyan kont admin la.
- **Sekirite** — modpas chifre ak bcrypt, JWT pou wout admin yo, validasyon done sou backend,
  rate-limiting sou fòm kontak ak login, requêtes preparees (pwoteksyon SQL injection), Helmet.js.

## API — Rezime Pwen Aksè

| Metòd | Wout | Deskripsyon |
|---|---|---|
| GET | `/api/profile` | Enfòmasyon pèsonèl |
| PUT | `/api/profile` | Modifye pwofil (admin) |
| GET | `/api/projects` | Lis pwojè |
| POST/PUT/DELETE | `/api/projects/:id` | Jere pwojè (admin) |
| GET | `/api/skills` | Lis konpetans |
| GET | `/api/experiences` | Lis eksperyans |
| GET | `/api/socials` | Lyen rezo sosyal |
| POST | `/api/contact` | Voye mesaj kontak |
| GET/PATCH/DELETE | `/api/messages/:id` | Jere mesaj (admin) |
| POST | `/api/auth/login` | Koneksyon admin |
| PUT | `/api/auth/account` | Chanje idantifyan kont admin |
| POST | `/api/upload` | Telechaje yon imaj (admin) |

## Deplwaman

- **Frontend** — Vercel oswa Netlify (`npm run build` nan `client/`)
- **Backend** — Render, Railway oswa yon VPS
- **Baz Done** — MySQL sou Railway, PlanetScale, oswa VPS

Detay konplè kaye chaj la disponib nan
[`Cahier_de_Charges_Portfolio_Personnel.pdf`](./Cahier_de_Charges_Portfolio_Personnel.pdf).
