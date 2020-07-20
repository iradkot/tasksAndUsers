CREATE DATABASE tasksdb;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    birth_date VARCHAR(10) NOT NULL
);

INSERT INTO users (email, name, surname, birth_date) VALUES ('irad16@gmail.com', 'Irad', 'Kotton', '1990-07-19');

DROP TABLE IF EXISTS tasks_statuses;
CREATE TABLE tasks_statuses(
    status_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO tasks_statuses (name) VALUES ('created'), ('in-process'), ('done');

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    user_id int NOT NULL,
    status_id int NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (status_id) REFERENCES tasks_statuses(status_id) ON DELETE CASCADE
);

-- insert a task to irad16@gmail.com with status of 'created'
SELECT user_id FROM users WHERE email = 'irad16@gmail.com';

INSERT INTO tasks (user_id, status_id, name)
    VALUES (
        (SELECT user_id FROM users WHERE email = 'irad16@gmail.com'),
        (SELECT status_id FROM tasks_statuses WHERE name = 'created'),
        'first dummy task'
    );

-- insert another task to irad16@gmail.com with status of 'in-progress'

INSERT INTO tasks (user_id, status_id, name)
    VALUES (
        (SELECT user_id FROM users WHERE email = 'irad16@gmail.com'),
        (SELECT status_id FROM tasks_statuses WHERE name = 'in-process'),
        'second dummy task'
    );

-- get all of user tasks with its task status
SELECT tasks.task_id, tasks.name, tasks_statuses.name as status FROM tasks
    FULL OUTER JOIN users on tasks.user_id = users.user_id
    FULL OUTER JOIN tasks_statuses on tasks.status_id = tasks_statuses.status_id
    WHERE users.user_id = 1;
