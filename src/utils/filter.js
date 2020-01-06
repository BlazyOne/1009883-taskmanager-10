import {isRepeating, isOneDay, isOverdueDate} from './common.js';

const getArchiveTasks = (tasks) => tasks.filter((task) => task.isArchive);

const getNotArchiveTasks = (tasks) => tasks.filter((task) => !task.isArchive);

const getFavoriteTasks = (tasks) => tasks.filter((task) => task.isFavorite);

const getOverdueTasks = (tasks, date) => tasks.filter((task) => {
  const dueDate = task.dueDate;

  if (!dueDate) {
    return false;
  }

  return isOverdueDate(dueDate, date);
});

const getRepeatingTasks = (tasks) => tasks.filter((task) => isRepeating(task.repeatingDays));

const getTasksWithHashtags = (tasks) => tasks.filter((task) => task.tags.size);

const getTasksInOneDay = (tasks, date) => tasks.filter((task) => isOneDay(task.dueDate, date));

const getTasksByFilter = (tasks, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case `all`:
      return getNotArchiveTasks(tasks);
    case `archive`:
      return getArchiveTasks(tasks);
    case `favorites`:
      return getFavoriteTasks(getNotArchiveTasks(tasks));
    case `overdue`:
      return getOverdueTasks(getNotArchiveTasks(tasks), nowDate);
    case `repeating`:
      return getRepeatingTasks(getNotArchiveTasks(tasks));
    case `tags`:
      return getTasksWithHashtags(getNotArchiveTasks(tasks));
    case `today`:
      return getTasksInOneDay(getNotArchiveTasks(tasks), nowDate);
  }

  return tasks;
};

export {getArchiveTasks, getNotArchiveTasks, getFavoriteTasks, getOverdueTasks, getRepeatingTasks, getTasksWithHashtags, getTasksInOneDay, getTasksByFilter};
