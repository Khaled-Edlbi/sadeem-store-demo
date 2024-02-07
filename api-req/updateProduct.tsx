import { CreateProductApiProps } from '@/types'
import { productUrl } from './endpoints'
import authorizationHeaders from './authorizationHeaders'


async function updateProduct ( id: number,
  { enTitle, enDescription, arTitle, arDescription, price }
  : CreateProductApiProps) {
  
  const updateProductUrl = `${productUrl}/${id}/Update`
  
  var payload = JSON.stringify({
    'enTitle': enTitle,
    'enDescription': enDescription,
    'arTitle': arTitle,
    'arDescription': arDescription,
    'price': price,
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: authorizationHeaders(),
    body: payload,
  };

  const product = await fetch(updateProductUrl, requestOptions)
  if (!product.ok) throw new Error('Failed to update product!')

  return await product.json()
}

export default updateProduct