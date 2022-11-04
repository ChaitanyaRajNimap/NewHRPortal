import React from "react";
import {
    View,
    SafeAreaView,
    StyleSheet
} from "react-native";
import CustomNavigationBar from "../../../../Components/CustomNavigationBar";
import { GLOBALSTYLE } from "../../../../Constants/Styles";

const Editvendor = ({ navigation ,route}) => {
    const params = route.params.newData;
    console.log("Params", params)
    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Add Vendor" />
            <View style={[GLOBALSTYLE.mainContainer, { margin: 10 }]}>

            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

})

export default Editvendor