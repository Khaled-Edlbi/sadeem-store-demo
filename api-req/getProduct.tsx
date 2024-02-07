import { productUrl } from './endpoints'
import authorizationHeaders from './authorizationHeaders'


async function getProduct(id: number) {

  var requestOptions = {
    method: 'GET',
    headers: authorizationHeaders(),
  };

  const product = await fetch(`${productUrl}/${id}`, requestOptions)
  if (!product.ok) throw new Error('Failed to get product!')

  return await product.json()
}

export default getProduct