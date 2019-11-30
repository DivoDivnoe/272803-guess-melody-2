import NameSpace from '../name-space';

const getStep = (state) => state[NameSpace.GAME].step;
const getMistakes = (state) => state[NameSpace.GAME].mistakes;
const getGameTime = (state) => state[NameSpace.GAME].gameTime;
const getLastAnswerTime = (state) => state[NameSpace.GAME].lastAnswerTime;
const getPoints = (state) => state[NameSpace.GAME].points;

export {
  getStep,
  getMistakes,
  getGameTime,
  getLastAnswerTime,
  getPoints
};
