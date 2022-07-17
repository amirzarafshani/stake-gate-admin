import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authHeaderJson, headerJson } from '../utils/auth-header';

import config from '../config';
const apiUrl = config.apiUrl;

const model = 'users/';

const usersService = {
  getAll,
  getById,
  edit,
  add,

  getBankAccounts,
  getWallets,
  getAssets,
  getOrders,
  getRequests,
};

function getAll(page, pageSize, q = '') {
  const url = `${apiUrl}${model}?page=${page}&&page_size=${pageSize}&&q=${q}`;

  console.log(url);
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
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.post(url, dto, { headers: authHeaderJson() });
}

function edit(id, dto) {
  const url = `${apiUrl}${model}${id}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.put(url, dto, { headers: authHeaderJson() });
}

function getBankAccounts(id, page, pageSize) {
  const url = `${apiUrl}user/${id}/bank_accounts?page_number=${page}&&page_size=${pageSize}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}

function getWallets(id, page, pageSize) {
  const url = `${apiUrl}user/${id}/wallets?page_number=${page}&&page_size=${pageSize}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}

function getAssets(id, page, pageSize) {
  const url = `${apiUrl}user/${id}/assets?page_number=${page}&&page_size=${pageSize}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}

function getOrders(id, page, pageSize) {
  const url = `${apiUrl}user/${id}/orders?page_number=${page}&&page_size=${pageSize}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}

function getRequests(id, page, pageSize) {
  const url = `${apiUrl}user/${id}/requests?page_number=${page}&&page_size=${pageSize}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}
export default usersService;
