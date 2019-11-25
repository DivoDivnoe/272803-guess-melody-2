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
  AUTH_USER: `AUTH_USER`,
  SET_USER_DATA: `SET_USER_DATA`
};

const gameSettings = {
  time: 300,
  mistakes: 3
};

const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  ECONNABORTED: `ECONNABORTED`
};

const apiSettings = {
  HOST: `https://es31-server.appspot.com/guess-melody`,
  TIMEOUT: 5000
};

const LoseType = {
  TIMEOUT: `timeout`,
  MANY_MISTAKES: `mistakes`
};

export {
  GameType,
  ActionType,
  StatusCode,
  gameSettings,
  apiSettings,
  LoseType
};
