-- Drop tables if they exist
DROP TABLE IF EXISTS profiles, tasks CASCADE;

-- Create tables
CREATE TABLE profiles (
  user_id uuid REFERENCES auth.users(id),
  profile_image TEXT,
  PRIMARY KEY (user_id),
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE tasks (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  task_title VARCHAR(255),
  task_description TEXT,
  due_date DATE,
  priority INT2,
  status VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE incomes (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  date DATE,
  amount NUMERIC(10, 2),
  category TEXT,
  notes text
);

CREATE TABLE expenses (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  date DATE,
  category TEXT,
  amount NUMERIC(10, 2),
  payment_method TEXT,
  vendor TEXT,
  notes text
);

-- Seed data
INSERT INTO profiles (user_id, profile_image, first_name, last_name)
VALUES
    ('6b869d31-4c41-49bf-8be6-4cbb48d42249', 'https://avatars.githubusercontent.com/u/113629390?s=400&u=4a9ec4e8bca76b6c78f36952c3b973f34b3ff8c6&v=4', 'Nikko', 'Bansil');

INSERT INTO tasks (user_id, task_title, task_description, due_date, priority, status)
VALUES
    ('6b869d31-4c41-49bf-8be6-4cbb48d42249', 'Coding', 'Keep coding to enhance my skills', '2023-10-31', 4, 'Complete'),
    ('6b869d31-4c41-49bf-8be6-4cbb48d42249', 'Work on project', 'Start doing project features little by little', '2023-10-31', 5, 'Complete'),
    ('6b869d31-4c41-49bf-8be6-4cbb48d42249', 'Fix task form', 'Fix the sidebar as its also highlighted when adding new task', '2023-11-13', 4, 'Complete'),
    ('6b869d31-4c41-49bf-8be6-4cbb48d42249', 'Email', 'Display email instead of "Your Name"', '2023-11-13', 4, 'Complete'),
    ('6b869d31-4c41-49bf-8be6-4cbb48d42249', 'Task Summary', 'Make task summary to re-render on every update', '2023-11-13', 5, 'Complete');
