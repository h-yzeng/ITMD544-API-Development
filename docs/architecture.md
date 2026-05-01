# System Architecture

The Hospital Appointment System is a Node.js API deployed on Render, backed by PostgreSQL on Neon. It exposes a REST API (Swagger) and a GraphQL API (Apollo Server) from a single Express HTTP server. Both interfaces share the same service and repository layers.

---

## Architecture Diagram

```mermaid
graph TB
    subgraph Clients
        Browser["Browser / Postman"]
    end

    subgraph "GitHub"
        Repo["GitHub Repository"]
        CI["GitHub Actions\n(type-check + build)"]
    end

    subgraph "Render (Cloud)"
        Server["Express HTTP Server\n(Node.js + TypeScript)"]
        REST["REST API /api/*"]
        GQL["GraphQL API /graphql"]
        Swagger["Swagger UI /api-docs"]
    end

    subgraph "Application Layers"
        Routes["Routes + Controllers"]
        Services["Service Layer"]
        Repos["Repository Layer"]
    end

    subgraph "Neon (Database)"
        DB[("PostgreSQL\npatients / doctors / appointments")]
    end

    Browser -->|HTTP| Server
    Server --> REST
    Server --> GQL
    Server --> Swagger
    REST --> Routes
    GQL -->|resolvers| Services
    Routes --> Services
    Services --> Repos
    Repos -->|parameterized SQL| DB
    Repo -->|push to main| CI
    CI -->|auto-deploy| Server
```

---

## Technology Stack

| Technology | Choice | Reason |
|------------|--------|--------|
| Language | TypeScript | Type safety, compile-time error checking |
| Framework | Express 5 | Minimal, widely used |
| Database | PostgreSQL (Neon) | Relational model fits appointment data |
| GraphQL | Apollo Server 5 | Industry standard, built-in Sandbox |
| Validation | Zod | Schema-first with TypeScript inference |
| Deployment | Render | GitHub integration, free tier |
