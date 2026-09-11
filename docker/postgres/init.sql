-- SmartClean PostgreSQL initialization script
-- This runs on first container start

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- The application handles schema creation via JPA/Hibernate (ddl-auto: update in dev)
-- This file is for any additional setup needed

-- Create indexes that JPA might not auto-create
-- (These will be created by Hibernate annotations, but listed here for documentation)

-- Seed data is handled by the application's data.sql or via the API
