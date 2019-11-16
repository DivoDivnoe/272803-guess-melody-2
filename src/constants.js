const GameType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  RESET: `RESET`,
  INCREMENT_TIME: `INCREMENT_TIME`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
  AUTH_USER: `AUTH_USER`
};

const gameSettings = {
  time: 300,
  mistakes: 3
};

export {
  GameType,
  ActionType,
  gameSettings
};
