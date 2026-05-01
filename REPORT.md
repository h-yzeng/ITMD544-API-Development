# Project Report - Hospital Appointment System API

**Course:** ITMD-544 Back-end Development
**Student:** Henry Zeng
**Live URL:** [https://hospital-appointment-api-k4kc.onrender.com](https://hospital-appointment-api-k4kc.onrender.com)

---

## 1. Design Decisions and Justifications

**Layered architecture (repository → service → controller → route):** Business logic lives in the service layer and is shared by both REST controllers and GraphQL resolvers. No logic is duplicated between the two API interfaces.

**PostgreSQL (Neon):** The domain is inherently relational - patients and doctors each have many appointments. Foreign keys with `ON DELETE CASCADE` enforce referential integrity automatically. Neon provides serverless PostgreSQL with a free tier and a WebSocket-based driver for Node.js.

**Zod for validation:** Zod schemas serve double duty - they validate incoming request bodies at runtime and infer TypeScript types at compile time, eliminating the need to write separate interface definitions.

**Apollo Server 5:** GraphQL resolvers delegate directly to the same service functions used by REST, so all business rules (e.g., validating that a patient and doctor exist before booking) are enforced in one place regardless of which interface is called.

**`row_to_json()` for nested objects:** Appointment queries use a single SQL JOIN with `row_to_json(p.*)` and `row_to_json(d.*)` to return the nested patient and doctor in one round-trip, avoiding N+1 queries.

---

## 2. Challenges Encountered

**Neon WebSocket transport:** The Neon serverless driver requires an explicit WebSocket constructor in Node.js. Without assigning `ws` to `neonConfig.webSocketConstructor`, all database queries fail silently.

**GraphQL null nested fields:** `createAppointment` initially returned the raw `INSERT RETURNING *` row, which contains only `patient_id` (an integer). The GraphQL schema declares `patient: Patient!` as non-nullable, so Apollo rejected the response. Fixed by re-fetching the inserted row via the JOIN query immediately after insert.

**Apollo Sandbox in production:** Apollo Server 5 disables the Sandbox when `NODE_ENV=production`. Fixed by adding `ApolloServerPluginLandingPageLocalDefault({ embed: true })` and `introspection: true` to force the Sandbox in all environments.

**Credentials in version control:** The real database connection string was accidentally placed in `.env.example` (committed to git). Fixed by resetting `.env.example` to placeholder values, storing real credentials only in `.env` (gitignored), and rotating the Neon connection string.

---

## 3. Performance Analysis - REST vs GraphQL

**REST** returns fixed response shapes. Every `GET /api/patients` call returns all columns whether the client needs them or not (over-fetching). Getting a patient's appointments requires two requests (under-fetching). HTTP GET responses are naturally cacheable by URL.

**GraphQL** lets clients request exactly the fields they need in a single query. A query for a patient's upcoming appointments with the doctor's specialty is one request instead of three. The trade-off is that all GraphQL requests are HTTP POST, so standard HTTP caching does not apply.

For simple CRUD operations, REST is more straightforward. For queries that combine data across multiple entities, GraphQL eliminates extra round-trips. This project provides both interfaces to support different consumers.

---

## 4. Security Considerations

**Parameterized queries:** All SQL uses `$1`, `$2` placeholders. User input is never interpolated into query strings, preventing SQL injection.

**Input validation:** Zod schemas reject invalid or missing fields at the API boundary with HTTP 400 before any data reaches the database.

**Secrets management:** Database credentials are stored in `.env` locally and in Render's environment variable dashboard in production. Neither file is committed to the repository.

**Error responses:** The global error handler returns only the error message to clients, never stack traces.

**Future additions needed:** Authentication/authorization (JWT), rate limiting, and CORS restriction to known origins are not implemented in this course project but would be required in production.

---

## 5. Future Improvements

- **Authentication:** Add JWT-based auth with role-based access control (patient vs. doctor vs. admin).
- **Automated tests:** Add unit tests for the service layer and integration tests for REST endpoints using Vitest and Supertest.
- **Versioned migrations:** Replace the single `schema.sql` file with a migration tool (e.g., Drizzle ORM) that tracks incremental schema changes.
- **Conflict detection:** Prevent double-booking by checking for existing appointments at the same `(doctor_id, scheduled_at)` before inserting.
- **DataLoader:** Add DataLoader for GraphQL to batch and cache database lookups if the schema is extended with deeply nested queries.
