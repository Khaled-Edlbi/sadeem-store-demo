import { ImageProps } from '@/types'


function getPrimaryImage(images: ImageProps[]) {
  const primaryImage = images.find((image) => image.isPrimary === true)

  if (primaryImage) {
    return primaryImage.imageUrl

  } else {
    return '/Logo.png'
  };
}

export default getPrimaryImage