import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth'
import appSlice from './reducers/app';
import cardsSlice from './reducers/cards';
import teamSlice from './reducers/team';
import roundsSlice from './reducers/rounds';

const store = configureStore({
  reducer: {
    [authSlice.name] : authSlice.reducer,
    [appSlice.name] : appSlice.reducer,
    [cardsSlice.name] : cardsSlice.reducer,
    [teamSlice.name] : teamSlice.reducer,
    [roundsSlice.name] : roundsSlice.reducer,
  },
})

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch