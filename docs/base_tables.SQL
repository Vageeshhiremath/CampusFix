
CREATE TYPE user_role AS ENUM (
    'STUDENT',
    'STAFF',
    'TECHNICIAN',
    'ADMIN'
);

CREATE TYPE issue_status AS ENUM (
    'REPORTED',
    'ASSESSED',
    'ASSIGNED',
    'IN_PROGRESS',
    'ON_HOLD',
    'RESOLVED',
    'CLOSED'
);

CREATE TYPE issue_severity AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
);

CREATE TYPE asset_status AS ENUM (
    'ACTIVE',
    'DAMAGED',
    'UNDER_MAINTENANCE',
    'RETIRED'
);

CREATE TABLE departments (
    department_id BIGSERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    department_id BIGINT,

    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'STUDENT',
    phone VARCHAR(20),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_users_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE buildings (
    building_id BIGSERIAL PRIMARY KEY,

    building_name VARCHAR(120) NOT NULL UNIQUE,
    location VARCHAR(255),
    description TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
    room_id BIGSERIAL PRIMARY KEY,

    building_id BIGINT NOT NULL,
    room_number VARCHAR(30) NOT NULL,
    room_type VARCHAR(50),
    floor_number INTEGER,
    capacity INTEGER,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_rooms_building
        FOREIGN KEY (building_id)
        REFERENCES buildings(building_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_room_in_building
        UNIQUE (building_id, room_number),

    CONSTRAINT chk_room_floor
        CHECK (floor_number IS NULL OR floor_number >= 0),

    CONSTRAINT chk_room_capacity
        CHECK (capacity IS NULL OR capacity > 0)
);


/* ---------------------------------------------------------
   6. ISSUE CATEGORIES
   --------------------------------------------------------- */

CREATE TABLE issue_categories (
    category_id BIGSERIAL PRIMARY KEY,

    category_name VARCHAR(80) NOT NULL UNIQUE,
    default_severity issue_severity NOT NULL DEFAULT 'MEDIUM',
    description TEXT
);

CREATE TABLE assets (
    asset_id BIGSERIAL PRIMARY KEY,

    room_id BIGINT,

    asset_name VARCHAR(120) NOT NULL,
    asset_type VARCHAR(80) NOT NULL,
    serial_number VARCHAR(100) UNIQUE,
    purchase_date DATE,

    status asset_status NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_assets_room
        FOREIGN KEY (room_id)
        REFERENCES rooms(room_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);


/* ---------------------------------------------------------
   8. ISSUES
   --------------------------------------------------------- */

CREATE TABLE issues (
    issue_id BIGSERIAL PRIMARY KEY,

    reported_by BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    asset_id BIGINT,
    category_id BIGINT NOT NULL,

    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,

    severity issue_severity NOT NULL DEFAULT 'MEDIUM',
    priority_score NUMERIC(8,2) NOT NULL DEFAULT 0,

    status issue_status NOT NULL DEFAULT 'REPORTED',

    affected_users INTEGER NOT NULL DEFAULT 1,
    location_criticality INTEGER NOT NULL DEFAULT 1,
    recurrence_factor INTEGER NOT NULL DEFAULT 1,

    reported_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assessed_at TIMESTAMP,
    resolved_at TIMESTAMP,
    closed_at TIMESTAMP,

    CONSTRAINT fk_issues_reporter
        FOREIGN KEY (reported_by)
        REFERENCES users(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_issues_room
        FOREIGN KEY (room_id)
        REFERENCES rooms(room_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_issues_asset
        FOREIGN KEY (asset_id)
        REFERENCES assets(asset_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT fk_issues_category
        FOREIGN KEY (category_id)
        REFERENCES issue_categories(category_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_priority_score
        CHECK (priority_score >= 0),

    CONSTRAINT chk_affected_users
        CHECK (affected_users >= 1),

    CONSTRAINT chk_location_criticality
        CHECK (location_criticality BETWEEN 1 AND 5),

    CONSTRAINT chk_recurrence_factor
        CHECK (recurrence_factor BETWEEN 1 AND 3),

    CONSTRAINT chk_resolved_date
        CHECK (
            resolved_at IS NULL
            OR resolved_at >= reported_at
        ),

    CONSTRAINT chk_closed_date
        CHECK (
            closed_at IS NULL
            OR resolved_at IS NOT NULL
        )
);


/* ---------------------------------------------------------
   9. ISSUE ASSIGNMENTS
   --------------------------------------------------------- */

CREATE TABLE issue_assignments (
    assignment_id BIGSERIAL PRIMARY KEY,

    issue_id BIGINT NOT NULL,
    technician_id BIGINT NOT NULL,

    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP,
    completed_at TIMESTAMP,

    assignment_notes TEXT,

    CONSTRAINT fk_assignment_issue
        FOREIGN KEY (issue_id)
        REFERENCES issues(issue_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_assignment_technician
        FOREIGN KEY (technician_id)
        REFERENCES users(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT uq_issue_technician
        UNIQUE (issue_id, technician_id),

    CONSTRAINT chk_assignment_dates
        CHECK (
            completed_at IS NULL
            OR completed_at >= assigned_at
        )
);


/* ---------------------------------------------------------
   10. STATUS HISTORY
   --------------------------------------------------------- */

CREATE TABLE status_history (
    history_id BIGSERIAL PRIMARY KEY,

    issue_id BIGINT NOT NULL,

    old_status issue_status,
    new_status issue_status NOT NULL,

    changed_by BIGINT NOT NULL,
    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    remarks TEXT,

    CONSTRAINT fk_history_issue
        FOREIGN KEY (issue_id)
        REFERENCES issues(issue_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_history_user
        FOREIGN KEY (changed_by)
        REFERENCES users(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);


/* ---------------------------------------------------------
   11. MAINTENANCE LOGS
   --------------------------------------------------------- */

CREATE TABLE maintenance_logs (
    log_id BIGSERIAL PRIMARY KEY,

    issue_id BIGINT NOT NULL,
    technician_id BIGINT NOT NULL,

    action_taken TEXT NOT NULL,
    remarks TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_maintenance_issue
        FOREIGN KEY (issue_id)
        REFERENCES issues(issue_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_maintenance_technician
        FOREIGN KEY (technician_id)
        REFERENCES users(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);


/* ---------------------------------------------------------
   12. RESOURCES
   --------------------------------------------------------- */

CREATE TABLE resources (
    resource_id BIGSERIAL PRIMARY KEY,

    resource_name VARCHAR(120) NOT NULL UNIQUE,
    quantity_available NUMERIC(10,2) NOT NULL DEFAULT 0,
    unit VARCHAR(30) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_resource_quantity
        CHECK (quantity_available >= 0)
);


/* ---------------------------------------------------------
   13. ISSUE RESOURCES
   --------------------------------------------------------- */

CREATE TABLE issue_resources (
    issue_id BIGINT NOT NULL,
    resource_id BIGINT NOT NULL,

    quantity_used NUMERIC(10,2) NOT NULL,

    PRIMARY KEY (issue_id, resource_id),

    CONSTRAINT fk_issue_resources_issue
        FOREIGN KEY (issue_id)
        REFERENCES issues(issue_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_issue_resources_resource
        FOREIGN KEY (resource_id)
        REFERENCES resources(resource_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_quantity_used
        CHECK (quantity_used > 0)
);


/*14. INDEXES*/

CREATE INDEX idx_users_role
    ON users(role);

CREATE INDEX idx_users_department
    ON users(department_id);

CREATE INDEX idx_rooms_building
    ON rooms(building_id);

CREATE INDEX idx_assets_room
    ON assets(room_id);

CREATE INDEX idx_assets_status
    ON assets(status);

CREATE INDEX idx_issues_reported_by
    ON issues(reported_by);

CREATE INDEX idx_issues_room
    ON issues(room_id);

CREATE INDEX idx_issues_category
    ON issues(category_id);

CREATE INDEX idx_issues_status
    ON issues(status);

CREATE INDEX idx_issues_severity
    ON issues(severity);

CREATE INDEX idx_issues_reported_at
    ON issues(reported_at);

CREATE INDEX idx_issues_priority
    ON issues(priority_score DESC);

CREATE INDEX idx_assignments_technician
    ON issue_assignments(technician_id);

CREATE INDEX idx_assignments_issue
    ON issue_assignments(issue_id);

CREATE INDEX idx_status_history_issue
    ON status_history(issue_id);

CREATE INDEX idx_maintenance_issue
    ON maintenance_logs(issue_id);

CREATE INDEX idx_maintenance_technician
    ON maintenance_logs(technician_id);

CREATE INDEX idx_issue_resources_resource
    ON issue_resources(resource_id);





