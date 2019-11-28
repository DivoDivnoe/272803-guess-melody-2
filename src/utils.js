const SECONDS_PER_MINUTE = 60;

const parseTime = (seconds) => {
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const restSeconds = seconds - minutes * SECONDS_PER_MINUTE;

  return {minutes, seconds: restSeconds};
};

const getTimeEnding = (number) => {
  const endings = [`ы`, `у`, `а`, ``];
  let index;

  if (number >= 11 && number <= 20) {
    index = 3;
  } else if (number % 10 === 1) {
    index = 2;
  } else if ([2, 3, 4].includes(number)) {
    index = 0;
  } else {
    index = 1;
  }

  return endings[index];
};

const addLeadingZero = (number) => {
  return `${number < 10 ? 0 : ``}${number}`;
};

export {parseTime, addLeadingZero, getTimeEnding};
