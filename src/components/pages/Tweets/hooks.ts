import { ReturnData, ApplicationState } from './../../../types';
import { load, loadSavedTweets, updateTweets } from './reducer';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tweet } from './types';  

interface MyTweetsType {
    tweets: Tweet[];
    savedTweets: Tweet[];
}

interface TweetsReturnData extends ReturnData<MyTweetsType> {
    onSearchPress: (search: string) => void;
}

export const useTweets = (): TweetsReturnData => {
    const dispatch = useDispatch()
    const { isLoading, tweets, savedTweets } = useSelector((state: ApplicationState) => state.Tweets)
    const onSearchPress = useCallback((search: string) => {
        if (search) {
            dispatch(load(search))
        }
    }, [dispatch])
    useEffect(() => {
        const savedTweets = JSON.parse(localStorage.getItem('savedTweets') || '[]') 
        dispatch(loadSavedTweets(savedTweets))
    }, [dispatch])
    return { isLoading, data: { tweets, savedTweets }, onSearchPress };
}



export const useDragAndDrop = () => {
    const { tweets, savedTweets } = useSelector((state: ApplicationState) => state.Tweets)
    const dispatch = useDispatch()
    const onDragAndDrop = useCallback(({ source, destination }) => {
        if (source.droppableId === 'tweets' && destination.droppableId === 'savedTweets') {
            const newSavedTweets = [...savedTweets]
            newSavedTweets.splice(destination.index, 0, tweets[source.index]) // to simplify, better to go inside an action
            localStorage.setItem('savedTweets', JSON.stringify(newSavedTweets)) 
            dispatch(loadSavedTweets(newSavedTweets))
            dispatch(updateTweets(tweets))
        }
    }, [dispatch, tweets, savedTweets])
    return onDragAndDrop;
}
