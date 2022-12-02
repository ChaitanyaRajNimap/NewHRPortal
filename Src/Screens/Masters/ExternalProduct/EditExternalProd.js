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
import { editProduct } from "../../../Redux/Actions/ExternalProdAction";

const EditExternalProd = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const params = route.params.newData;
    //console.log("Params", params)

    const [name, setName] = useState(params.name);
    const [url, setUrl] = useState(params.url);
    const [description, setDescription] = useState(params.description);

    const updateProduct = () => {
        var formData = {
            name: name,
            url: url,
            description: description
        };
        dispatch(editProduct(formData, navigation, params.id))
    }
    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Edit External Product" />
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
                    value={url}
                    onChangeText={data => setUrl(data)}
                />
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle,
                    { color: COLORS.black, fontSize: 16, padding: 15 }]}
                    value={description}
                    onChangeText={data => setDescription(data)}
                />
                <CustomButton
                    title="Update"
                    onPressFunction={() => updateProduct()}
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

export default EditExternalProd