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
import { addTechnology } from "../../../Redux/Actions/TechnologyMasterAction";

const AddTechnology = ({ navigation }) => {
    const dispatch = useDispatch();
    const [technology, setTechnology] = useState('');
    const [url, setUrl] = useState('');

    const addtechnology = () => {
        var formData = {
            technology: technology,
            url: url,
        };
        dispatch(addTechnology(formData, navigation))
    }

    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Add Technology" />
            <View style={styles.container}>
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={technology}
                    onChangeText={data => setTechnology(data)}
                    placeholder='Technology*'
                />
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={url}
                    onChangeText={data => setUrl(data)}
                    placeholder='Url*'
                />

                <CustomButton
                    title="Add"
                    onPressFunction={() => addtechnology()}
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

export default AddTechnology