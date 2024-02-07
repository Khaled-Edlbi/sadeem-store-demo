'use client'

import { useState } from 'react'
import Image from 'next/image'

import Cookies from 'js-cookie'

import { ProductCardProps } from '@/types'
import { ProductDetails, BuyForm, CustomBtn } from '@/components'
import { getPrimaryImage } from '@/utils'


function ProductCard({ key, product }: ProductCardProps ) {
  
  const translateToArbic = Cookies.get('translateTo') === 'En'
  
  let productTitle;
  let priceLabel;
  let buyNow;
  let moreDetails;
  
  if (translateToArbic) {
    productTitle = product.arTitle
    priceLabel = 'السعر:'
    buyNow = 'اشتري الآن'
    moreDetails = 'تفاصيل إضافية'
  
  } else {
    productTitle = product.enTitle
    priceLabel = 'Price:'
    buyNow = 'Buy Now'
    moreDetails = 'More Details'
  };

  const [detailsIsOpen, setDetailsIsOpen] = useState(false)
  const [buyingIsOpen, setBuyingIsOpen] = useState(false)

  const cardBtnStyle = "px-2 py-1.5 rounded duration-200"

  return (
    <>
      <div
        key={key}
        className="flex flex-col items-center w-[260px] h-[365px] gap-3 p-4
        border border-glass rounded-2xl shadow-lg bg-glassy-gradient backdrop-blur"
      >
        <Image
          className="object-cover rounded-xl hover:scale-95 duration-200 pb-[2px]"
          src={getPrimaryImage(product.images)}
          alt="Product image"
          width={200}
          height={200}
        />
        
        <h2 className="w-[220px] h-7 leading-none truncate">
          {productTitle}
        </h2>

        <p className='mb-[8px]'>
          {priceLabel}
          <span className="text-lg mx-1.5">
          {translateToArbic && '$'}{product.price}{!translateToArbic && '$'}
          </span>
        </p>

        <div className="flex gap-3">
          <CustomBtn
            title={buyNow}
            containerStyles={`bg-sky-500 hover:bg-sky-500/70 ${cardBtnStyle}`}
            btnType='button'
            handleClick={() => setBuyingIsOpen(true)}
          />

          <CustomBtn
            title={moreDetails}
            containerStyles={`bg-glass hover:bg-grayCard-600/80 ${cardBtnStyle}`}
            btnType='button'
            handleClick={() => setDetailsIsOpen(true)}
          />
        </div>
      </div>

      <ProductDetails
        isOpen={detailsIsOpen}
        closeModel={() => setDetailsIsOpen(false)}
        navigateTo={() => setBuyingIsOpen(true)}
        product={product}
      />

      <BuyForm
        isOpen={buyingIsOpen}
        closeModel={() => setBuyingIsOpen(false)}
        product={product}
      />
    </>
  )
}

export default ProductCard