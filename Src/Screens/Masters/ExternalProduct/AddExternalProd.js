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
import { addExternalProduct } from "../../../Redux/Actions/ExternalProdAction";

const AddExternalProd = ({ navigation }) => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');

    const addProduct = () => {
        var formData = {
            name: name,
            url: url,
            description: description
        };
        dispatch(addExternalProduct(formData, navigation))
    }

    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Add External Product" />
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
                    value={url}
                    onChangeText={data => setUrl(data)}
                    placeholder='URL*'
                />
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={description}
                    onChangeText={data => setDescription(data)}
                    placeholder='Description*'
                />
                <CustomButton
                    title="Add"
                    onPressFunction={() => addProduct()}
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

export default AddExternalProd