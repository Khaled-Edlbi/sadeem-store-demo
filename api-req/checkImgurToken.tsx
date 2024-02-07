import { imgurFeedUrl } from './endpoints'


async function checkImgurToken(accessToken: string) {
  
  var myHeaders = {
    'Authorization': `Bearer ${accessToken}`
  }

  var requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  const feedback = await fetch(imgurFeedUrl, requestOptions)
  if (!feedback.ok) throw new Error('Invalid access token!')
  
  return await feedback.json()
}

export default checkImgurToken