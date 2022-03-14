import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useRedux';
import { setRoom } from '../store/slices/RoomSlice';

function RoomService() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const roomCreated = (roomId: string) => {
        navigate('/play');
        dispatch(setRoom(roomId));
    }

}

export default RoomService