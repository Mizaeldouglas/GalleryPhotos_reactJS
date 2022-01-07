import * as C from './styles'
import * as Photos from "../../services/photos";
import { Photo } from "../../types/photo";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import DeleteIcon from '@mui/icons-material/Delete';

type Props ={
    url?: string;
    name?: string;
    data: Photo;
    onDeleteItem: (item: Photo) => void;
}

export const PhotoItem = ({ url, name,data,onDeleteItem }:Props) => {
   
    const handleDeleteItem = (item: Photo) => {
        onDeleteItem(item);
    }
    return (
        <C.Container>
            <img src={url} alt={name} />
            {name}
            <button onClick={() => handleDeleteItem(data)}> <DeleteIcon  className='Deleteicon' color="primary"/> </button>

        </C.Container>
    )
};
