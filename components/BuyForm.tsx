'use client'

import { ChangeEvent, useState } from 'react'
import { Fragment } from 'react'
import Image from 'next/image'

import { Transition, Dialog } from '@headlessui/react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

import { BuyFormProps } from '@/types'
import { FormBox, CustomBtn, Loader } from '@/components'
import { createOrder } from '@/api-req'
import { getPrimaryImage } from '@/utils'


function BuyForm({ isOpen, closeModel, product }: BuyFormProps) {
  
  const translateTo = Cookies.get('translateTo') === 'En'

  let labelNewOrder;
  let productTitle;
  let labelFullName;
  let labelCity;
  let labelArea;
  let labelStreet;
  let labelPhoneNumber;
  let labelSendOrder;
  let labelProcessing
  let successMsg: string;
  let errorMsg: string;

  if (translateTo) {
    labelNewOrder = 'طلب جديد'
    productTitle = product.arTitle
    labelFullName = 'الاسم الكامل'
    labelCity = 'المدينة'
    labelArea = 'المنطقة'
    labelStreet = 'الشارع'
    labelPhoneNumber = '07xxxxxxxxx - رقم الجوال'
    labelSendOrder = 'إرسال الطلب'
    labelProcessing = '...يتم الإرسال'
    successMsg = '!تم إرسال الطلب بنجاح'
    errorMsg='!فشل إرسال الطلب'
    
  } else {
    labelNewOrder = 'New Order'
    productTitle = product.enTitle
    labelFullName = 'Full Name'
    labelCity = 'City'
    labelArea = 'Area'
    labelStreet = 'Street'
    labelPhoneNumber = 'Phone Number - 07xxxxxxxxx'
    labelSendOrder = 'Send Order'
    labelProcessing = 'Sending...'
    successMsg = 'Order has sent succssfully!'
    errorMsg='Failed to send order!'
  };

  const [formData, setFormData] = useState({
    product: product.id,
    fullName: '',
    city: '',
    area: '',
    street: '',
    phoneNumber: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);

    createOrder(formData)
      .then(() => {
        setIsProcessing(false);
        toast.success(successMsg);
        closeModel();
      })

      .catch((error) => {
        setIsProcessing(false);
        console.error('Error with creating order:', error);
        toast.error(errorMsg);
      });
  };
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={closeModel}>

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
              <Dialog.Panel className="flex flex-col gap-5
                relative w-full max-w-lg max-h-[90vh] px-6 sm:px-8 py-8
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
                
                <h2 className="text-3xl mb-8">
                  {labelNewOrder}
                </h2>

                <div className="flex justify-between items-center
                  px-3 gap-4 sm:gap-6 pb-4"
                >
                  <Image
                    src={getPrimaryImage(product.images)}
                    alt="Product image"
                    width={80}
                    height={80}
                    className="object-cover rounded-xl
                    hover:scale-95 transition-transform"
                  />

                  <h2 className="w-[300px] text-lg truncate ">
                    {productTitle}
                  </h2>

                  <span className="text-xl">
                    {product.price}$
                  </span>
                  
                </div>

                <form 
                  className="flex flex-col gap-12"
                  onSubmit={handleSubmit}
                >
                  <div className="bg-glass h-[1px]"></div>

                  <FormBox
                    inputId='fullName'
                    inputType='text'
                    value={formData.fullName}
                    setValue={handleChange}
                    labelName={labelFullName}
                  />

                  <FormBox
                    inputId='city'
                    inputType='text'
                    value={formData.city}
                    setValue={handleChange}
                    labelName={labelCity}
                  />

                  <FormBox
                    inputId='area'
                    inputType='text'
                    value={formData.area}
                    setValue={handleChange}
                    labelName={labelArea}
                  />

                  <FormBox
                    inputId='street'
                    inputType='text'
                    value={formData.street}
                    setValue={handleChange}
                    labelName={labelStreet}
                  />
                  
                  <FormBox
                    inputId='phoneNumber'
                    inputType='tel'
                    setMaxLength={11}
                    pattern="07\d{9}"
                    value={formData.phoneNumber}
                    setValue={handleChange}
                    labelName={labelPhoneNumber}
                    inputStyle="focus:invalid:border-red-500 
                    focus:valid:border-green-500"
                  />

                  <div className="bg-glass h-[1px]"></div>
                  
                  <div className="text-lg bg-glass rounded
                    shadow-themeCyan animate-RGB ease duration-300
                    hover:shadow-neonCyan active:bg-themeCyan"
                  >
                    {isProcessing ?
                      <div className="w-full flex justify-center items-center p-3 gap-2">
                        {translateTo && labelProcessing}
                        <Loader width='w-[22px]' height='h-[22px]'/>
                        {!translateTo && labelProcessing}
                      </div> :

                      <CustomBtn
                        btnType='submit'
                        title={labelSendOrder}
                        containerStyles='w-full p-3'
                      />
                    }
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default BuyForm