import { ImageProps } from '@/types'
import { logoUrl } from '@/app/static-texts'


function getPrimaryImage(images: ImageProps[]) {
  const primaryImage = images.find((image) => image.isPrimary === true)

  if (primaryImage) {
    return primaryImage.imageUrl

  } else {
    return logoUrl
  };
}

export default getPrimaryImage