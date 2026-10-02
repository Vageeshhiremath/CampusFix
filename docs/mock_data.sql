-- Insert Mock Data
INSERT INTO departments (department_name) VALUES ('Computer Science'), ('Facilities');

INSERT INTO users (department_id, full_name, email, password_hash, role) 
VALUES (1, 'Alice Student', 'alice@campus.edu', 'hash123', 'STUDENT'),
       (2, 'Bob Technician', 'bob@campus.edu', 'hash456', 'TECHNICIAN'),
       (2, 'Admin User', 'admin@campus.edu', 'hash789', 'ADMIN');

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