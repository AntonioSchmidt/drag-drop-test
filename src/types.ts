import { TweetsState } from './components/pages/Tweets/reducer';

export interface ApplicationState {
    Tweets: TweetsState;
  }

  export interface ReturnData<T> {
    data: T;
    isLoading: boolean;
  }
  