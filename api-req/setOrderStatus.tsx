import { setOrderStatusUrl } from './endpoints'
import authorizationHeaders from './authorizationHeaders';


async function setOrderStatus(id: number, status: String) {
  
  const setStatusUrl = `${setOrderStatusUrl}/${id}/ChangeStatus`

  var requestOptions = {
    method: 'PUT',
    headers: authorizationHeaders(),
    body: JSON.stringify({'status': status}),
  };

  const order = await fetch(setStatusUrl, requestOptions)
  if (!order.ok) throw new Error('Failed to change order status!')

  return await order.json()
}

export default setOrderStatus