import {getRandomIntegerNumber} from '../utils/common.js';

const FILTER_MAX = 10;

const FILTER_NAMES = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const generateFilters = () =>
  FILTER_NAMES.map((it) =>
    ({
      name: it,
      count: getRandomIntegerNumber(0, FILTER_MAX)
    }));

export {generateFilters};
