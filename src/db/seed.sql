-- Drop tables if they exist
DROP TABLE IF EXISTS profiles, tasks CASCADE;

-- Create tables
CREATE TABLE profiles (
  user_id uuid REFERENCES auth.users(id),
  profile_image TEXT,
  PRIMARY KEY (user_id)
);

CREATE TABLE tasks (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  task_title VARCHAR(255),
  task_description TEXT,
  due_date DATE,
  priority VARCHAR(255),
  status VARCHAR(255)
);

-- Seed data
INSERT INTO profiles (user_id, profile_image)
VALUES
    ('6b869d31-4c41-49bf-8be6-4cbb48d42249', 'https://avatars.githubusercontent.com/u/113629390?s=400&u=4a9ec4e8bca76b6c78f36952c3b973f34b3ff8c6&v=4');

INSERT INTO tasks (user_id, task_title, task_description, due_date, priority, status)
VALUES
    ('6b869d31-4c41-49bf-8be6-4cbb48d42249', 'Coding', 'Keep coding to enhance my skills', '2023-10-24', 'High', 'Complete');
