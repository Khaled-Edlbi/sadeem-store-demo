import { imgurUrl } from './endpoints';


async function uploadImages(accessToken: string, imageFiles: File[]) {

  var myHeaders = {
    'Authorization': `Bearer ${accessToken}`
  };

  const images = imageFiles.map(async (imageFile) => {
    const payload = new FormData();
    payload.append('image', imageFile);
    payload.append('album', 'YmyjqZz');
    payload.append('type', 'file');
    payload.append('name', 'Sadeem Store');
    payload.append('title', 'Sadeem Store');
    payload.append('description', 'Uploaded by Imgur API');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: payload,
    };

    const image = await fetch(imgurUrl, requestOptions)
    if (!image.ok) throw new Error('Failed to upload image!')
    
    return await image.json()
  });

  try {
    const uploadedImages = await Promise.all(images)
    return uploadedImages
    
  } catch (error) {
    throw new Error('Error with uploaded images!');
  };
}

export default uploadImages