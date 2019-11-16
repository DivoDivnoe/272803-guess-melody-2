import NameSpace from '../name-space';

const getIsAuthorizationRequired = (state) => {
  return state[NameSpace.USER].isAuthorizationRequired;
};

export {
  getIsAuthorizationRequired
};
