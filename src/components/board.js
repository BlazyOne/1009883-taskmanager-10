import AbstractComponent from './abstract-component.js';

const createBoardTemplate = () =>
  `<section class="board container"></section>`;

class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}

export default Board;
