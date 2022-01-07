import { useState,useEffect,FormEvent } from 'react';
import  * as C  from './App.styles';
import * as Photos from "./services/photos";
import { Photo } from "./types/photo"
import {PhotoItem} from './components/PhotoItem';
import { usePersistedState } from "./utilis/usePersistedState";
import {HeaderBlackWhite} from "./components/HeaderBlackWhite";
import { ThemeProvider,DefaultTheme } from "styled-components";
import light from "./styles/themes/ligtht";
import dark from "./styles/themes/dark";




function App() {
  const[theme,setTheme] = usePersistedState<DefaultTheme>('theme',light);
  const toggleTheme = () => {
    setTheme(theme.title ==='light' ? dark : light)
  }
  
  
  
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photos,setPhotos] = useState<Photo[]>([])
  

  useEffect(()=>{
    const getPhotos = async () =>{
      setLoading(true)
      setPhotos(await Photos.getAll());
      setLoading(false)
    }
    getPhotos()
  },[])

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const file = formData.get('image') as File

    if(file && file.size > 0){
      setUploading(true)
      let result = await Photos.insert(file)
      setUploading(false)
      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`)
      }else{
        let newPhotoList = [...photos]
        newPhotoList.push(result)
        setPhotos(newPhotoList)
      }
    }

  }
  const handleDeleteItem = (item: Photo) => {
    Photos.deletePhoto(item);
    const UpdateList = photos.filter((CurrentItem) => {
        if (CurrentItem.id != item.id) return item;
    });
    setPhotos(UpdateList);
};




  return (
    <ThemeProvider theme={theme}> 
      <C.Container>
        <HeaderBlackWhite toggleTheme={toggleTheme} />

        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <C.Area>
          <C.Header>Galeria de Fotos</C.Header>
          
            <C.UploadForm method='POST' onSubmit={handleFormSubmit}>
            <input className='escolherArquivo' type="file" name='image' />
            <input  type="submit" value='Enviar' />
            {uploading && "Enviando..."}
              
            </C.UploadForm>
            

          {loading &&
            <C.ScreenWarning>
              <div className='emoji'>🤚</div>
              <div>Carregando...</div>
            </C.ScreenWarning>
          }
          {!loading && photos.length > 0 &&
            <C.PhotoList>
              {photos.map((item,key)=>(
                <PhotoItem 
                key={key} 
                url={item.url} 
                data={item}
                onDeleteItem={(item) => handleDeleteItem(item)} 
                
                />
                
              ))}
              
            </C.PhotoList>
          }
          {!loading && photos.length === 0 &&
            <C.ScreenWarning>
            <div className='emoji'>😣</div>
            <div>Não há fotos cadastradas </div>
          </C.ScreenWarning>
          }


        </C.Area>
      </C.Container>
    </ThemeProvider>  
  );
}

export default App;
