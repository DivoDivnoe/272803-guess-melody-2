import axios from 'axios';
import {ActionCreator} from './reducer/user/user';
import {StatusCode, apiSettings} from './constants';

const createApi = (dispatch) => {
  const api = axios.create({
    baseURL: apiSettings.HOST,
    timeout: apiSettings.TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.status === StatusCode.FORBIDDEN) {
      dispatch(ActionCreator.authUser(true));
      return error;
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createApi;
