const SECONDS_PER_MINUTE = 60;

const parseTime = (seconds) => {
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const restSeconds = seconds - minutes * SECONDS_PER_MINUTE;

  return {minutes, seconds: restSeconds};
};

const addLeadingZero = (number) => {
  return `${number < 10 ? 0 : ``}${number}`;
};

export {parseTime, addLeadingZero};
