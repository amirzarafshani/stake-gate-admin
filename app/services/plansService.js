import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authHeaderJson, headerJson } from '../utils/auth-header';

import config from '../config';
const apiUrl = config.apiUrl;

const model = 'plans/';

const plansService = {
  getAll,
  getById,
  edit,
  add,
};

function getAll() {
  const url = `${apiUrl}${model}`;
  console.log(authHeaderJson());
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}

function getById(id) {
  const url = `${apiUrl}${model}${id}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}

function add(dto) {
  const url = `${apiUrl}${model}`;
  console.log(url);
  console.log(dto);
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.post(url, dto, { headers: authHeaderJson() });
}

function edit(id, dto) {
  const url = `${apiUrl}${model}${id}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.put(url, dto, { headers: authHeaderJson() });
}

export default plansService;
