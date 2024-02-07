import { OrderProps } from '@/types'
import { createOrderUrl } from './endpoints'


async function createOrder (
  { product, fullName, city, area, street, phoneNumber }
  : OrderProps ) {

  var myHeaders = {
    'Content-Type': 'application/json'
  };
  
  var payload = JSON.stringify({
    'product': product,
    'fullName': fullName,
    'city': city,
    'area': area,
    'street': street,
    'phoneNumber': phoneNumber
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: payload,
  };

  const order = await fetch(createOrderUrl, requestOptions)
  if (!order.ok) throw new Error('Failed to send order!')

  return await order.json()
}

export default createOrder