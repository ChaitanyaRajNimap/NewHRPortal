import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screens/Login/Login";
import ForgotPassword from "../../Screens/ForgotPassword/ForgotPassword";

const publicstack = createNativeStackNavigator();

function publicStack() {
    return (
        <publicstack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        </publicstack.Navigator>
    );
}
export default publicStack