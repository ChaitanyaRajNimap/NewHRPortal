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
import { editTechonolgy } from "../../../Redux/Actions/TechnologyMasterAction";

const EditTechnology = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const params = route.params.newData;
    // console.log("Params", params)

    const [technology, setTechnology] = useState(params.technology);
    const [url, setUrl] = useState(params.url);

    const updateTechnology = () => {
        var formData = {
            technology: technology,
            url: url,
        };
        dispatch(editTechonolgy(formData, navigation, params.id))
    }

    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Edit Technology" />
            <View style={styles.container}>
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={technology}
                    onChangeText={data => setTechnology(data)}
                />
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={url}
                    onChangeText={data => setUrl(data)}
                />

                <CustomButton
                    title="Update"
                    onPressFunction={() => updateTechnology()}
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

export default EditTechnology