# ANH SENSEI Architecture Guide

## System Overview
ANH SENSEI is a Japanese self-study web platform (N5 - N3) built with Next.js App Router on the Frontend and Spring Boot Modular Monolith on the Backend.

```text
Browser -> Nginx Reverse Proxy (Port 80)
            ├── Frontend: Next.js App Router (Port 3000)
            └── Backend: Spring Boot REST API (Port 8080)
                    ├── Supabase PostgreSQL (PostgreSQL + pgvector)
                    ├── Supabase Storage (Media files & attachments)
                    └── AI Provider (LLM API via RAG)
```

## Architectural Guidelines
1. **Modular Monolith**: Modules communicate strictly through Java interfaces/services, avoiding direct cross-repository queries.
2. **Frontend Constraints**:
   - Next.js never connects directly to PostgreSQL.
   - Next.js never calls the AI Provider directly.
   - Secrets (`JWT_SIGNING_SECRET`, `DATABASE_PASSWORD`, `SUPABASE_SERVICE_KEY`, `AI_API_KEY`) reside exclusively in the Backend.
3. **Database Migration**: Flyway manages all schema migrations. Baseline schema is located at `db/migration/V1__baseline.sql`.
