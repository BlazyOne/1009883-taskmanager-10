import AbstractComponent from './abstract-component.js';

const createSortTemplate = () =>
  `<div class="board__filter-list">
    <a href="#" data-sort-type="default" class="board__filter">SORT BY DEFAULT</a>
    <a href="#" data-sort-type="date-up" class="board__filter">SORT BY DATE up</a>
    <a href="#" data-sort-type="date-down" class="board__filter">SORT BY DATE down</a>
  </div>`;

class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = `default`;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}

export default Sort;
