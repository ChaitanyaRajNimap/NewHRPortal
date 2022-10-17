import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { IMAGES, COLORS } from "../../Constants/Theme";
import { GLOBALSTYLE } from "../../Constants/Styles";
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from "../../Components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { loginuser } from "../../Redux/Actions/loginAction";

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleUserName = (data) => {
        setUserName(data)
    }
    const handlePassword = (data) => {
        setPassword(data)
    }
    const loginUser = () => {
        dispatch(loginuser(userName, password));
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
                        placeholder="User Name"
                        maxLength={40}
                        value={userName}
                        onChangeText={(data) => handleUserName(data)}
                    />
                </View>
                <View style={GLOBALSTYLE.TextInputStyle}>
                    <TextInput
                        placeholder="Password"
                        maxLength={15}
                        secureTextEntry={visible}
                        value={password}
                        onChangeText={(data) => handlePassword(data)}
                    />
                    <TouchableOpacity
                        style={styles.VisibleIconStyle}
                        onPress={() => {
                            setShow(!show);
                            setVisible(!visible);
                        }}>
                        <Entypo
                            name={show === true ? 'eye' : 'eye-with-line'}
                            size={25}
                            color={COLORS.grey}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ alignSelf: 'flex-end', marginHorizontal: 10 }}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text>Forgot Password?</Text>
                </TouchableOpacity>
                <CustomButton
                    title="Login"
                    onPressFunction={() => loginUser()}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logoStyle: {
        marginVertical: 20
    },
    VisibleIconStyle: {
        position: 'absolute',
        right: 10,
        top: 10,
    }
});
export default Login;