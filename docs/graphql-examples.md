# GraphQL API - Schema & Examples

The GraphQL endpoint is available at:
- **Local:** `http://localhost:3000/graphql`
- **Production:** `https://hospital-appointment-api-k4kc.onrender.com/graphql`

Open either URL in a browser to access the interactive Apollo Sandbox explorer.

---

## Schema Overview

### Types

```graphql
type Patient {
  id: ID!
  first_name: String!
  last_name: String!
  email: String!
  phone: String
  date_of_birth: String
  created_at: String!
  appointments: [Appointment!]
}

type Doctor {
  id: ID!
  first_name: String!
  last_name: String!
  email: String!
  specialty: String!
  phone: String
  created_at: String!
  appointments: [Appointment!]
}

type Appointment {
  id: ID!
  patient: Patient!
  doctor: Doctor!
  scheduled_at: String!
  status: AppointmentStatus!
  reason: String
  notes: String
  created_at: String!
}

enum AppointmentStatus {
  scheduled
  completed
  cancelled
}

type PaginatedPatients  { data: [Patient!]!,  total: Int!, page: Int!, limit: Int! }
type PaginatedDoctors   { data: [Doctor!]!,   total: Int!, page: Int!, limit: Int! }
type PaginatedAppointments { data: [Appointment!]!, total: Int!, page: Int!, limit: Int! }
```

### Queries

```graphql
type Query {
  patients(page: Int, limit: Int): PaginatedPatients!
  patient(id: ID!): Patient
  doctors(page: Int, limit: Int): PaginatedDoctors!
  doctor(id: ID!): Doctor
  appointment(id: ID!): Appointment
  patientAppointments(patientId: ID!, page: Int, limit: Int): PaginatedAppointments!
  doctorAppointments(doctorId: ID!, page: Int, limit: Int): PaginatedAppointments!
}
```

### Mutations

```graphql
type Mutation {
  createPatient(first_name: String!, last_name: String!, email: String!, phone: String, date_of_birth: String): Patient!
  createDoctor(first_name: String!, last_name: String!, email: String!, specialty: String!, phone: String): Doctor!
  createAppointment(patient_id: ID!, doctor_id: ID!, scheduled_at: String!, reason: String, notes: String): Appointment!
  updateAppointment(id: ID!, scheduled_at: String, status: AppointmentStatus, reason: String, notes: String): Appointment!
  deleteAppointment(id: ID!): Boolean!
}
```

---

## Example Queries

### List all patients (paginated)

```graphql
query GetPatients {
  patients(page: 1, limit: 10) {
    data {
      id
      first_name
      last_name
      email
      phone
      date_of_birth
    }
    total
    page
    limit
  }
}
```

**Response:**
```json
{
  "data": {
    "patients": {
      "data": [
        {
          "id": "1",
          "first_name": "Jane",
          "last_name": "Doe",
          "email": "jane@example.com",
          "phone": "555-1234",
          "date_of_birth": "1990-05-15"
        }
      ],
      "total": 1,
      "page": 1,
      "limit": 10
    }
  }
}
```

---

### Get a single patient

```graphql
query GetPatient {
  patient(id: "1") {
    id
    first_name
    last_name
    email
  }
}
```

---

### List all doctors

```graphql
query GetDoctors {
  doctors(page: 1, limit: 10) {
    data {
      id
      first_name
      last_name
      specialty
      email
    }
    total
  }
}
```

---

### Get all appointments for a patient

```graphql
query GetPatientAppointments {
  patientAppointments(patientId: "1", page: 1, limit: 10) {
    data {
      id
      scheduled_at
      status
      reason
      doctor {
        first_name
        last_name
        specialty
      }
    }
    total
    page
    limit
  }
}
```

**Response:**
```json
{
  "data": {
    "patientAppointments": {
      "data": [
        {
          "id": "4",
          "scheduled_at": "2026-07-10T09:00:00.000Z",
          "status": "completed",
          "reason": "Follow-up",
          "doctor": {
            "first_name": "Sarah",
            "last_name": "Chen",
            "specialty": "Cardiology"
          }
        }
      ],
      "total": 1,
      "page": 1,
      "limit": 10
    }
  }
}
```

---

### Get a single appointment (with nested patient and doctor)

```graphql
query GetAppointment {
  appointment(id: "4") {
    id
    scheduled_at
    status
    reason
    notes
    patient {
      id
      first_name
      last_name
      email
    }
    doctor {
      id
      first_name
      last_name
      specialty
    }
  }
}
```

---

### Get all appointments for a doctor

```graphql
query GetDoctorAppointments {
  doctorAppointments(doctorId: "1", page: 1, limit: 10) {
    data {
      id
      scheduled_at
      status
      patient {
        first_name
        last_name
      }
    }
    total
  }
}
```

---

## Example Mutations

### Create a patient

```graphql
mutation CreatePatient {
  createPatient(
    first_name: "John"
    last_name: "Smith"
    email: "john.smith@example.com"
    phone: "555-9876"
    date_of_birth: "1985-03-22"
  ) {
    id
    first_name
    last_name
    email
    created_at
  }
}
```

**Response:**
```json
{
  "data": {
    "createPatient": {
      "id": "2",
      "first_name": "John",
      "last_name": "Smith",
      "email": "john.smith@example.com",
      "created_at": "2026-05-01T03:00:00.000Z"
    }
  }
}
```

---

### Create a doctor

```graphql
mutation CreateDoctor {
  createDoctor(
    first_name: "Sarah"
    last_name: "Chen"
    email: "schen@hospital.com"
    specialty: "Cardiology"
    phone: "555-0001"
  ) {
    id
    first_name
    last_name
    specialty
  }
}
```

---

### Create an appointment

```graphql
mutation CreateAppointment {
  createAppointment(
    patient_id: "1"
    doctor_id: "1"
    scheduled_at: "2026-06-15T10:00:00.000Z"
    reason: "Annual checkup"
    notes: "Patient reports no recent issues"
  ) {
    id
    scheduled_at
    status
    reason
    patient {
      first_name
      last_name
    }
    doctor {
      first_name
      specialty
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "createAppointment": {
      "id": "5",
      "scheduled_at": "2026-06-15T10:00:00.000Z",
      "status": "scheduled",
      "reason": "Annual checkup",
      "patient": {
        "first_name": "Jane",
        "last_name": "Doe"
      },
      "doctor": {
        "first_name": "Sarah",
        "specialty": "Cardiology"
      }
    }
  }
}
```

---

### Update an appointment

```graphql
mutation UpdateAppointment {
  updateAppointment(
    id: "5"
    status: completed
    notes: "Patient doing well, follow-up in 6 months"
  ) {
    id
    status
    notes
    patient {
      first_name
    }
  }
}
```

---

### Cancel (delete) an appointment

```graphql
mutation DeleteAppointment {
  deleteAppointment(id: "5")
}
```

**Response:**
```json
{
  "data": {
    "deleteAppointment": true
  }
}
```

---

## Error Handling

GraphQL errors are returned in the `errors` array alongside any partial data:

```json
{
  "errors": [
    {
      "message": "Patient not found",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["appointment"],
      "extensions": { "code": "INTERNAL_SERVER_ERROR" }
    }
  ],
  "data": { "appointment": null }
}
```
