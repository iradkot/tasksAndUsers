import instance from './axiosInstance';
import * as routes from './routes';

// USERS
export const getAllUsers = () => {
    return instance.get(routes.users);
};
export const addAUser = (newUserObject) => {
    return instance.post(routes.users, newUserObject);
};
export const editAUser = ({ newUserObject, id }) => {
    return instance.put(routes.user(id), newUserObject);
};
export const deleteAUser = ({ id }) => {
    return instance.delete(routes.user(id));
};

// TASKS STATUSES
export const getTasksStatuses = () => instance.get(routes.tasksStatuses);

// TASKS
export const getUserTasks = (userId) => {
  return instance.get(routes.userTasks(userId));
};
export const addATask = ({ userId, name }) => {
  return instance.post(routes.userTasks(userId), {name});
};
export const editATask = ({ name, id }) => {
  return instance.put(routes.task(id), {name});
};
export const deleteATask = ({ id }) => {
  return instance.delete(routes.task(id));
};
