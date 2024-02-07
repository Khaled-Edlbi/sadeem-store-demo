import { createImageUrl } from './endpoints'
import authorizationHeaders from './authorizationHeaders'


async function createImage (
  forProduct: number, imageUrl: string, isPrimary: boolean
  ) { 
  
  var payload = JSON.stringify({
    'forProduct': forProduct,
    'imageUrl': imageUrl,
    'isPrimary': isPrimary
  });

  var requestOptions = {
    method: 'POST',
    headers: authorizationHeaders(),
    body: payload,
  };

  const image = await fetch(createImageUrl, requestOptions)
  if (!image.ok) throw new Error('Failed to create image!')

  return await image.json()
}

export default createImage