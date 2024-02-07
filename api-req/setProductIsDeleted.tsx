import { productUrl } from './endpoints'
import authorizationHeaders from './authorizationHeaders';


async function setProductIsDeleted(id: number, isDeleted: boolean) {

  const setProductIsDeletedUrl = `${productUrl}/${id}/ChangeIsDeleted`

  var requestOptions = {
    method: 'PUT',
    headers: authorizationHeaders(),
    body: JSON.stringify({'isDeleted': isDeleted}),
  };

  const productIsDeleted = await fetch(setProductIsDeletedUrl, requestOptions)
  if (!productIsDeleted.ok) throw new Error('Failed to change product isDeleted!')

  return await productIsDeleted.json()
}

export default setProductIsDeleted