# Hospital Appointment System API

A full-stack REST and GraphQL API for managing hospital appointments, patients, and doctors. Built with TypeScript, Express, PostgreSQL (Neon), and Apollo Server.

**Live Demo:** https://hospital-appointment-api-k4kc.onrender.com

| Endpoint | URL |
|----------|-----|
| REST API Docs (Swagger) | https://hospital-appointment-api-k4kc.onrender.com/api-docs |
| GraphQL Sandbox | https://hospital-appointment-api-k4kc.onrender.com/graphql |
| Health Check | https://hospital-appointment-api-k4kc.onrender.com/health |

---

## Tech Stack

- **Runtime:** Node.js 22 + TypeScript 6
- **Framework:** Express 5
- **Database:** PostgreSQL via [Neon](https://neon.tech) (serverless)
- **GraphQL:** Apollo Server 5 + `@as-integrations/express5`
- **Validation:** Zod
- **API Docs:** Swagger UI (swagger-jsdoc + swagger-ui-express)
- **CI/CD:** GitHub Actions
- **Deployment:** Render

---

## Local Development Setup

### Prerequisites

- Node.js 22+
- A [Neon](https://neon.tech) account (free tier is sufficient)

### 1. Clone the repository

```bash
git clone https://github.com/h-yzeng/ITMD544-API-Development.git
cd ITMD544-API-Development
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000
```

To get your `DATABASE_URL`:
1. Go to [neon.tech](https://neon.tech) and create a free project
2. Copy the **Connection string** from the dashboard

### 4. Run the database migration

This creates the `patients`, `doctors`, and `appointments` tables:

```bash
npm run db:migrate
```

Expected output: `Migration complete`

### 5. Start the development server

```bash
npm run dev
```

The server starts with hot-reload at `http://localhost:3000`.

| URL | Description |
|-----|-------------|
| `http://localhost:3000/` | Redirects to Swagger UI |
| `http://localhost:3000/api-docs` | Interactive REST API documentation |
| `http://localhost:3000/graphql` | Apollo GraphQL Sandbox |
| `http://localhost:3000/health` | Health check |

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production build |
| `npm run db:migrate` | Create database tables |

---

## REST API Overview

### Patients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | List all patients (paginated) |
| GET | `/api/patients/:id` | Get a patient by ID |
| POST | `/api/patients` | Create a new patient |
| GET | `/api/patients/:patientId/appointments` | Get all appointments for a patient |

### Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | List all doctors (paginated) |
| GET | `/api/doctors/:id` | Get a doctor by ID |
| POST | `/api/doctors` | Create a new doctor |
| GET | `/api/doctors/:doctorId/appointments` | Get all appointments for a doctor |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments/:id` | Get appointment details |
| POST | `/api/appointments` | Create a new appointment |
| PUT | `/api/appointments/:id` | Update an appointment |
| DELETE | `/api/appointments/:id` | Cancel an appointment |

Pagination is supported via `?page=1&limit=10` query parameters on all list endpoints.

Full interactive documentation is available at `/api-docs`.

---

## GraphQL API

The GraphQL endpoint is available at `/graphql`. It supports all the same operations as the REST API through a single flexible endpoint.

### Example Query

```graphql
query {
  patients(page: 1, limit: 10) {
    data {
      id
      first_name
      last_name
      email
    }
    total
    page
    limit
  }
}
```

See [docs/graphql-examples.md](docs/graphql-examples.md) for the full schema and example queries/mutations.

---

## Project Structure

```
src/
├── config/
│   └── database.ts          # Neon PostgreSQL connection pool
├── db/
│   ├── schema.sql            # Database DDL
│   └── migrate.ts            # Migration script
├── models/                   # TypeScript interfaces + Zod schemas
├── repositories/             # Raw SQL queries (data access layer)
├── services/                 # Business logic layer
├── controllers/              # HTTP request/response handlers
├── routes/                   # Express routers with Swagger JSDoc
├── graphql/
│   ├── schema.ts             # GraphQL type definitions
│   └── resolvers/            # GraphQL resolvers (delegate to services)
├── middleware/
│   ├── validate.ts           # Zod validation middleware factory
│   └── errorHandler.ts       # Global Express error handler
├── docs/
│   └── swagger.ts            # Swagger/OpenAPI configuration
├── app.ts                    # Express app factory
└── server.ts                 # Entry point - Apollo + HTTP server startup
```

---

## Documentation

- [GraphQL Schema & Examples](docs/graphql-examples.md)
- [System Architecture](docs/architecture.md)
- [Database Schema](docs/database-schema.md)
- [Deployment Guide](docs/deployment.md)
- [Project Report](REPORT.md)
