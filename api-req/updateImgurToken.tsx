import { updateImgurTokenUrl } from './endpoints'
import { TokenProps } from '@/types'
import authorizationHeaders from './authorizationHeaders';


async function updateImgurToken(
  { user, accessToken, refreshToken }: TokenProps) {
  
  var payload = JSON.stringify({
    'user': user,
    'accessToken': accessToken,
    'refreshToken': refreshToken
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: authorizationHeaders(),
    body: payload,
  };

  const token = await fetch(updateImgurTokenUrl, requestOptions);
  if (!token.ok) throw new Error('Failed to update token!');

  return await token.json();
}

export default updateImgurToken