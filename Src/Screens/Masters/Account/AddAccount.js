import React, { useState } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    TextInput
} from "react-native";
import CustomNavigationBar from "../../../Components/CustomNavigationBar";
import { useDispatch } from "react-redux";
import CustomButton from "../../../Components/CustomButton";
import { GLOBALSTYLE } from "../../../Constants/Styles";
import { COLORS } from "../../../Constants/Theme";
import { addAccount } from "../../../Redux/Actions/AccountAction";

const AddAccount = ({ navigation }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const addaccount = () => {
        var formData = {
            name: name,
            phone: mobile,
            email: email
        };
        dispatch(addAccount(formData, navigation))
    }

    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Add Account" />
            <View style={styles.container}>
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={name}
                    onChangeText={data => setName(data)}
                    placeholder='Name*'
                />
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={mobile}
                    onChangeText={data => setMobile(data)}
                    placeholder='Mobile*'
                />
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={email}
                    onChangeText={data => setEmail(data)}
                    placeholder='Email Id*'
                />
                <CustomButton
                    title="Add"
                    onPressFunction={() => addaccount()}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 5,
        alignItems: 'center'
    },
})

export default AddAccount