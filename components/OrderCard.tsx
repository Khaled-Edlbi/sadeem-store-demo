'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'

import { Menu, Transition } from '@headlessui/react'
import { toast } from 'react-toastify'

import { OrderCardProps } from '@/types'
import { CustomBtn, Loader } from '@/components'
import { setOrderStatus } from '@/api-req'
import { getPrimaryImage } from '@/utils'
  

function OrderCard(
  { id, product, fullName, city, area, street, 
    phoneNumber, created, status }
  : OrderCardProps) {

  const orderDetails = new Map([
    ['Customer', fullName],
    ['City', city],
    ['Area', area],
    ['Street', street],
    ['Phone', phoneNumber],
    ['Ordered', created]
  ]);

  const [currentStatus, setStatus] = useState(status)
  const [isProcessing, setIsProcessing] = useState(false)

  let orderStyle;
  let statusStyle;
    
  switch (currentStatus) {
    case 'Pending':
      statusStyle = "bg-sky-500 hover:bg-sky-500/70"
      orderStyle = ""
      break;
    case 'Rejected':
      statusStyle = "bg-red-600/80 hover:bg-red-700/80"
      orderStyle = "opacity-50 hover:opacity-100"
      break;
    case 'Delivered':
      statusStyle = "bg-green-600 hover:bg-green-700"
      orderStyle = "opacity-50 hover:opacity-100"
      break;
  };

  const menuItemStyle = "w-full text-center p-[10px] rounded duration-200 hover:bg-gray-700/20"

  const handleStatusChange = (newStatus: string) => {
    setIsProcessing(true);
    
    setOrderStatus(id, newStatus)
      .then(() => {
        setIsProcessing(false);
        setStatus(newStatus);
      })

      .catch((error) => {
        console.error('Error with change status:', error);
        toast.error('Failed to change order status!');
        setIsProcessing(false);
      })
  };

  return (
    <div className={`w-[350px] flex flex-col relative
    bg-gray-800/30 p-5 border border-glass rounded shadow-md
      hover:scale-105 hover:shadow-lg duration-300 ${orderStyle}`}
    >
      <h2 className="text-center text-lg
        p-1 mb-7 border border-glass rounded"
      >
        Order No.{id}
      </h2>

      <div className="flex justify-between items-center gap-4 px-2 mb-7">
        <Image
          src={getPrimaryImage(product.images)}
          alt="Product image"
          width={75}
          height={75}
          className="rounded-lg hover:scale-95 duration-200"
        />

        <p className="truncate">
          {product.enTitle}
        </p>

        <span>
          {product.price}$
        </span>
      </div>

      <div className="w-full h-[1px] bg-glass mb-5"></div>

      <div className="flex flex-col gap-4 px-2">
        {[...orderDetails].map(([key, value], index) => (
          <div className="flex gap-4" key={index}>
            <span className="text-graySec w-[75px]">{key}</span>
            <p className="text-lg overflow-scroll">{value}</p>
          </div>
        ))}
      </div>

      <div className="w-full h-[1px] bg-glass mt-5"></div>

      <Menu>
        <Menu.Button
          className={`w-full text-lg flex justify-center items-center
          gap-[12px] p-2 mt-7 rounded duration-200 ${statusStyle}`}
        >
          {isProcessing ? 
          (<div className='flex justify-center items-center gap-2'>
            <Loader width='w-[22px]' height='h-[22px]'/>
            Processing...
          </div>) :
          (<>{currentStatus}</>) }
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-[18px] left-[50%] translate-x-[-50%] 
            w-[90%] flex flex-col items-center text-lg bg-[#1e293b] py-4 rounded shadow-lg"
          >
            {currentStatus !== 'Pending' && (
              <Menu.Item as='div' className='w-full'>
                <CustomBtn
                  btnType='button'
                  handleClick={() => handleStatusChange('Pending')}
                  title='Pending'
                  containerStyles={`${menuItemStyle}`}
                  icon="fa-regular fa-clock"
                  iconStyle="mr-2"
                />
              </Menu.Item>
            )}

            {currentStatus !== 'Delivered' && (
              <Menu.Item as='div' className='w-full'>
                <CustomBtn
                  btnType='button'
                  handleClick={() => handleStatusChange('Delivered')}
                  title='Deliver'
                  containerStyles={`text-green-600 ${menuItemStyle}`}
                  icon="fa-solid fa-dolly"
                  iconStyle="mr-2"
                />
              </Menu.Item>
            )}

            {currentStatus !== 'Rejected' && (
              <Menu.Item as='div' className='w-full'>
                <CustomBtn
                  btnType='button'
                  handleClick={() => handleStatusChange('Rejected')}
                  title='Reject'
                  containerStyles={`text-red-600 ${menuItemStyle}`}
                  icon="fa-solid fa-xmark"
                  iconStyle="mr-2"
                />
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default OrderCard