import moment from 'moment';

const getRandomBoolean = () => Math.random() >= 0.5;

const getRandomIntegerNumber = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

const getRandomArrayItem = (array) => array[getRandomIntegerNumber(0, array.length - 1)];

// Fisher-Yates shuffle
const shuffle = (data) => {
  for (let i = data.length - 1; i > 0; i--) {
    let j = getRandomIntegerNumber(0, i);

    [data[i], data[j]] = [data[j], data[i]];
  }
};

const formatTime = (date) =>
  moment(date).format(`hh:mm A`);

const formatDate = (date) =>
  moment(date).format(`DD MMMM`);

export {getRandomBoolean, getRandomIntegerNumber, getRandomArrayItem, shuffle, formatTime, formatDate};
