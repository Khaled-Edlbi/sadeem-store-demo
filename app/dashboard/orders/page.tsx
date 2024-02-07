'use client'

import { useState } from 'react'

import { OrdersApiProps, OrderCardProps } from '@/types'

import { 
    Loader, ToastContainerAbs,
    OrdersHeader, DashBoardStatistics, OrderCard, 
  } from '@/components'

import { cleanDate } from '@/utils'


function OrdersDashboard() {

  const [orders, setOrders] = useState<OrdersApiProps>()

  const generateOrderCard = (order: OrderCardProps) => (
    <OrderCard
      key={order.id}
      id={order.id}
      product={order.product}
      fullName={order.fullName}
      city={order.city}
      area={order.area}
      street={order.street}
      phoneNumber={order.phoneNumber}
      created={cleanDate(order.created)}
      status={order.status}
    />
  );

  return (
    <main className="bg-navy">

      <OrdersHeader
        sendOrders={setOrders}
      />

      <div className="flex flex-col justify-center items-center 
        pt-[240px] xl:pt-[200px]"
      >

        <DashBoardStatistics
          earnings={orders?.earnings}
          pendingCount={orders?.pendingCount}
          deliveredCount={orders?.deliveredCount}
          rejectedCount={orders?.rejectedCount}
        />

        <div className="w-[80%] h-[1px] bg-glass mt-20"></div>

        <section id='pending-orders' className="w-[95%] min-h-[100vh] pt-24">
          <h1 className="text-4xl text-center mb-4">Pending Orders</h1>

          <div className="flex overflow-x-scroll gap-8 px-8 py-10">
            {typeof orders !== 'undefined' && orders.pending.length > 0 ? 
              orders.pending.map(order => generateOrderCard(order)) :

              typeof orders !== 'undefined' ? 
              <div className="w-full text-center text-2xl text-graySec mt-44">No orders found !</div> :

              <div className="w-full text-center mt-44">
                <Loader width='w-[50px]' height='h-[50px]' borderWidth='border-[4px]'/>
              </div>
            }
          </div>
        </section>

        <div className="w-[80%] h-[1px] bg-glass mt-20"></div>
          
        <section id='delivered-orders' className="w-[95%] min-h-[100vh] pt-24">
          <h1 className="text-4xl text-center mb-4">Delivered Orders</h1>

          <div className="flex overflow-x-scroll gap-8 px-8 py-10">
            {typeof orders !== 'undefined' && orders.delivered.length > 0 ? 
              orders.delivered.map(order => generateOrderCard(order)) :

              typeof orders !== 'undefined' ? 
              <div className="w-full text-center text-2xl text-graySec mt-44">No orders found !</div> :
              
              <div className="w-full text-center mt-44">
                <Loader width='w-[50px]' height='h-[50px]' borderWidth='border-[4px]'
                  borderColor='border-green-600'/>
              </div>
            }
          </div>
        </section>

        <div className="w-[80%] h-[1px] bg-glass mt-20"></div>

        <section id='rejected-orders' className="w-[95%] min-h-[100vh] pt-24">
          <h1 className="text-4xl text-center mb-4">Rejected Orders</h1>

          <div className="flex overflow-x-scroll gap-8 px-8 py-10">
            {typeof orders !== 'undefined' && orders.rejected.length > 0 ? 
              orders.rejected.map(order => generateOrderCard(order)) :

              typeof orders !== 'undefined' ? 
              <div className="w-full text-center text-2xl text-graySec mt-44">No orders found !</div> :
              
              <div className="w-full text-center mt-44">
                <Loader width='w-[50px]' height='h-[50px]' borderWidth='border-[4px]' 
                  borderColor='border-red-600'/>
              </div>
            }
          </div>
        </section>

      </div>
      
      <ToastContainerAbs/>
    </main>
  )
}

export default OrdersDashboard