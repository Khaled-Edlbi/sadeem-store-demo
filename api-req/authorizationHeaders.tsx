import Cookies from 'js-cookie'


function authorizationHeaders() {  
  const authToken = Cookies.get('authToken')

  var headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${authToken}`
  };

  return headers
}

export default authorizationHeaders