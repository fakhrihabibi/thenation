# THE NATION — Premium Event Organizer

A full-stack modern Event Organizer portfolio website with a premium dark concert and festival vibe.

## Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Swiper.js** (partner carousel)
- **React Icons**
- **Axios** (API integration)

### Backend
- **Node.js** + **Express.js**
- **PostgreSQL** (relational database)
- **JWT** Authentication (Admin & Staff roles)
- **Multer** (image upload)
- **bcryptjs** (password hashing)

## Getting Started

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your PostgreSQL credentials
npm install
npm run dev
```

The API runs on `http://localhost:5000`.

### 2. Database Setup

Create a PostgreSQL database named `thenation`, then run the schema:

```bash
psql -U postgres -d thenation -f migrations/schema.sql
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000`.

> **Note:** The frontend works with demo seed data even without the backend running.

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | - | Register user |
| POST | `/api/auth/login` | - | Login |
| GET | `/api/events` | - | List events |
| POST | `/api/events` | Staff | Create event |
| GET | `/api/services` | - | List services |
| GET | `/api/testimonials` | - | List testimonials |
| POST | `/api/bookings` | - | Submit booking |
| GET | `/api/bookings` | Staff | List bookings |
| GET | `/api/galleries` | - | List gallery images |
| GET | `/api/partners` | - | List partners |
| GET | `/api/stats` | Admin | Dashboard stats |

## Project Structure

```
thenation/
├── frontend/           # Next.js + Tailwind CSS
│   └── src/
│       ├── app/        # Pages & layout
│       ├── components/ # All UI sections
│       ├── data/       # Seed/demo data
│       └── lib/        # API service layer
├── backend/            # Express.js API
│   ├── src/
│   │   ├── config/     # DB connection
│   │   ├── controllers/# Route handlers
│   │   ├── middleware/  # Auth & upload
│   │   └── routes/     # API routes
│   └── migrations/     # SQL schema
└── README.md
```
