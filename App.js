import 'react-native-gesture-handler';
import React from 'react';
import SplashScreen from './Src/Screens/SplashScreen/SplashScreen';
import Login from './Src/Screens/Login/Login';
import ForgotPassword from './Src/Screens/ForgotPassword/ForgotPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './Src/Redux/Reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk))

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='Splash' component={SplashScreen} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
};

export default App;
