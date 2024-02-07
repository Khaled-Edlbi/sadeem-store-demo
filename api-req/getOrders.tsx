import { getOrdersUrl } from './endpoints'
import authorizationHeaders from './authorizationHeaders'


async function getOrders(query: string) {

  const ordersUrl = `${getOrdersUrl}?q=${query}`
  
  var requestOptions = {
    method: 'GET',
    headers: authorizationHeaders(),
  };

  const orders = await fetch(ordersUrl, requestOptions)
  if (!orders.ok) throw new Error('Failed to fetch data!')

  return await orders.json()
}

export default getOrders