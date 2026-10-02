-- 1. Test the VIEW
SELECT * FROM vw_unresolved_issues;

-- 2. Test the STORED FUNCTION
SELECT calculate_priority_score('CRITICAL', 50, 5, 2) AS test_priority_score;

-- 3. Verify the TRIGGER worked
SELECT * FROM status_history;

-- 4. Verify the TRANSACTION worked
SELECT * FROM issue_assignments;

-- 5. Complex Query (JOIN, GROUP BY, HAVING)
SELECT 
    b.building_name, 
    COUNT(i.issue_id) AS unresolved_count
FROM issues i
JOIN rooms r ON i.room_id = r.room_id
JOIN buildings b ON r.building_id = b.building_id
WHERE i.status NOT IN ('RESOLVED', 'CLOSED')
GROUP BY b.building_name
HAVING COUNT(i.issue_id) > 0
ORDER BY unresolved_count DESC;