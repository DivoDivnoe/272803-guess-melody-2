import axios from 'axios';
import {ActionCreator} from './reducer/user/user';
import {StatusCode, apiSettings} from './constants';
import {useHistory} from 'react-router-dom';

const createApi = (dispatch) => {
  const api = axios.create({
    baseURL: apiSettings.HOST,
    timeout: apiSettings.TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.status === StatusCode.UNAUTHORIZED) {
      const history = useHistory();

      history.push(`/auth`);
    }

    return Promise.reject(error);
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createApi;
