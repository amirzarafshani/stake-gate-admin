import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import {
  authHeaderJson,
  headerJson,
  authHeader,
  authHeaderFormData,
} from '../utils/auth-header';

import config from '../config';
const apiUrl = config.apiUrl;

const model = 'sliders/';

const slidersService = {
  getAll,
  getById,
  edit,
  add,
  delete: _delete,
};

function getAll() {
  const url = `${apiUrl}${model}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}

function getById(id) {
  const url = `${apiUrl}${model}${id}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}

function add(dto) {
  console.log('hereee');
  console.log(dto);
  const url = `${apiUrl}${model}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.post(url, dto, { headers: authHeaderFormData() });
}

function edit(id, dto) {
  const url = `${apiUrl}${model}${id}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.put(url, dto, { headers: authHeaderJson() });
}

function _delete(id) {
  const url = `${apiUrl}${model}${id}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.delete(url, { headers: authHeader() });
}

export default slidersService;
