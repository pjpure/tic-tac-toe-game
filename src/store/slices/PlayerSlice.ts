import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type Player = {
    name: string | null;
}

const initialState: Player = {
    name: null,
}


const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayer: (state, action: PayloadAction<string | null>) => {
            state.name = action.payload;
        },

    },

})

export const { setPlayer } = playerSlice.actions;

export default playerSlice.reducer;