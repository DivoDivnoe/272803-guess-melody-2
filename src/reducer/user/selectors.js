import NameSpace from '../name-space';

const getUserData = (state) => {
  return state[NameSpace.USER].user;
};

export {
  getUserData
};
