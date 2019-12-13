import AbstractComponent from './abstract-component.js';

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return `\
    <input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${count ? `` : `disabled`}
    />
    <label for="filter__${name}" class="filter__label">
      ${name[0].toUpperCase() + name.slice(1)} <span class="filter__${name}-count">${count}</span>
    </label>`;
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return `\
    <section class="main__filter filter container">
      ${filtersMarkup}
    </section>`;
};

class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}

export default Filter;
