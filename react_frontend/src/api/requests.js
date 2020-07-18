import instance from './axiosInstance';
import * as routes from './routes';

// TASKS
export const getAllTasks = () => {
  return instance.get(routes.tasks);
};
export const addATask = ({ description }) => {
  return instance.post(routes.tasks, {description});
};
export const editATask = ({ description, id }) => {
  return instance.put(routes.task(id), {description});
};
export const deleteATask = ({ id }) => {
  return instance.delete(routes.task(id));
};
