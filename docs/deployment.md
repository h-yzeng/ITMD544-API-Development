# Deployment Guide

Deployed on [Render](https://render.com) with CI/CD via GitHub Actions. Every push to `main` triggers a type-check and build, then Render auto-deploys.

**Live URLs:**

| Service | URL |
|---------|-----|
| API / Swagger | [hospital-appointment-api-k4kc.onrender.com](https://hospital-appointment-api-k4kc.onrender.com) |
| REST Docs | [/api-docs](https://hospital-appointment-api-k4kc.onrender.com/api-docs) |
| GraphQL Sandbox | [/graphql](https://hospital-appointment-api-k4kc.onrender.com/graphql) |
| Health Check | [/health](https://hospital-appointment-api-k4kc.onrender.com/health) |

---

## Step 1 - Database (Neon)

1. Go to [neon.tech](https://neon.tech) and sign in
2. Create a new project
3. Copy the connection string: `postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

---

## Step 2 - Deploy to Render

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **New +** → **Web Service** → select the repository
3. Render detects `render.yaml` and pre-fills settings (build: `npm install && npm run build`, start: `npm start`)
4. Click **Create Web Service**

---

## Step 3 - Environment Variables

In the Render dashboard under **Environment**, add:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Neon connection string from Step 1 |
| `NODE_ENV` | `production` |
| `BASE_URL` | Your Render service URL |

---

## Step 4 - Run Migration

```bash
npm run db:migrate
```

Expected output: `Migration complete`. Only needs to run once.

---

## Step 5 - Verify

```bash
curl https://hospital-appointment-api-k4kc.onrender.com/health
# {"status":"ok"}
```

---

## CI/CD Pipeline

Defined in `.github/workflows/ci.yml`. Runs on every push to `main`:

1. `npm ci`
2. `npx tsc --noEmit` (type check)
3. `npm run build`

If any step fails, the workflow is marked failed. Render then auto-deploys after a successful push.
