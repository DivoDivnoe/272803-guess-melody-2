import NameSpace from '../name-space';

const getIsAuthorizationRequired = (state) => {
  return state[NameSpace.USER].isAuthorizationRequired;
};

const getUserData = (state) => {
  return state[NameSpace.USER].user;
};

export {
  getIsAuthorizationRequired,
  getUserData
};
