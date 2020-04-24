import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { differenceBy } from 'lodash';
import { Tweet } from './types';

export interface TweetsState {
    tweets: Tweet[];
    isLoading: boolean;
    savedTweets: Tweet[];
}

const initialState: TweetsState = {
    tweets: [],
    isLoading: false,
    savedTweets: []
};

const WellnessCategories = createSlice({
    name: 'Tweets',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        updateTweets(state, action: PayloadAction<Tweet[]>) {
            state.isLoading = false;
            state.tweets = differenceBy(action.payload, state.savedTweets, 'id')
        },
        loadSavedTweets(state, action: PayloadAction<Tweet[]>) {
            state.savedTweets = action.payload;
        }
    },
});

export const { loadSavedTweets, updateTweets, startLoading } = WellnessCategories.actions;


export const load = (name: string) => async (dispatch: any)  => {
    dispatch(startLoading())
    const response = await fetch(`/api/?q=${name}&count=10`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    if (response.ok) {
        const { tweets } = await response.json()
        const appTweets = tweets.map((tweet: any): Tweet => ({
            id: tweet.id,
            idString: tweet.idStr,
            name: tweet.user.name,
            image: tweet.user.profileImageUrlHttps,
            tweetName: `@${tweet.user.screenName}`,
            text: tweet.text,
        }))
        dispatch(updateTweets(appTweets))
    }
}


export const { reducer } = WellnessCategories;
