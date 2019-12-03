const getRandomIntegerNumber = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

const getRandomArrayItem = (array) => array[getRandomIntegerNumber(0, array.length - 1)];

// Fisher-Yates shuffle
const shuffle = (data) => {
  for (let i = data.length - 1; i > 0; i--) {
    let j = getRandomIntegerNumber(0, i);

    [data[i], data[j]] = [data[j], data[i]];
  }
};

const castTimeFormat = (value) => value < 10 ? `0${value}` : String(value);

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  if (hours === `00`) {
    hours = `12`;
  }
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};

export {getRandomIntegerNumber, getRandomArrayItem, formatTime, shuffle};
