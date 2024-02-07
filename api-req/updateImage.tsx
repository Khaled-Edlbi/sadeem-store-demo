import { imageUrl } from './endpoints'
import authorizationHeaders from './authorizationHeaders';


async function updateImage (id: number, isPrimary: boolean) {

  const updateImageUrl = `${imageUrl}/${id}/Update`
    
  var payload = JSON.stringify({
    'isPrimary': isPrimary
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: authorizationHeaders(),
    body: payload,
  };

  const image = await fetch(updateImageUrl, requestOptions)
  if (!image.ok) throw new Error('Failed to update image!')

  return await image.json()
}

export default updateImage