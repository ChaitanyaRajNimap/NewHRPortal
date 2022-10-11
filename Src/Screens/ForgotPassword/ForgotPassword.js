import React, { useState } from "react";
import {
    View,
    TextInput,
    SafeAreaView,
    Image,
    StyleSheet
} from "react-native";
import { GLOBALSTYLE } from "../../Constants/Styles";
import { IMAGES } from "../../Constants/Theme";
import CustomButton from "../../Components/CustomButton";
import { forgotPassword } from "../../Redux/Actions/forgotPasswordAction";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handleEmail = (data) => {
        setEmail(data)
    }

    const forgotpass = () => {
        dispatch(forgotPassword(email))
    }

    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <View style={[GLOBALSTYLE.mainContainer, { justifyContent: 'center' }]}>
                <Image
                    source={IMAGES.nimaplogo}
                    style={styles.logoStyle}
                />
                <View style={GLOBALSTYLE.TextInputStyle}>
                    <TextInput
                        placeholder="Email"
                        maxLength={40}
                        value={email}
                        onChangeText={(data) => handleEmail(data)}
                    />
                </View>
                <CustomButton
                    title="Submit"
                    onPressFunction={() => {
                        forgotpass()
                    }}
                />
                <CustomButton
                    title="Login"
                    onPressFunction={() => navigation.navigate('Login')}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logoStyle: {
        marginVertical: 20
    }
});
export default ForgotPassword;