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

-- 6. CTE (Common Table Expression) - Syllabus Unit 2
-- Find issues with a priority score higher than the overall average
WITH AveragePriority AS (
    SELECT AVG(priority_score) AS avg_score FROM issues
)
SELECT issue_id, title, priority_score
FROM issues, AveragePriority
WHERE issues.priority_score > AveragePriority.avg_score;

-- 7. Window Function - Syllabus Unit 2
-- Rank technicians by the number of assignments they have
SELECT 
    u.full_name,
    COUNT(a.assignment_id) AS total_assignments,
    RANK() OVER (ORDER BY COUNT(a.assignment_id) DESC) as rank
FROM issue_assignments a
JOIN users u ON a.technician_id = u.user_id
GROUP BY u.full_name;
