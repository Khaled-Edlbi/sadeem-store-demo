import { CreateProductApiProps } from '@/types'
import { createProductUrl } from './endpoints'
import authorizationHeaders from './authorizationHeaders';


async function createProduct (
  { enTitle, enDescription, arTitle, arDescription, price }
  : CreateProductApiProps ) {
  
  var payload = JSON.stringify({
    'enTitle': enTitle,
    'enDescription': enDescription,
    'arTitle': arTitle,
    'arDescription': arDescription,
    'price': price,
  });
  
  var requestOptions = {
    method: 'POST',
    headers: authorizationHeaders(),
    body: payload,
  };

  const product = await fetch(createProductUrl, requestOptions)
  if (!product.ok) throw new Error('Failed to create product!')

  return await product.json()
}

export default createProduct