# CampusFix — Intelligent Campus Maintenance & Resource Prioritization

## Problem Statement
Campus maintenance issues are often reported through scattered channels, leading to delays and lack of prioritization. CampusFix centralizes reporting and uses a database-driven priority scoring system.

## Tech Stack
- **Frontend/Backend**: Next.js 16 (App Router, TypeScript, Tailwind CSS)
- **Database**: PostgreSQL 18
- **Vector DB**: pgvector (extension)
- **Auth**: Cookie-based sessions with role-based access

## Roles Supported
- STUDENT (report issues)
- TECHNICIAN (view and update assigned issues)
- ADMIN (manage everything)

## Advanced Database Features
1. **Views**: `vw_unresolved_issues` — Joins 4 tables for dashboard queries
2. **Stored Functions**: `calculate_priority_score()` — Dynamic priority computation
3. **Triggers**: `trg_issue_status_change` — Auto-logs status changes
4. **Transactions**: Used for atomic technician assignments
5. **Indexing**: 18+ B-Tree indexes for performance
6. **Vector Search**: `issue_embeddings` table with pgvector for semantic search

## Setup Instructions
1. Run `01_base_tables.sql` in PostgreSQL
2. Run `02_advanced_features.sql`
3. Run `03_mock_data.sql`
4. Create `.env.local` with `DATABASE_URL=postgresql://user:pass@localhost:5432/campusfix`
5. `npm install && npm run dev`
6. Open `http://localhost:3000/login`

## Demo Credentials
- Student: `alice@campus.edu`
- Technician: `bob@campus.edu`
- Admin: `admin@campus.edu`