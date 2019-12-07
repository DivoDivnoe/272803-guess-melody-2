import NameSpace from '../name-space';
import {createSelector} from 'reselect';

const getStep = (state) => state[NameSpace.GAME].step;
const getMistakes = (state) => state[NameSpace.GAME].mistakes;
const getGameTime = (state) => state[NameSpace.GAME].gameTime;
const getLastAnswerTime = (state) => state[NameSpace.GAME].lastAnswerTime;
const getFastPoints = (state) => state[NameSpace.GAME].fastPoints;
const getSlowPoints = (state) => state[NameSpace.GAME].slowPoints;
const getPoints = createSelector(
    getFastPoints,
    getSlowPoints,
    (fast, slow) => fast + slow
);

export {
  getStep,
  getMistakes,
  getGameTime,
  getLastAnswerTime,
  getPoints,
  getFastPoints
};
