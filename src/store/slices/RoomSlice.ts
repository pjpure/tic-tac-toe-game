import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type Room = {
    id: string | null;
}

const initialState: Room = {
    id: null,
}

const playerSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom: (state, action: PayloadAction<Room>) => {
            return action.payload;
        },
        leaveRoom: (state) => {
            return initialState;
        }
    },

})

export const { setRoom, leaveRoom } = playerSlice.actions;

export default playerSlice.reducer;