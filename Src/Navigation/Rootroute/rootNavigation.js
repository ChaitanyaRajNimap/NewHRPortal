import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import route from '../../Constants/route'
import useApp from "../../context/appContext";
import publicStack from "../PublicStack/publicStack";
import privateStack from "../PrivateStack/privateStack";
import appState from "../../Constants/appstate";
import SplashScreen from "../../Screens/SplashScreen/SplashScreen";
import { navigationRef } from './navigation_reference';

const Stack = createNativeStackNavigator();

function RootNavigation() {
    const { state } = useApp();

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {state === appState.APP_STATE_PUBLIC ? (
                    <Stack.Screen name={route.PUBLIC_STACK} component={publicStack} />
                ) : state === appState.APP_STATE_PRIVATE ? (
                    <Stack.Screen name={route.PRIVATE_STACK} component={privateStack} />
                ) : (
                    <Stack.Screen name={route.SPLASH_SCREEN} component={SplashScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigation;
