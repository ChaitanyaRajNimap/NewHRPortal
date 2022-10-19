import React, { useContext, createContext, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApp from './appContext';
import appState from '../Constants/appstate';

const AuthContext = createContext(null);
function AuthProvider({ children }) {
    const { setState } = useApp();
    const [user, setUser] = useState(null);

    const _logoutUser = useCallback(async () => {
        try {
            await AsyncStorage.removeItem('token');
            setState(appState.APP_STATE_PUBLIC);
        } catch (e) {
            console.log(e);
        }
    }, []);

    const logout = useCallback(() => {
        Alert.alert(
            'Please confirm Logout',
            'Are you sure you want to logout from the app',
            [
                {
                    text: 'Yes, Logout',
                    onPress: _logoutUser,
                },
                {
                    type: 'cancel',
                    text: 'No, Stay here',
                },
            ],
        );
    }, [_logoutUser]);
    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = props => {
    return useContext(AuthContext);
};

export { AuthProvider, };
export default useAuth;

