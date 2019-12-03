import {getRandomIntegerNumber} from '../utils.js';

const FILTER_MAX = 10;

const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const generateFilters = () =>
  filterNames.map((it) =>
    ({
      name: it,
      count: getRandomIntegerNumber(0, FILTER_MAX)
    }));

export {generateFilters};
