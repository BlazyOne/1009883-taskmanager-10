import SortComponent from '../components/sort.js';
import TasksComponent from '../components/tasks.js';
import TaskComponent from '../components/task.js';
import TaskEditComponent from '../components/task-edit.js';
import NoTasksComponent from '../components/no-tasks.js';
import LoadMoreButtonComponent from '../components/load-more-button.js';
import {render, remove, replace} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const taskComponent = new TaskComponent(task);

  taskComponent.setEditButtonClickHandler(replaceTaskToEdit);

  const taskEditComponent = new TaskEditComponent(task);

  taskEditComponent.setSubmitHandler(replaceEditToTask);

  render(taskListElement, taskComponent);
};

const renderTasks = (taskListElement, tasks) =>
  tasks.forEach((task) =>
    renderTask(taskListElement, task)
  );

class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const renderLoadMoreButton = (sortedTasks) => {
      if (showingTasksCount >= sortedTasks.length) {
        return;
      }

      render(container, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

        renderTasks(taskListElement, sortedTasks.slice(prevTasksCount, showingTasksCount));

        if (showingTasksCount >= sortedTasks.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent);
      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
    renderLoadMoreButton(tasks);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedTasks = [];

      switch (sortType) {
        case `date-up`:
          sortedTasks = tasks.slice().sort((a, b) => {
            if (!a.dueDate) {
              return 1;
            } else if (!b.dueDate) {
              return -1;
            } else {
              return a.dueDate - b.dueDate;
            }
          });
          break;
        case `date-down`:
          sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
          break;
        case `default`:
          sortedTasks = tasks.slice();
          break;
      }

      remove(this._loadMoreButtonComponent);
      taskListElement.innerHTML = ``;

      showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

      renderTasks(taskListElement, sortedTasks.slice(0, showingTasksCount));

      renderLoadMoreButton(sortedTasks);
    });
  }
}

export default BoardController;
