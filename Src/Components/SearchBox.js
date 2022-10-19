import React from "react";
import {
    View,
    TextInput
} from "react-native";
import { GLOBALSTYLE } from "../Constants/Styles";
import { COLORS } from "../Constants/Theme";

const SearchBox = props => {
    const handleChangeValue = value => {
        props.setSearchValue(value);
    };
    return (
        <View style={{
            padding: 5,
            margin: 10,
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            borderRadius: 10,
            marginHorizontal: 15
        }}>
            <TextInput
                placeholder="Search"
                style={{
                    marginHorizontal: 20,
                    fontSize: 14,
                    flex: 1,
                    marginTop: 1,
                }}
                onChangeText={handleChangeValue}
                value={props.search}
            />

        </View>
    );
};

export default SearchBox