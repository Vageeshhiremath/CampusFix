-- CAMPUSFIX: DML Operations and Advanced Database Features
-- SECTION 1: DML OPERATIONS

-- 1.1 INSERT — Insert a new issue using the stored function
INSERT INTO issues (
    reported_by, room_id, category_id, title, description, 
    severity, priority_score, affected_users, location_criticality, recurrence_factor
) VALUES (
    1, 1, 1, 
    'Wi-Fi router down in Lab 101', 
    'No internet connectivity in the computer lab during practical exam.', 
    'CRITICAL', 
    calculate_priority_score('CRITICAL', 40, 5, 1),
    40, 5, 1
) RETURNING issue_id, title, severity, priority_score, status;

-- 1.2 SELECT — Retrieve recent issues sorted by priority
SELECT 
    issue_id, 
    title, 
    severity, 
    priority_score, 
    status, 
    affected_users
FROM issues 
ORDER BY issue_id DESC 
LIMIT 5;

-- 1.3 UPDATE — Update issue status (fires the trigger)
UPDATE issues 
SET status = 'IN_PROGRESS', assessed_at = CURRENT_TIMESTAMP 
WHERE issue_id = (SELECT MAX(issue_id) FROM issues)
RETURNING issue_id, title, status, assessed_at;

-- 1.4 DELETE — Safe demonstration (no damage)
DELETE FROM issues WHERE issue_id = 99999;

-- 1.5 JOIN + GROUP BY + HAVING + ORDER BY
-- Buildings with the highest number of unresolved issues
SELECT 
    b.building_name, 
    COUNT(i.issue_id) AS unresolved_count,
    AVG(i.priority_score) AS avg_priority
FROM issues i
JOIN rooms r ON i.room_id = r.room_id
JOIN buildings b ON r.building_id = b.building_id
WHERE i.status NOT IN ('RESOLVED', 'CLOSED')
GROUP BY b.building_name
HAVING COUNT(i.issue_id) > 0
ORDER BY unresolved_count DESC, avg_priority DESC;



-- 1.6 CORRELATED SUBQUERY
-- Technicians handling more assignments than the average
SELECT 
    u.full_name, 
    u.role,
    COUNT(a.assignment_id) AS total_assignments
FROM issue_assignments a
JOIN users u ON a.technician_id = u.user_id
GROUP BY u.full_name, u.role
HAVING COUNT(a.assignment_id) > (
    SELECT AVG(assignment_count)
    FROM (
        SELECT COUNT(*) AS assignment_count
        FROM issue_assignments
        GROUP BY technician_id
    ) AS sub
);


-- SECTION 2: ADVANCED DATABASE FEATURES

-- 2.1 VIEW — Unresolved issues (4-table JOIN)
SELECT * FROM vw_unresolved_issues;


-- 2.2 STORED FUNCTION — Priority score across severities
SELECT 
    'CRITICAL'::issue_severity AS severity, 
    50 AS users, 5 AS criticality, 2 AS recurrence,
    calculate_priority_score('CRITICAL', 50, 5, 2) AS score
UNION ALL
SELECT 'HIGH', 25, 4, 1, calculate_priority_score('HIGH', 25, 4, 1)
UNION ALL
SELECT 'MEDIUM', 10, 3, 1, calculate_priority_score('MEDIUM', 10, 3, 1)
UNION ALL
SELECT 'LOW', 1, 1, 1, calculate_priority_score('LOW', 1, 1, 1);



-- 2.3 TRIGGER — Auto-logged status history
SELECT * FROM status_history ORDER BY history_id DESC LIMIT 5;


-- 2.4 TRANSACTION — Atomic assignment + status update
BEGIN;

INSERT INTO issue_assignments (issue_id, technician_id, assignment_notes) 
VALUES (11, 2, 'Assigned during transaction demo.');

UPDATE issues 
SET status = 'ASSIGNED', assessed_at = CURRENT_TIMESTAMP 
WHERE issue_id = 11;

COMMIT;

-- Verify both operations succeeded
SELECT 'Assignment Exists' AS check_type, COUNT(*)::TEXT AS result 
FROM issue_assignments WHERE issue_id = 11 AND technician_id = 2
UNION ALL
SELECT 'Status = ASSIGNED', COUNT(*)::TEXT 
FROM issues WHERE issue_id = 11 AND status = 'ASSIGNED';

-- 2.5 ROLLBACK — Transactional safety demonstration
SELECT 'before_transaction' AS stage, COUNT(*)::TEXT AS issue_count FROM issues
UNION ALL
SELECT 'after_delete_in_txn', (
    SELECT COUNT(*)::TEXT FROM issues WHERE issue_id != 1
)
UNION ALL
SELECT 'after_rollback', (SELECT COUNT(*)::TEXT FROM issues);
