import { Photo } from '../types/photo';
import { storange } from '../libs/firibase'
import { ref,listAll,getDownloadURL,uploadBytes,deleteObject,getStorage } from "firebase/storage";
import { v4 as createId } from 'uuid'

export const getAll = async () => {
    let list: Photo[] =[]

    const imagesFolder = ref(storange,'images')
    const photoList = await listAll(imagesFolder)

    for (let i in photoList.items){
        let photoUrl = await getDownloadURL(photoList.items[i])
        list.push({
            id:photoList.items[i].fullPath,
            url: photoUrl,

        })
    }

    return list
};

export const insert = async (file:File) => {
    if(['image/jpeg','image/jpg','image/png'].includes(file.type)){

        let randomName = createId()

        let newFile = ref(storange,`images/${randomName}`)

        let upload = await uploadBytes(newFile, file)
        let photoUrl = await getDownloadURL(upload.ref)

        return{ url:photoUrl} as Photo

    }else{
        return new Error('Tipo de arquivo não permetido.')
    }
};
export const deletePhoto = async ({ id }: Photo) => {
    const DeleteRefFile = ref(storange, id);
    await deleteObject(DeleteRefFile);
};


export const DownloadPhoto =async ({url}:Photo) => {
    const storage = getStorage();
const starsRef = ref(storage, 'images/stars.jpg');

// Get the download URL
getDownloadURL(starsRef)
  .then((url) => {
    // Insert url into an <img> tag to "download"
    
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
}