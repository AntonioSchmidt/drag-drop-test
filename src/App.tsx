import React from 'react';
import { Provider } from 'react-redux';
import { MyTweets } from './components/pages/Tweets'
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <MyTweets/>
    </Provider>
  );
}

export default App;
