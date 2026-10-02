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