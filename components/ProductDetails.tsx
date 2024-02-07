'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import Cookies from 'js-cookie'

import { ProductDetailsProps } from '@/types'
import { ImagesSlider, CustomBtn } from '@/components'


function ProductDetails(
  { isOpen, closeModel, navigateTo, product }: ProductDetailsProps) {

  const translatedToArabic = Cookies.get('translateTo') === 'En'

  let productTitle;
  let productDescription;
  let textDir;
  let priceLabel;
  let buyNow;

  if (translatedToArabic) {
    productTitle = product.arTitle
    productDescription = product.arDescription
    textDir = 'text-right'
    priceLabel = 'السعر :'
    buyNow = 'اشتري الآن'

  } else {
    productTitle = product.enTitle
    productDescription = product.enDescription
    textDir = 'text-left'
    priceLabel = 'Price :'
    buyNow = 'Buy Now'
  };

  const passImages = () => {

    if (product.images.length > 0) {
      return product.images

    } else {
      const defaultImage = [{
        id: 0,
        imageUrl: '/Logo.png',
        isPrimary: true
      }];

      return defaultImage
    };
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModel}>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60"/>
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full justify-center
            items-center text-center p-4"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh]
                flex flex-col gap-5 px-6 sm:px-8 pt-[50px] pb-8
                overflow-y-auto transfrom rounded-2xl bg-blackHole
                border border-glass shadow-2xl transition-all"
              >
                <CustomBtn
                  btnType='button'
                  handleClick={closeModel}
                  containerStyles="absolute top-3 left-4 w-10 h-8
                  bg-glass text-lg rounded hover:scale-105 z-10"
                  icon="fa-solid fa-xmark"
                />
                
                <ImagesSlider images={passImages()} />

                <h2 className="self-center w-[90%] text-xl">
                  {productTitle}
                </h2>

                <p className={`whitespace-pre-line ${textDir}`}>
                  {productDescription}
                </p>

                <p className='text-lg mb-3'>
                  {priceLabel}
                  <span className="text-xl mx-2">
                    {translatedToArabic && '$'}{product.price}{!translatedToArabic && '$'}
                  </span>
                </p>

                <CustomBtn
                  btnType="button"
                  handleClick={() => { closeModel(); navigateTo() }}
                  title={buyNow}
                  containerStyles="text-lg bg-glass p-3 rounded
                  shadow-themeCyan animate-RGB ease duration-300
                  mt-1 hover:shadow-neonCyan active:bg-themeCyan"
                />

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>

      </Dialog>
    </Transition>
  )
}

export default ProductDetails