# CampusFix --- Intelligent Campus Maintenance & Resource Prioritization

##  Problem Statement

Campus maintenance issues are often reported through scattered channels,
leading to delays and a lack of prioritization. A broken projector in an
empty room may get fixed before a power outage in the main hall.

**CampusFix** centralizes issue reporting and uses a **database-driven
priority scoring system** to ensure critical issues receive attention
first.

##  Architecture & Tech Stack (Polyglot Persistence)

CampusFix uses a multi-paradigm database architecture to demonstrate
enterprise-grade database design:

-   **Frontend / Backend:** Next.js 16 (App Router, TypeScript, Tailwind
    CSS)
-   **Relational Database:** PostgreSQL 18 (ACID compliance, triggers,
    views)
-   **Vector Database:** PostgreSQL with the `pgvector` extension
    (semantic similarity search)
-   **NoSQL Database:** Redis (in-memory key-value store for high-speed
    caching)
-   **Authentication:** Cookie-based sessions with Role-Based Access
    Control (RBAC)

##  Roles Supported

-   **STUDENT:** Can report new issues through the dashboard.
-   **TECHNICIAN:** Can view assigned issues and use **Fix & Resolve**
    to update issue statuses.
-   **ADMIN:** Has full visibility and control over issues and statuses.

##  Advanced Database Features Implemented

1.  **Views:** `vw_unresolved_issues` --- joins four tables for
    dashboard queries.
2.  **Stored Functions:** `calculate_priority_score()` --- dynamically
    computes priority based on severity, affected users, and
    criticality.
3.  **Triggers:** `trg_issue_status_change` --- automatically logs
    status updates into `status_history` for auditing.
4.  **Transactions:** Used for atomic technician assignments.
5.  **Indexing:** 18+ B-tree indexes for query performance optimization.
6.  **Vector Search:** `issue_embeddings` table using `pgvector` with
    IVFFlat indexing.
7.  **CTEs & Window Functions:** Implemented in `test.sql` for advanced
    analytics.

------------------------------------------------------------------------

##  Setup & Execution Instructions

### 1. Database Setup (PostgreSQL)

Open **pgAdmin Query Tool** or a PostgreSQL terminal and execute the SQL
files in this order.

If the database does not already exist, create it:

``` bash
createdb -U postgres campusfix
```

Then run the SQL files:

``` bash
# 1. Create tables, constraints, and indexes
psql -U postgres -d campusfix -f docs/base_tables.SQL

# 2. Create advanced features: views, functions, triggers, and pgvector objects
psql -U postgres -d campusfix -f docs/advanced_functions.sql

# 3. Insert mock data: users, rooms, and issues
psql -U postgres -d campusfix -f docs/mock_data.sql

# 4. Run test queries: JOINs, CTEs, and subqueries
psql -U postgres -d campusfix -f docs/test.sql
```

> **Note:** Ensure PostgreSQL is running and that the `pgvector`
> extension is installed and available to the database before executing
> scripts that use it. Adjust the SQL file paths if your repository
> structure differs.

### 2. Environment Variables

Create a file named `.env.local` in the root of the `campusfix-web`
folder:

``` env
# PostgreSQL connection
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/campusfix

# Redis connection
REDIS_URL=rediss://default:YOUR_REDIS_PASSWORD@YOUR_REDIS_HOST:6379
```

Replace the placeholder values with your actual credentials. **Do not
commit `.env.local` or real credentials to GitHub.**

### 3. Web Application Setup (Next.js)

Navigate to the application directory and install dependencies:

``` bash
cd campusfix-web
npm install
npm run dev
```

Open <http://localhost:3000> in your browser.

------------------------------------------------------------------------

##  Live Demonstration Commands (For Viva / Evaluation)

Use the following examples during your demonstration. Run SQL statements
in **pgAdmin Query Tool** unless a step specifically says to use a
terminal.

### Recommended End-to-End Demo Flow

1. Start the application from the project directory:

   ``` powershell
   cd C:\Users\vagee\CampusFix_Project\campusfix-web
   npm run dev
   ```

2. Open <http://localhost:3000/login>.

3. Demonstrate role-based login:

   | Account | Role | Dashboard |
   | --- | --- | --- |
   | `alice@campus.edu` | Student | `/student/dashboard` |
   | `bob@campus.edu` | Technician | `/worker/dashboard` |
   | `admin@campus.edu` | Admin | `/admin/dashboard` |

4. Sign in as `alice@campus.edu` and report a new issue:
   - Enter a title and description.
   - Select a severity.
   - Use a registered location, for example room `401` on floor `4`
     or room `606` on floor `6`.
   - Submit the issue and show the new issue on the dashboard.

5. Verify the issue in PostgreSQL:

   ``` sql
   SELECT
       i.issue_id,
       i.title,
       i.status,
       i.severity,
       i.priority_score,
       r.room_number,
       r.floor_number,
       b.building_name,
       u.full_name AS reported_by
   FROM issues AS i
   JOIN rooms AS r ON r.room_id = i.room_id
   JOIN buildings AS b ON b.building_id = r.building_id
   JOIN users AS u ON u.user_id = i.reported_by
   ORDER BY i.issue_id DESC;
   ```

6. Sign out, then sign in as `bob@campus.edu`. Update an issue status from
   the worker dashboard.

7. Verify the status update and trigger audit entry:

   ``` sql
   SELECT issue_id, title, status
   FROM issues
   ORDER BY issue_id DESC;

   SELECT *
   FROM status_history
   ORDER BY history_id DESC
   LIMIT 3;
   ```

8. Sign out, then sign in as `admin@campus.edu` to demonstrate the admin
   dashboard and full issue visibility.

9. Finish by demonstrating the database features below: the view, stored
   function, trigger, transaction, CTE, window function, and Redis cache.

### 1. Demonstrate the View (Four-Table JOIN)

``` sql
SELECT *
FROM vw_unresolved_issues;
```

**What to explain:** The dashboard can query this view instead of
repeating the underlying multi-table JOIN in every dashboard query.

### 2. Demonstrate the Stored Function (Priority Calculation)

``` sql
SELECT calculate_priority_score('CRITICAL', 50, 5, 2) AS final_priority_score;
```

**What to explain:** The database function calculates the priority
score. The example is expected to return `1000.0` according to the
project's stated scoring logic; verify this against the function
definition and sample data before the viva.

### 3. Demonstrate the Trigger (Automatic Audit Log)

1.  Sign in to the web application using a **TECHNICIAN** account.
2.  Select an assigned issue and click **Fix & Resolve**.
3.  Run this query in pgAdmin:

``` sql
SELECT *
FROM status_history
ORDER BY history_id DESC
LIMIT 3;
```

**What to explain:** The trigger `trg_issue_status_change` automatically
records the status change in `status_history`, providing an audit trail.

### 4. Demonstrate a Transaction (Atomicity)

Run this only with valid IDs in a test database or disposable demo data.
Check that the issue and technician IDs exist and that the assignment
does not violate existing constraints.

``` sql
BEGIN;

INSERT INTO issue_assignments (
    issue_id,
    technician_id,
    assignment_notes
)
VALUES (
    1,
    2,
    'Assigned during live demo.'
);

UPDATE issues
SET status = 'ASSIGNED'
WHERE issue_id = 1;

COMMIT;
```

**What to explain:** The statements execute within one transaction. If
an error occurs before `COMMIT`, execute `ROLLBACK` to undo the
transaction. In application code, ensure failures trigger a rollback
rather than committing partial work.

### 5. Demonstrate CTEs & Window Functions

**CTE --- Issues Above Average Priority**

``` sql
WITH AveragePriority AS (
    SELECT AVG(priority_score) AS avg_score
    FROM issues
)
SELECT
    i.title,
    i.priority_score
FROM issues AS i
CROSS JOIN AveragePriority AS ap
WHERE i.priority_score > ap.avg_score;
```

**What to explain:** The CTE calculates the average priority once, and
the outer query returns issues whose priority is above that average.

**Window Function --- Rank Technicians by Assignment Count**

``` sql
SELECT
    u.full_name,
    COUNT(a.assignment_id) AS total_assignments,
    RANK() OVER (
        ORDER BY COUNT(a.assignment_id) DESC
    ) AS technician_rank
FROM issue_assignments AS a
JOIN users AS u
    ON a.technician_id = u.user_id
GROUP BY u.user_id, u.full_name;
```

**What to explain:** `RANK()` ranks technicians by assignment count
without collapsing the individual grouped rows into a single result.

### 6. Demonstrate Redis Caching (Terminal + Browser)

1.  Start the application with `npm run dev`.

2.  Keep the development terminal visible.

3.  Open <http://localhost:3000> and navigate to a page that performs
    the cached database query.

4.  On the first request, look for the project's cache-miss log, such
    as:

    ``` text
    🐢 Served from PostgreSQL (Cache Miss)
    ```

5.  Refresh the same page.

6.  Look for the cache-hit log, such as:

    ``` text
    ⚡ Served from Redis Cache
    ```

**What to explain:** The first request fetches data from PostgreSQL and
populates the Redis cache. A subsequent request can be served from
Redis, reducing repeated database reads.

> **Note:** These log messages are expected only if the application
> implements and emits them. The exact behavior depends on the cache
> key, TTL, invalidation logic, and the route being tested.

------------------------------------------------------------------------

##  Repository

[CampusFix on GitHub](https://github.com/Vageeshhiremath/CampusFix)

## 👨 Team

-   **Vageesh Hiremath** --- PES2UG24CS663
-   **Vikas N** --- PES2UG24CS668
