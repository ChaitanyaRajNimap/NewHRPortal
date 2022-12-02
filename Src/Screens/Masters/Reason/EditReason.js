import React,{useState} from "react";
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
import { updateReason } from "../../../Redux/Actions/ReasonAction";

const EditReason = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const params = route.params.newData;
    //console.log("Params", params)

    const [reason, setReason] = useState(params.description);

    const editReason = () => {
        var formData = {
            description: reason
        };
        dispatch(updateReason(formData, navigation, params.id))
    }
    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Edit Account" />
            <View style={styles.container}>
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={reason}
                    onChangeText={data => setReason(data)}
                />
                <CustomButton
                    title="Update"
                    onPressFunction={() => editReason()}
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

export default EditReason