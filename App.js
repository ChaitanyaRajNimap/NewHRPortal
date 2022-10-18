import React from 'react';
import { AppProvider } from './Src/context/appContext';
import { AuthProvider } from './Src/context/authContext';
import RootNavigation from './Src/Navigation/Rootroute/rootNavigation';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './Src/Redux/Reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk))


const App = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </AppProvider>
    </Provider>
  )
};

export default App;
