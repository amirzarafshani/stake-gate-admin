export function authHeader() {
  // return authorization header with jwt user
  // let token = localStorage.getItem('user');
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    let token = user.token;
    //console.log(token);
    return {
      Authorization: 'Bearer ' + token,
    };
  } else {
    return {};
  }
}

export function authHeaderJson() {
  // return authorization header with jwt user
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    let token = user.token;
    // console.log(token);
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };
  } else {
    return {};
  }
}

export function headerJson() {
  return {
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    // 'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
  };
}

export function authHeaderFormData() {
  // return authorization header with jwt user
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    let token = user.token;
    //console.log(user);
    return {
      // 'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data;',
      Authorization: 'Bearer ' + token,
    };
  } else {
    return {};
  }
}
