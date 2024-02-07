'use client'

import { useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Menu, Transition } from '@headlessui/react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

import { ProductCardProps } from '@/types'
import { CustomBtn, ProductDetails } from '@/components'
import { setProductIsDeleted } from '@/api-req'
import { getPrimaryImage } from '@/utils'


function DashBoardProductCard({ key, product }: ProductCardProps) {

  const router = useRouter()

  const [detailsIsOpen, setDetailsIsOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(product.isDeleted)
  
  const deletedProductStyle = isDeleted && 'opacity-50 hover:opacity-100'
  const menuItemStyle = "px-8 py-1 rounded hover:bg-glass duration-200"

  const handleDelete = (value: boolean, msg: string) => {
    const productStatus = new Promise((resolve, reject) => {
      setTimeout(() => {

        setProductIsDeleted(product.id, value)
          .then((result) => {
            setIsDeleted(value)
            resolve(result);
          })

          .catch((error) => {
            console.error('Error with change isDeleted:', error);
            reject(error);
          })

      }, 500);
    });

    toast.promise(
      productStatus,
      {
        pending: 'Processing...',
        success: `Product No.${product.id} has ${msg} successfully`,
        error: 'Failed to delete the product!'
      }
    );
  };

  return (
    <div key={key} className={`relative w-full sm:w-[500px] h-[80px]
      flex justify-between items-center p-4 gap-4 rounded shadow-md 
      duration-200 bg-grayCard-400 hover:bg-grayCard-600
      hover:scale-[1.03] hover:z-10 ${deletedProductStyle}`}
    >
      <Image
        src={getPrimaryImage(product.images)}
        alt="Product image"
        width={60}
        height={60}
        className="rounded-lg duration-100 hover:scale-95"
      />

      <p className="w-full lg:w-[250px] truncate text-lg">
        {Cookies.get('translateTo') === 'En' ? product.arTitle : product.enTitle}
      </p>

      <span className='text-xl'>
        {product.price}$
      </span>

      <Menu>
        <Menu.Button
          className="px-4 py-2 rounded hover:bg-grayCard-800"
        >
          <i className="fa-solid fa-ellipsis-vertical"></i>
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
          <Menu.Items className="absolute top-16 right-0 bg-grayCard-800
            flex flex-col text-lg rounded shadow-md py-4 gap-3 z-20"
          >
            <Menu.Item>
              <CustomBtn
                btnType='button'
                handleClick={() => router.push(`products/${product.id}/update`)}
                title='Edit'
                containerStyles={menuItemStyle}
                icon="fa-solid fa-pencil text-gray"
                iconStyle="mr-2"
              />
            </Menu.Item>

            <Menu.Item>
              <CustomBtn
                btnType='button'
                handleClick={() => setDetailsIsOpen(true)}
                title='View'
                containerStyles={menuItemStyle}
                icon="fa-regular fa-clipboard"
                iconStyle="mr-2"
              />
            </Menu.Item>

            <Menu.Item>
              {!isDeleted ? (
                <CustomBtn
                btnType='button'
                handleClick={() => handleDelete(true, 'deleted')}
                title='Delete'
                containerStyles={`text-red-600 hover:bg-red-600/10 ${menuItemStyle}`}
                icon="fa-solid fa-xmark"
                iconStyle="mr-2"
              />
              ): 
                <CustomBtn
                  btnType='button'
                  handleClick={() => handleDelete(false, 'restored')}
                  title='Restore'
                  containerStyles={`text-sky-600 hover:bg-sky-600/10 ${menuItemStyle}`}
                  icon="fa-solid fa-arrow-rotate-right"
                  iconStyle="mr-2"
                />
              }

            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>

      <ProductDetails
        isOpen={detailsIsOpen}
        closeModel={() => setDetailsIsOpen(false)}
        navigateTo={() => {}}
        product={product}
      />
    </div>
  )
}

export default DashBoardProductCard