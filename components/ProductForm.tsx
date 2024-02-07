import { useRouter } from 'next/navigation'

import { ProductFormProps } from '@/types'
import {
    PrepareToken, Loader, ToastContainerAbs,
    FormBox, ImagesForm, CustomBtn
  } from '@/components'


function ProductForm ({ 
  formType,

  formData,
  handleChange,
  
  selectedImages,
  setSelectedImages,

  primaryImage,
  setPrimaryImage,

  isValidImage,
  setIsValidImage,

  isProcessing,
  handleSubmit 

}: ProductFormProps) { 

  const router = useRouter();

  const brakeLine = (<div className="w-full h-[1px] m-auto bg-glass"></div>)

  return (
    <div className="min-h-[100svh] bg-blackBg">
      <PrepareToken/>

      <div className="fixed top-0 left-0 right-0 z-10
        flex flex-wrap justify-center items-center
        backdrop-blur shadow-md gap-4 p-2"
      >
        <CustomBtn
          btnType='button'
          handleClick={() => router.back()}
          title='Go Back'
          containerStyles="text-xl px-3 py-2
          hover:bg-grayCard-400/40 rounded duration-200"
          icon="fa-solid fa-arrow-left"
          iconStyle="text-sm mr-2"
        />
      </div>

      <h1 className="text-3xl text-center pt-[120px] mb-12">
        {formType} Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[650px] flex flex-col justify-center
        m-auto p-5 sm:p-10 gap-20"
      >
        {brakeLine}

        <FormBox
          inputId="enTitle"
          inputType="text"
          value={formData.enTitle}
          setValue={handleChange}
          labelName="En Title"
        />

        <FormBox
          inputId="enDescription"
          isTextArea={true}
          inputType="textarea"
          value={formData.enDescription}
          setValue={handleChange}
          labelName="En Description"
          boxStyle="h-[450px]"
          labelStyle="peer-placeholder-shown:top-[8px]
          peer-placeholder-shown:translate-y-[8px]"
        />

        {brakeLine}

        <FormBox
          inputId="arTitle"
          inputType="text"
          value={formData.arTitle}
          setValue={handleChange}
          labelName="Ar Title"
        />

        <FormBox
          inputId="arDescription"
          isTextArea={true}
          inputType="textarea"
          value={formData.arDescription}
          setValue={handleChange}
          labelName="Ar Description"
          boxStyle="h-[450px]"
          labelStyle="peer-placeholder-shown:top-[8px]
          peer-placeholder-shown:translate-y-[8px]"
        />

        <FormBox
          inputId="price"
          inputType="number"
          value={formData.price}
          setValue={handleChange}
          labelName="Price"
          boxStyle="w-[280px] h-[50px] self-center"
        />
        
        {brakeLine}

        <input type="text" value={isValidImage} required hidden/>

        <ImagesForm
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          primaryImage={primaryImage}
          setPrimaryImage={setPrimaryImage}
          setIsValidImage={setIsValidImage}
        />

        {brakeLine}

        <div className="w-full md:w-[80%] bg-glass m-auto mb-2
          text-xl shadow-themeCyan rounded animate-RGB ease duration-300
          hover:shadow-neonCyan active:bg-themeCyan"
        >
          {isProcessing ? 
            <div className="w-full flex justify-center items-center p-3 gap-2">
              <Loader width='w-[22px]' height='h-[22px]'/>
              Processing...
            </div> : 
            
            <CustomBtn
              btnType='submit'
              title={formType}
              containerStyles="w-full p-3"
            />
          }
        </div>

      </form>

      <ToastContainerAbs/>
    </div>
  )
}

export default ProductForm