import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authHeaderJson, headerJson } from '../utils/auth-header';

import config from '../config';
const apiUrl = config.apiUrl;

const model = 'user_transactions';

const transactionsService = {
  getAll,
  // getById,
  // edit,
  // add,
};

function getAll(params) {
  const url = `${apiUrl}${model}${params}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}

// function getById(id) {
//   const url = `${apiUrl}${model}/${id}`;
//   axios.interceptors.response.use(handleSuccess, handleError);
//   return axios.get(url, { headers: authHeaderJson() });
// }

// function add(dto) {
//   const url = `${apiUrl}${model}/`;
//   console.log(url);
//   console.log(dto);
//   axios.interceptors.response.use(handleSuccess, handleError);
//   return axios.post(url, dto, { headers: authHeaderJson() });
// }

// function edit(id, dto) {
//   const url = `${apiUrl}${model}/${id}`;
//   axios.interceptors.response.use(handleSuccess, handleError);
//   return axios.put(url, dto, { headers: authHeaderJson() });
// }

export default transactionsService;
