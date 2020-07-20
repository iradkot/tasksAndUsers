export const HOST = 'http://localhost:5000';

export const users = '/users';
export const user = (id) => `${users}/${id}`;

export const tasksStatuses = `/tasks_statuses`;

export const userTasks = (user_id) => `/tasks?user_id=${user_id}`;
export const task = (user_id, id) => `${userTasks(user_id)}/${id}`;
