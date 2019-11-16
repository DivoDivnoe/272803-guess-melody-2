import axios from 'axios';

const FORBIDDEN_STATUS_CODE = 403;

const createApi = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.status === FORBIDDEN_STATUS_CODE) {
      dispatch();
    }

    return error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createApi;
