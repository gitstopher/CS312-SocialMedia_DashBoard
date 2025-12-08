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


-- ===============================
-- Table: daily_metrics
-- ===============================

CREATE TABLE daily_metrics (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    platform VARCHAR(50) NOT NULL,
    followers_count INT,
    engagement_rate NUMERIC(5,2),
    reach INT,
    posts_count INT,
    UNIQUE (date, platform)
);

CREATE INDEX idx_daily_metrics_date ON daily_metrics(date);
CREATE INDEX idx_daily_metrics_platform ON daily_metrics(platform);


-- ===============================
-- Table: post_performance
-- ===============================

CREATE TABLE post_performance (
    post_id SERIAL PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    shares INT DEFAULT 0,
    reach INT DEFAULT 0,
    engagement_rate NUMERIC(5,2),
    posted_date DATE NOT NULL
);

CREATE INDEX idx_post_performance_date ON post_performance(posted_date);
CREATE INDEX idx_post_performance_platform ON post_performance(platform);

-- ===============================
-- Table: scheduled_posts
-- ===============================

CREATE TABLE scheduled_posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    platform VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    media_urls TEXT[],
    scheduled_datetime TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',  -- pending | published | failed
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES accounts(id) ON DELETE CASCADE
);


-- ===============================
-- Table: post_history
-- ===============================

CREATE TABLE post_history (
    id SERIAL PRIMARY KEY,
    scheduled_post_id INT NOT NULL,
    action VARCHAR(50) NOT NULL,   -- created, edited, deleted, published, failed
    timestamp TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (scheduled_post_id) REFERENCES scheduled_posts(id) ON DELETE CASCADE
);
