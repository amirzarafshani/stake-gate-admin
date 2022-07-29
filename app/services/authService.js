import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { headerJson } from '../utils/auth-header';

import config from '../config';
const apiUrl = config.apiUrl;
const rootUrl = config.rootUrl;

const model = 'auth/';

const authService = {
  login,
};

function login(dto) {
  const url = `${rootUrl}${model}login`;
  axios.interceptors.response.use(handleSuccess, handleError);

  let headers = { 'Content-Type': 'application/json; charset=utf-8' };
  return axios.post(url, dto, { headers: headerJson() });
}

export default authService;
