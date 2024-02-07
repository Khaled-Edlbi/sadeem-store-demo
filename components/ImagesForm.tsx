import { ChangeEvent } from 'react'
import Image from 'next/image';

import { toast } from 'react-toastify'

import { ImagesFormProps } from '@/types'
import { CustomBtn, StarCheckBox } from '@/components'
import { updateImage, deleteImage } from '@/api-req'


function ImagesForm (
  { selectedImages, setSelectedImages, primaryImage, setPrimaryImage, setIsValidImage }
  : ImagesFormProps) {

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setSelectedImages((prevImages: File[]) => [...prevImages, ...newImages]);
    }
  };

  const isOnlineImage = (imageName: string) => {
    return imageName.slice(0, 5) === 'https' ? true : false
  };

  const getImageSource = (image: File) => {
    if (isOnlineImage(image.name)) {
      return image.name

    } else {
      return URL.createObjectURL(image)
    };
  };

  const updateOnlineImage = (imageName: string, isPrimary: boolean) => {
    if (isOnlineImage(imageName)) {
      const imageId = Number(imageName.substring(imageName.indexOf('%id:') + 4));

      updateImage(imageId, isPrimary)
        .catch((error) => {
          console.error('Error with update image api:', error);
          toast.error('Failed to update image!');
        })
    };
  };

  const handleCheckboxChange = (index: number, imageName: string) => {
    if (index === primaryImage) {
      updateOnlineImage(imageName, false);
      setPrimaryImage(null);
      setIsValidImage('invalid');

    } else {
      if (typeof primaryImage === 'number') {
        updateOnlineImage(selectedImages[primaryImage].name, false)
      }
      updateOnlineImage(imageName, true);
      setPrimaryImage(index);
      setIsValidImage('valid');
    };
  };

  const deleteOnlineImage = (imageName: string) => {
    if (isOnlineImage(imageName)) {
      const imageId = Number(imageName.substring(imageName.indexOf('%id:') + 4));

      deleteImage(imageId)
        .catch((error) => {
          console.error('Error with delete image api:', error);
          toast.error('Failed to delete image!');
        })
    };
  };

  const handleRemoveImage = (index: number, imageName: string) => {
    deleteOnlineImage(imageName);
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };
  
  return (
    <>
      <input
        id='imageInput'
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        hidden
      />

      <div onClick={() => {
          document.getElementById('imageInput')?.click();
        }}
        className="self-center flex flex-col items-center 
        bg-glass px-8 py-10 gap-4 rounded shadow-md cursor-pointer
        hover:scale-105 hover:bg-grayCard-800/80 duration-300"
      >
        <i className="fa-regular fa-file-image text-6xl"></i>
        <span>Choose Images</span>
      </div>
        
      <div className="w-full lg:w-[1000px] self-center 
        flex flex-wrap justify-center gap-8"
      >
        {selectedImages.map((image, index) => (
          <div key={index}
            className="flex flex-col items-center
            bg-grayCard-400 rounded-xl w-[300px]
            duration-300 hover:scale-105"
          >
            <Image
              src={getImageSource(image)}
              alt={`Selected Image No.${index}`}
              width={300}
              height={300}
              className="rounded-lg shadow-md"
            />
            <div className="flex items-center gap-4 m-auto">
              <StarCheckBox
                index={index}
                primaryImage={primaryImage}
                handleCheckboxChange={() => handleCheckboxChange(index, image.name)}
              />
              <div className="w-[1px] h-[50%] bg-glass"></div>
              <CustomBtn
                btnType='button'
                handleClick={() => handleRemoveImage(index, image.name)}
                containerStyles="p-2 duration-100 hover:scale-105"
                icon="fa-solid fa-trash"
                iconStyle="text-red-600 text-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ImagesForm