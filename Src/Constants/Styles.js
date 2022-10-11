import {
    Dimensions,
    StyleSheet
} from "react-native";

import { COLORS } from "./Theme";

export const GLOBALSTYLE = StyleSheet.create({
    safeAreaViewStyle: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    TextInputStyle: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        width: Dimensions.get('screen').width - 20,
        margin: 10
    }
})