import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Player = {
    id?: string;
    roomId?: string;
    name?: string;
    symbol?: string;
    isTurn?: boolean;
    status?: 'win' | 'lose' | 'draw' | '';
}

type Room = {
    id?: string | null;
    boardSize?: number;
    board: string[];
    players: Player[];
    status: "waiting" | "playing" | "ended";
}

const initialState: Room = {
    board: [],
    players: [],
    status: "waiting"
}

const playerSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom: (state, action: PayloadAction<Room>) => {
            return action.payload;
        },
        setStatus: (state, action: PayloadAction<"waiting" | "playing" | "ended">) => {
            state.status = action.payload;
        },
        leaveRoom: (state) => {
            return initialState;
        }
    },

})

export const { setRoom, leaveRoom, setStatus } = playerSlice.actions;

export default playerSlice.reducer;