import {COLORS, DAYS} from '../const.js';
import {getRandomBoolean, getRandomIntegerNumber, getRandomArrayItem, shuffle} from '../utils.js';

const TAGS_MAX = 3;

const DESCRIPTION_ITEMS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const DEFAULT_REPEATING_DAYS = DAYS.reduce((acc, day) => {
  acc[day] = false;
  return acc;
}, {});

const TAGS = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomArrayItem([-1, 1]);
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () =>
  Object.assign({}, DEFAULT_REPEATING_DAYS, {
    'mo': getRandomBoolean()
  });

const generateTags = (tags) => {
  let tagsCopy = tags.slice();
  shuffle(tagsCopy);
  return tagsCopy.slice(0, getRandomIntegerNumber(0, TAGS_MAX));
};

const generateTask = (...rest) => {
  const dueDate = getRandomBoolean() ? null : getRandomDate();

  return {
    id: rest[1] + 1,
    description: getRandomArrayItem(DESCRIPTION_ITEMS),
    dueDate,
    repeatingDays: dueDate ? DEFAULT_REPEATING_DAYS : generateRepeatingDays(),
    tags: new Set(generateTags(TAGS)),
    color: getRandomArrayItem(COLORS),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean()
  };
};

const generateTasks = (count) =>
  Array.from({length: count}, generateTask);

export {generateTasks};
