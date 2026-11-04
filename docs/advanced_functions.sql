/* ---------------------------------------------------------
   ADVANCED FEATURE 1: VIEWS
   --------------------------------------------------------- */
CREATE VIEW vw_unresolved_issues AS
SELECT 
    i.issue_id,
    i.title,
    i.status,
    i.severity,
    i.priority_score,
    r.room_number,
    b.building_name,
    u.full_name AS reported_by_name
FROM issues i
JOIN rooms r ON i.room_id = r.room_id
JOIN buildings b ON r.building_id = b.building_id
JOIN users u ON i.reported_by = u.user_id
WHERE i.status NOT IN ('RESOLVED', 'CLOSED');

/* ---------------------------------------------------------
   ADVANCED FEATURE 2: STORED FUNCTIONS
   --------------------------------------------------------- */
CREATE OR REPLACE FUNCTION calculate_priority_score(
    p_severity issue_severity,
    p_affected_users INTEGER,
    p_criticality INTEGER,
    p_recurrence INTEGER
) RETURNS NUMERIC AS $$
DECLARE
    severity_weight NUMERIC;
BEGIN
    severity_weight := CASE p_severity
        WHEN 'LOW' THEN 1
        WHEN 'MEDIUM' THEN 2
        WHEN 'HIGH' THEN 3
        WHEN 'CRITICAL' THEN 4
    END;
    RETURN severity_weight * (p_affected_users * 0.5) * p_criticality * p_recurrence;
END;
$$ LANGUAGE plpgsql;

/* ---------------------------------------------------------
   ADVANCED FEATURE 3: TRIGGERS
   --------------------------------------------------------- */
CREATE OR REPLACE FUNCTION log_issue_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status <> OLD.status THEN
        INSERT INTO status_history (issue_id, old_status, new_status, changed_by, remarks)
        VALUES (NEW.issue_id, OLD.status, NEW.status, NEW.reported_by, 'Auto-logged by trigger');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_issue_status_change
AFTER UPDATE ON issues
FOR EACH ROW
EXECUTE FUNCTION log_issue_status_change();

/* ---------------------------------------------------------
   ADVANCED FEATURE 4: VECTOR DATABASE (pgvector)
   --------------------------------------------------------- */
-- Note: Requires pgvector extension to be installed on the server.
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE issue_embeddings (
    embedding_id BIGSERIAL PRIMARY KEY,
    issue_id BIGINT NOT NULL UNIQUE,
    embedding_vector VECTOR(1536),
    model_name VARCHAR(100) NOT NULL DEFAULT 'text-embedding-ada-002',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_embedding_issue 
        FOREIGN KEY (issue_id) 
        REFERENCES issues(issue_id) 
        ON DELETE CASCADE
);

-- IVFFlat index using cosine distance for fast similarity search
CREATE INDEX idx_issue_embedding 
ON issue_embeddings 
USING ivfflat (embedding_vector vector_cosine_ops);

/* ---------------------------------------------------------
   ADVANCED FEATURE 5 & 6: INDEXES & TRANSACTIONS
   --------------------------------------------------------- */
-- Indexes are implemented in base_tables.sql
-- Transactions are implemented in mock_data.sql and DML scripts.
