import { getImgurTokenUrl } from './endpoints'
import authorizationHeaders from './authorizationHeaders';


async function getImgurToken() {
  
  var requestOptions = {
    method: 'GET',
    headers: authorizationHeaders(),
  };

  const token = await fetch(getImgurTokenUrl, requestOptions)
  if (!token.ok) throw new Error('Invalid user!')
  
  return await token.json()
}

export default getImgurToken