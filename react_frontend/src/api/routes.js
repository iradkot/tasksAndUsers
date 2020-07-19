export const HOST = 'http://localhost:5000';

export const users = '/users';
export const user = (id) => `${users}/${id}`;

export const tasks = '/tasks';
export const task = (id) => `${tasks}/${id}`;
