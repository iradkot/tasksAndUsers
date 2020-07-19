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
    name VARCHAR(50),
);

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    user_id int NOT NULL,
    status_id int NOT NULL,
    description VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (status_id) REFERENCES tasks_statuses(status_id) ON DELETE CASCADE
);
