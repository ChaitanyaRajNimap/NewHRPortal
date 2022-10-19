import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import appState from '../../Constants/appstate';
import useApp from '../../context/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Logout() {

    const { setState } = useApp();

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setState(appState.APP_STATE_PUBLIC);
    };

    useEffect(() => {
        logout();
    }, []);
    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" animating={true} />
        </View>
    );
}

export default Logout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
