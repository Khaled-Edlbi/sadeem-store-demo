'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify'
import Cookies from 'js-cookie' 

import { ProductProps, imgurImageApiProps } from '@/types'
import { ProductForm } from '@/components'

import {
    getProduct, updateProduct, uploadImages, createImage
  } from '@/api-req'

interface ParamsProps {
  params: {id: number}
}


function UpdateProductForm ({ params }: ParamsProps) {

  const router = useRouter();

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

  const getNewImages = (images: File[]) => {
    var newImages = images.filter((image) => {
      return image.name.slice(0, 5) !== 'https';
    });
  
    return newImages;
  };

  useEffect(() => {

    getProduct(params.id)
      .then((product: ProductProps) => {
        
        setFormData({
          enTitle: product.enTitle,
          arTitle: product.arTitle,
          enDescription: product.enDescription,
          arDescription: product.arDescription,
          price: product.price,
        });

        const imagesFiles = product.images.map((image, index) => {
          if (image.isPrimary) {setPrimaryImage(index)};
          const imageFile = new File([], `${image.imageUrl}%id:${image.id}`, { type: 'image/jpg' });
          return imageFile
        });

        setSelectedImages(imagesFiles);

      })
      
      .catch((error) => {
        console.error('Error with get product api:', error);
        toast.error('Failed to get product!');
      })

  }, [params.id])

  const [isProcessing, setIsProcessing] = useState(false)
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidImage === 'valid') {

      setIsProcessing(true);
      const token = Cookies.get("imgurAccessToken");

      if (typeof token === 'string') {
        const newImages = getNewImages(selectedImages)

        if (newImages.length > 0) {

          uploadImages(token, newImages)
            .then((uploadedImages: imgurImageApiProps[]) => {
              updateOldProduct(uploadedImages)
            })
    
            .catch((error) => {
              setIsProcessing(false);
              console.error('Error with uploading images:', error);
              toast.error('Failed to upload images!');
            })

        } else {
          updateOldProduct();
        }
  
      } else {
        setIsProcessing(false);
        toast.error('You have no valid token!');
      };

    } else {
      setIsProcessing(false);
      toast.error('Please select images and primary image!');
    };
  };

  const updateOldProduct = (uploadedImages?: imgurImageApiProps[]) => {

    updateProduct(params.id, formData)
      .then((product: ProductProps) => {
        if (uploadedImages) {
          createImages(product.id, uploadedImages);
        } else {
          router.push('/dashboard/products');
        };
      })

      .catch((error) => {
        setIsProcessing(false);
        console.error('Error with create product api:', error);
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
          console.error('Error with create image api:', error);
          toast.error('Failed to create image!');
        })
    });
  };

  return (
    <main>
      <ProductForm
        formType='Update'

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

export default UpdateProductForm