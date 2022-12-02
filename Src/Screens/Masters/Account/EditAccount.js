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
import { updateAccount } from "../../../Redux/Actions/AccountAction";

const EditAccount = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const params = route.params.newData;
    //console.log("Params", params)

    const [name, setName] = useState(params.name);
    const [mobile, setMobile] = useState(params.phone);
    const [email, setEmail] = useState(params.email);

    const updateaccount = () => {
        var formData = {
            name: name,
            phone: mobile,
            email: email
        };
        dispatch(updateAccount(formData, navigation, params.id))
    }
    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Edit Account" />
            <View style={styles.container}>
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={name}
                    onChangeText={data => setName(data)}
                />
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={mobile}
                    onChangeText={data => setMobile(data)}
                />
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={email}
                    onChangeText={data => setEmail(data)}
                />
                <CustomButton
                    title="Update"
                    onPressFunction={() => updateaccount()}
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

export default EditAccount