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
        setRoom: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },

    },

})

export const { setRoom } = playerSlice.actions;

export default playerSlice.reducer;