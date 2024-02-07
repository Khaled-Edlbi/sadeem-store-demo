import { getProductsUrl } from './endpoints'


async function getProducts(query: string) {

  const products = await fetch(`${getProductsUrl}?q=${query}`)
  if (!products.ok) throw new Error('Failed to get products!')

  return await products.json()
}

export default getProducts