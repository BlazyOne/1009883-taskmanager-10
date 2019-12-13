import AbstractComponent from './abstract-component.js';

const createLoadMoreButtonTemplate = () =>
  `<button class="load-more" type="button">load more</button>`;

class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

export default LoadMoreButton;
