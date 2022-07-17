import history from './history';
// import { toastr } from 'react-redux-toastr';

export function handleSuccess(response) {
  return { data: response.data };
}

export function handleError(error) {
  if (error.message === 'Network Error') {
    // The user doesn't have internet
    // toast.info('ارتباط با سرور برقرار نیست');
    return Promise.reject(error);
  }
  switch (error.response.status) {
    case 400:
      // console.log(error);
      // console.log(error.response);
      //  console.log(error.response.data);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message
      ) {
        // toastr.error(error.response.data.message);
      }
      break;
    case 401:
      history.push('/');
      // toast.info('دسترسی نا معتبر');
      //console.log('axios');
      break;
    case 404:
      // Show 404 page
      // toast.info('مشکلی پیش آمد', 'پاسخی برای درخواست شما یافت نشد');
      break;
    case 500:
      // Serveur Error redirect to 500
      // toast.info('مشکلی پیش آمد', 'خطای داخلی سرور');
      break;
    default:
      // Unknow Error
      break;
  }
  return Promise.reject(error);
}
