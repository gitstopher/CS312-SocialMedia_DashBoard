-- Database: Social_Dashboard

-- DROP DATABASE IF EXISTS "Social_Dashboard";

CREATE DATABASE "Social_Dashboard"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
	\c Social_Dashboard;
	
	-- ===============================
-- Table: accounts
-- ===============================

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INT,
    platform VARCHAR(50),
    access_token TEXT
);

-- ===============================
-- Table: activities
-- ===============================

CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(50),
    content TEXT,
    type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);
	