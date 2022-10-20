import React from "react";
import {
    Image,
    View,
    SafeAreaView,
    StyleSheet
} from "react-native";
import { IMAGES, COLORS } from "../../Constants/Theme";
import appState from "../../Constants/appstate";
import useApp from "../../context/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {

    const {setState} = useApp();

    setTimeout(() => {
        getAppstate()
    }, 3000);

    const getAppstate = async () => {
        const data = await AsyncStorage.getItem('token');
        setState(data ? appState.APP_STATE_PRIVATE : appState.APP_STATE_PUBLIC);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image
                    source={IMAGES.nimaplogo}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1

    }
});
export default SplashScreen;