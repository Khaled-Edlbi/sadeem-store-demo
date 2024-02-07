'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

import { ProductProps } from '@/types'

import {
    ToastContainerAbs, Loader,
    SearchBar, CustomBtn, DashBoardProductCard
  } from '@/components'

import { getProducts } from '@/api-req'


function ProductsDashboard() {

  const router = useRouter()

  const currentTranslateValue = Cookies.get('translateTo') === 'En' ? 'En' : 'Ar'
  const [translateTo, setTranslateTo] = useState(currentTranslateValue)

  const handleTranslate = () => {
    const newTranslateTo = translateTo === 'En' ? 'Ar' : 'En';
    setTranslateTo(newTranslateTo);
    Cookies.set('translateTo', newTranslateTo, { expires: 1 });
    router.refresh();
  };

  const [searchQuery, setSearchQuery] = useState('')
  const [goSearch, setGoSearch] = useState('')
  const [products, setProducts] = useState<ProductProps[]>()
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  useEffect(() => {
    setProducts(undefined);

    getProducts(goSearch)
      .then((data) => {
        setProducts(data);
        setSearchQuery('');
      })

      .catch((error) => {
        setProducts([]);
        console.error('Error with creating order:', error);
        toast.error('Failed to get orders!');
      })

  }, [goSearch]);

  return (
    <main className="min-h-[100svh] flex bg-blackBg">
      
      <div className="fixed top-0 left-0 right-0 z-20
        flex flex-wrap justify-between items-center
        backdrop-blur shadow-md gap-6 md:gap-4 px-4 
        md:px-12 py-4"
      >
        <div className="flex m-auto lg:m-0 gap-2 md:gap-4">
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
            hover:bg-grayCard-400/40 rounded duration-200"
            icon="fa-solid fa-globe"
            iconStyle="text-sm mr-2"
          />
          
          <CustomBtn
            btnType='button'
            handleClick={() => router.push('/dashboard/orders')}
            title='Orders'
            containerStyles="text-xl px-3 py-2 
            hover:bg-grayCard-400/40 rounded duration-200"
            icon="fa-solid fa-headset"
            iconStyle="text-sm mr-2"
          />

          <CustomBtn
            btnType='button'
            handleClick={() => router.push('/dashboard/products/create')}
            title='Create'
            containerStyles="text-xl px-3 py-2 rounded-xl animate-RGB 
            ease duration-300 hover:shadow-neonCyan active:bg-themeCyan"
            icon="fa-solid fa-plus"
            iconStyle="text-sm mr-2"
          />
        </div>
        
        <div className='flex gap-4 m-auto lg:m-0'>
          <SearchBar
            searchQuery={searchQuery}
            handleChange={handleChange}
            handleSearch={() => {setGoSearch(searchQuery)}}
          />

          <CustomBtn
            btnType='button'
            handleClick={handleTranslate}
            title={translateTo}
            containerStyles="bg-grayCard-400/40 rounded 
            p-2 hover:bg-grayCard-400/80 duration-100"
            icon="fa-solid fa-globe"
            iconStyle="mr-2"
          />
        </div>
      </div>

      <div className={`xl:w-[1050px] lg:w-[90%] sm:w-full
        flex flex-wrap justify-center lg:justify-start overflow-y-scroll
        m-auto mb-[30px] mt-[180px] lg:mt-[100px] p-4 pb-40 gap-4
        ${typeof products !== 'undefined' && products.length > 0 ? 'h-full' : 'h-[80vh]'}`}
      >
        {typeof products !== 'undefined' && products.length > 0 ? 
          products?.map((product, index) => (
            <DashBoardProductCard
              key={index}
              product={product}
            />
          )) :

          typeof products !== 'undefined' ? 
          <div className="w-full m-auto text-center text-2xl text-graySec">
            No products found !
          </div> :

          <div className="w-full m-auto text-center">
            <Loader width='w-[50px]' height='h-[50px]' borderWidth='border-[4px]'/>
          </div>
        }
      </div>
    
      <ToastContainerAbs/>
    </main>
  )
}

export default ProductsDashboard