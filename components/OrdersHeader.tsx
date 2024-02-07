'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation' 
import Image from 'next/image'

import { toast } from 'react-toastify'

import { OrdersApiProps } from '@/types'
import { CustomBtn, SearchBar } from '@/components'
import { getOrders } from '@/api-req'
import { generateRandomString } from '@/utils'


function OrdersHeader(
  { sendOrders }: { sendOrders: (orders: OrdersApiProps | undefined) => void }) {
  
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [goSearch, setGoSearch] = useState('')
  const [updateData, setUpdateData] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  useEffect(() => {
    sendOrders(undefined);

    getOrders(goSearch)
      .then((data) => {
        sendOrders(data);
        setSearchQuery('');
      })

      .catch((error) => {
        console.error('Error with getting order:', error);
        toast.error('Failed to get orders!');
        sendOrders({
          pending: [], 
          delivered: [], 
          rejected: [], 
          pendingCount: 0, 
          deliveredCount: 0, 
          rejectedCount: 0, 
          earnings: 0
        });
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goSearch, updateData]);

  const navStyle = "bg-gray-800/60 text-lg px-3 py-2 rounded shadow \
  hover:scale-105 duration-200"

  return (
    <div className="fixed top-0 left-0 right-0 z-10
      flex flex-wrap justify-between items-center
      backdrop-blur shadow-md py-4 gap-4"
    >
      <div className="flex items-center justify-center w-[415px] m-auto gap-4">
        <Image
          src="/Logo.png"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full shadow-md mr-2"
        />

        <CustomBtn
          btnType='button'
          handleClick={() => router.push('/')}
          title='Site'
          containerStyles="text-xl px-3 py-2 
          hover:bg-gray-800/60 rounded duration-200"
          icon="fa-solid fa-globe"
          iconStyle="text-sm mr-2"
        />

        <CustomBtn
          btnType='button'
          handleClick={() => router.push('/dashboard/products')}
          title='Products'
          containerStyles="text-xl px-3 py-2 
          hover:bg-gray-800/60 rounded duration-200"
          icon="fa-solid fa-cubes"
          iconStyle="text-sm mr-2"
        />
      </div>
      
      <div className="flex flex-wrap justify-center items-center m-auto px-2 gap-4">
        <CustomBtn
          btnType='button'
          handleClick={() => setUpdateData(generateRandomString())}
          containerStyles={navStyle}
          icon='fa-solid fa-list'
          iconStyle='text-xl px-1'
        />
        
        <a href='#pending-orders' 
          className={`active:bg-sky-400 ${navStyle}`}>
          Pending
        </a>

        <a href='#delivered-orders' 
          className={`active:bg-green-600 ${navStyle}`}>
          Delivered
        </a>

        <a href='#rejected-orders' 
          className={`active:bg-red-600/80 ${navStyle}`}>
          Rejected
        </a>
      </div>

      <div className="m-auto">
        <SearchBar
          searchQuery={searchQuery}
          handleChange={handleChange}
          handleSearch={() => {setGoSearch(searchQuery)}}
        />
      </div>
      
    </div>
  )
}

export default OrdersHeader