import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authHeaderJson, headerJson } from '../utils/auth-header';

import config from '../config';
const apiUrl = config.apiUrl;

const model = 'settings/';

const settingService = {
  getSetting,
  edit,
};

function getSetting() {
  const url = `${apiUrl}${model}`;
  console.log(authHeaderJson());
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}

function edit(dto) {
  const url = `${apiUrl}${model}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.put(url, dto, { headers: authHeaderJson() });
}

export default settingService;
