import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slices/PlayerSlice'
import roomReducer from './slices/RoomSlice'
export const store = configureStore({
    reducer: {
        player: playerReducer,
        room: roomReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch