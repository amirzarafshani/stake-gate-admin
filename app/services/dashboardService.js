import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authHeaderJson, headerJson } from '../utils/auth-header';

import config from '../config';
const apiUrl = config.apiUrl;

const model = 'dashboard';

const dashboardService = {
  getAll,
};

function getAll(params) {
  const url = `${apiUrl}${model}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}

export default dashboardService;
