'use client'

import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify'
import Cookies from 'js-cookie' 

import { ProductProps, imgurImageApiProps } from '@/types'
import { ProductForm } from '@/components'
import { createProduct, uploadImages, createImage } from '@/api-req'

 
function CreateProductForm () {

  const router = useRouter()

  const [formData, setFormData] = useState({
    enTitle: '',
    arTitle:  '',
    enDescription: '',
    arDescription: '',
    price: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [primaryImage, setPrimaryImage] = useState<number | null>(null);
  const [isValidImage, setIsValidImage] = useState('invalid')
  
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidImage === 'valid') {

      setIsProcessing(true);
      const token = Cookies.get("imgurAccessToken");

      if (typeof token === 'string') {

        uploadImages(token, selectedImages)
          .then((uploadedImages: imgurImageApiProps[]) => {
            createNewProduct(uploadedImages);
          })
  
          .catch((error) => {
            setIsProcessing(false);
            console.error('Error with uploading images:', error);
            toast.error('Failed to upload images!');
          })
  
      } else {
        setIsProcessing(false);
        toast.error('You have no valid token!');
      };

    } else {
      setIsProcessing(false);
      toast.error('Please select images and primary image!');
    };
  };

  const createNewProduct = (uploadedImages: imgurImageApiProps[]) => {

    createProduct(formData)
      .then((product: ProductProps) => {
        createImages(product.id, uploadedImages);
      })

      .catch((error) => {
        setIsProcessing(false);
        console.error('Error with create product:', error);
        toast.error('Failed to create product!');
      })
  };

  const createImages = (productId: number, uploadedImages: imgurImageApiProps[]) => {

    uploadedImages.map((uploadedImage, index) => {
      const isPrimary = index === primaryImage ? true : false

      createImage(productId, uploadedImage.data.link, isPrimary)
        .then(() => {
          router.push('/dashboard/products');
        })

        .catch((error) => {
          setIsProcessing(false);
          console.error('Error with create image:', error);
          toast.error('Failed to create image!');
        })
    });
  };

  return (
    <main>
      <ProductForm
        formType='Create'

        formData={formData}
        handleChange={handleChange}

        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}

        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}

        isValidImage={isValidImage}
        setIsValidImage={setIsValidImage}

        isProcessing={isProcessing}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}

export default CreateProductForm