import React, { useEffect } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet
} from "react-native";
import SearchBox from "../../../Components/SearchBox";
import { GLOBALSTYLE } from "../../../Constants/Styles";

const ProjectTarget = ({ navigation }) => {
    useEffect(() => {
        const unSubscribe = navigation.addListener('focus', () => {
            //getResources()
            console.log("Project Target")
        });
        return unSubscribe;
    }, [navigation]);
    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <SearchBox />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

})

export default ProjectTarget