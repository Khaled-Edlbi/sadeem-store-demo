import { imageUrl } from './endpoints'
import authorizationHeaders from './authorizationHeaders';


async function deleteImage (id: number) {

  const deleteImageUrl = `${imageUrl}/${id}/Delete`
  
  var requestOptions = {
    method: 'DELETE',
    headers: authorizationHeaders(),
  };

  const image = await fetch(deleteImageUrl, requestOptions)
  if (!image.ok) throw new Error('Failed to delete image!')

  return await image.json()
}

export default deleteImage