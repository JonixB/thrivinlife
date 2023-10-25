import { supabase } from '../lib/helper/supabase';

const sqlScript = `
-- Drop tables if they exist
DROP TABLE IF EXISTS Profile, Task CASCADE;

-- Create tables
CREATE TABLE Profile (
  UserID uuid REFERENCES auth.users(id),
  ProfileImage VARCHAR(255),
  PRIMARY KEY (UserID)
);

CREATE TABLE Task (
  TaskID serial PRIMARY KEY,
  UserID uuid REFERENCES auth.users(id),
  TaskTitle VARCHAR(255),
  TaskDescription TEXT,
  DueDate DATE,
  Priority VARCHAR(255),
  Status VARCHAR(255)
);

-- Seed data
INSERT INTO Profile (UserID, ProfileImage, Preferences)
VALUES
    ('6b869d31-4c41-49bf-8be6-4cbb48d42249', 'https://avatars.githubusercontent.com/u/113629390?s=400&u=4a9ec4e8bca76b6c78f36952c3b973f34b3ff8c6&v=4');

INSERT INTO Task (UserID, TaskTitle, TaskDescription, DueDate, Priority, Status)
VALUES
    ('6b869d31-4c41-49bf-8be6-4cbb48d42249', 'Coding', 'Keep coding to enhance my skills', '2023-10-24', 'High', 'Complete');
`;
