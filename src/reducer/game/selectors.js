import NameSpace from '../name-space';

const getStep = (state) => state[NameSpace.GAME].step;
const getMistakes = (state) => state[NameSpace.GAME].mistakes;
const getGameTime = (state) => state[NameSpace.GAME].gameTime;

export {
  getStep,
  getMistakes,
  getGameTime
};
