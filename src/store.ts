import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducer as Tweets } from './components/pages/Tweets';

const reducer = combineReducers({
    Tweets,
})
export const store = configureStore({
  reducer,
});