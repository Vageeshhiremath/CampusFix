# CampusFix SQL Implementation

## Setup Instructions
1. Create a database named `campusfix` in PostgreSQL.
2. Open the Query Tool in pgAdmin.
3. Run `01_base_tables.sql` to create all tables, constraints, and indexes.
4. Run `02_advanced_features.sql` to add Views, Stored Functions, and Triggers.
5. Run `03_mock_data.sql` to insert sample data and test the transaction.
6. Run `04_test_queries.sql` to verify the View, Function, Trigger, and complex DML queries.

## Advanced Features Demonstrated
- **Views:** `vw_unresolved_issues` simplifies complex joins for active issues.
- **Stored Functions:** `calculate_priority_score()` dynamically computes issue priority based on severity, affected users, criticality, and recurrence.
- **Triggers:** `trg_issue_status_change` automatically logs status changes to the `status_history` table.
- **Transactions:** Used in `03_mock_data.sql` to atomically assign a technician and update the issue status.
- **Indexing:** Multiple B-Tree indexes added to optimize foreign key lookups and status filtering.