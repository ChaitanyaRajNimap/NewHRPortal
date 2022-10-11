import React from "react";
import {
    Image,
    View,
    SafeAreaView,
    StyleSheet
} from "react-native";

import { IMAGES, COLORS } from "../../Constants/Theme";

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.replace('Login')
    }, 3000);

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