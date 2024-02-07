import { authUrl } from './endpoints'


async function auth ( username: string, password: string ) {
  
  var myHeaders = {
    'Content-Type': 'application/json'
  };

  var payload = JSON.stringify({
    'username': username,
    'password': password,
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: payload,
  };

  const token = await fetch(authUrl, requestOptions)
  if (!token.ok) throw new Error('Wrong credentials!')
  

  return await token.json()
}

export default auth