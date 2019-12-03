import {COLORS} from '../const.js';
import {getRandomIntegerNumber, getRandomArrayItem, shuffle} from '../utils.js';

const TAGS_MAX = 3;

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false
};

const Tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() >= 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () =>
  Object.assign({}, DefaultRepeatingDays, {
    'mo': Math.random() >= 0.5
  });

const generateTags = (tags) => {
  let tagsCopy = tags.slice();
  shuffle(tagsCopy);
  return tagsCopy.slice(0, getRandomIntegerNumber(0, TAGS_MAX));
};

const generateTask = () => {
  const dueDate = Math.random() >= 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: getRandomArrayItem(COLORS),
    isFavorite: Math.random() >= 0.5,
    isArchive: Math.random() >= 0.5
  };
};

const generateTasks = (count) =>
  new Array(count).fill(``).map(generateTask);

export {generateTasks};
