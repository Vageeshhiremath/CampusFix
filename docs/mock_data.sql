-- Insert Mock Data
INSERT INTO departments (department_name)
VALUES ('Computer Science'), ('Facilities')
ON CONFLICT (department_name) DO NOTHING;

INSERT INTO users (department_id, full_name, email, password_hash, role)
SELECT d.department_id, seed.full_name, seed.email, seed.password_hash, seed.role::user_role
FROM (
    VALUES
        ('Computer Science', 'Alice Student', 'alice@campus.edu', 'hash123', 'STUDENT'),
        ('Facilities', 'Bob Technician', 'bob@campus.edu', 'hash456', 'TECHNICIAN'),
        ('Facilities', 'Admin User', 'admin@campus.edu', 'hash789', 'ADMIN')
) AS seed(department_name, full_name, email, password_hash, role)
JOIN departments d ON d.department_name = seed.department_name
ON CONFLICT (email) DO UPDATE SET
    department_id = EXCLUDED.department_id,
    full_name = EXCLUDED.full_name,
    password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role,
    is_active = TRUE;

INSERT INTO rooms (building_id, room_number, room_type, floor_number)
SELECT b.building_id, '606', 'Classroom', 6
FROM buildings b
WHERE b.building_name = 'Science Block'
ON CONFLICT (building_id, room_number) DO NOTHING;

INSERT INTO rooms (building_id, room_number, room_type, floor_number)
SELECT b.building_id, '401', 'Classroom', 4
FROM buildings b
WHERE b.building_name = 'Science Block'
ON CONFLICT (building_id, room_number) DO UPDATE
SET floor_number = EXCLUDED.floor_number,
    room_type = EXCLUDED.room_type;

INSERT INTO buildings (building_name) VALUES ('Science Block');
INSERT INTO rooms (building_id, room_number) VALUES (1, '101'), (1, '102');

INSERT INTO issue_categories (category_name, default_severity) 
VALUES ('Electrical', 'HIGH'), ('Network', 'CRITICAL'), ('Plumbing', 'MEDIUM');

INSERT INTO issues (reported_by, room_id, category_id, title, description, severity, priority_score, affected_users, location_criticality, recurrence_factor) 
VALUES (1, 1, 1, 'Projector broken', 'Projector in room 101 is not turning on.', 'HIGH', 10.0, 30, 4, 1);

-- Transaction: Assign Bob to the Issue
BEGIN;
INSERT INTO issue_assignments (issue_id, technician_id, assignment_notes) 
VALUES (1, 2, 'Assigned via emergency dispatch transaction.');
UPDATE issues SET status = 'ASSIGNED', assessed_at = CURRENT_TIMESTAMP WHERE issue_id = 1;
COMMIT;