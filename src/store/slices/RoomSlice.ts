import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Player {
    id: string;
    roomId: string;
    name: string;
    symbol: string;
    isTurn: boolean;
}

type Room = {
    id: string | null;
    board: string[];
    players: Player[];
    isPlay: boolean;
}

const initialState: Room = {
    id: null,
    isPlay: false,
    board: [],
    players: [],
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