# Database Schema

Three PostgreSQL tables hosted on [Neon](https://neon.tech), following third normal form (3NF).

---

## Entity Relationship Diagram

```mermaid
erDiagram
    patients {
        int id PK
        varchar first_name
        varchar last_name
        varchar email UK
        varchar phone
        date date_of_birth
        timestamptz created_at
        timestamptz updated_at
    }

    doctors {
        int id PK
        varchar first_name
        varchar last_name
        varchar email UK
        varchar specialty
        varchar phone
        timestamptz created_at
        timestamptz updated_at
    }

    appointments {
        int id PK
        int patient_id FK
        int doctor_id FK
        timestamptz scheduled_at
        varchar status
        varchar reason
        text notes
        timestamptz created_at
        timestamptz updated_at
    }

    patients ||--o{ appointments : "has"
    doctors  ||--o{ appointments : "has"
```

---

## Table Definitions

### `patients`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | SERIAL | PRIMARY KEY |
| `first_name` | VARCHAR(100) | NOT NULL |
| `last_name` | VARCHAR(100) | NOT NULL |
| `email` | VARCHAR(255) | UNIQUE NOT NULL |
| `phone` | VARCHAR(20) | optional |
| `date_of_birth` | DATE | optional |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() |

### `doctors`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | SERIAL | PRIMARY KEY |
| `first_name` | VARCHAR(100) | NOT NULL |
| `last_name` | VARCHAR(100) | NOT NULL |
| `email` | VARCHAR(255) | UNIQUE NOT NULL |
| `specialty` | VARCHAR(100) | NOT NULL |
| `phone` | VARCHAR(20) | optional |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() |

### `appointments`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | SERIAL | PRIMARY KEY |
| `patient_id` | INTEGER | FK → patients(id) ON DELETE CASCADE |
| `doctor_id` | INTEGER | FK → doctors(id) ON DELETE CASCADE |
| `scheduled_at` | TIMESTAMPTZ | NOT NULL |
| `status` | VARCHAR(20) | CHECK IN ('scheduled','completed','cancelled') DEFAULT 'scheduled' |
| `reason` | VARCHAR(500) | optional |
| `notes` | TEXT | optional |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() |
