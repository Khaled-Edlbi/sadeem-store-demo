import dotenv from 'dotenv'
dotenv.config();

import { imgurAuthTokenUrl } from './endpoints'


async function generateImgurToken(refreshToken: string) {
  
  var myHeaders = {
    'Content-Type': 'application/json'
  };

  var payload = JSON.stringify({
    'refresh_token': refreshToken,
    'client_id': process.env.imgur_client_id,
    'client_secret': process.env.imgur_client_secret,
    'grant_type': 'refresh_token'
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: payload
  };

  const token = await fetch(imgurAuthTokenUrl, requestOptions)
  if (!token.ok) throw new Error('Invalid refresh token!')
  
  return await token.json()
}

export default generateImgurToken