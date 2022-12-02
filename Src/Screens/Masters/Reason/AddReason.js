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
import { addReason } from "../../../Redux/Actions/ReasonAction";

const AddReason = ({ navigation }) => {
    const dispatch = useDispatch();
    const [reason, setReason] = useState('');

    const addreasonfun = () => {
        var formData = {
            description: reason
        };
        dispatch(addReason(formData, navigation))
    }
    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Add Reason" />
            <View style={styles.container}>
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={reason}
                    onChangeText={data => setReason(data)}
                    placeholder='Reason*'
                />
                <CustomButton
                    title="Add"
                    onPressFunction={() => addreasonfun()}
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

export default AddReason