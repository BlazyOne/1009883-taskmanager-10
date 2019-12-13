import AbstractComponent from './abstract-component.js';

const createNoTasksTemplate = () =>
  `<p class="board__no-tasks">
    Click «ADD NEW TASK» in menu to create your first task
  </p>`;

class NoTasks extends AbstractComponent {
  getTemplate() {
    return createNoTasksTemplate();
  }
}

export default NoTasks;
