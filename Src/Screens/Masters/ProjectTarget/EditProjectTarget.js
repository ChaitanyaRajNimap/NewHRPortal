import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import CustomNavigationBar from "../../../Components/CustomNavigationBar";
import { GLOBALSTYLE } from "../../../Constants/Styles";
import { COLORS } from "../../../Constants/Theme";
import DateTimePicker from '@react-native-community/datetimepicker'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const EditProjectTarget = ({ navigation, route }) => {
    const params = route.params.newData;
    console.log("Params", params)

    const [resorce, setResource] = useState(params.fname + ' ' + params.lname)
    const [date, setDate] = useState(new Date(Date.now()));
    const [datePicker, setDatePicker] = useState(false);


    function onDateSelected(event, value) {
        setDate(value);
        setDisplayDate(value.toDateString())
        setDatePicker(false);
    };

    function showDatePicker() {
        setDatePicker(true);
    };

    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Edit Project Target" />
            <View style={styles.container}>
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle, { color: COLORS.black, fontSize: 16, fontStyle: 'Bold' }]}
                    value={resorce}
                    editable={false}
                />
                <TouchableOpacity style={styles.btnStyle}
                    onPress={showDatePicker}
                >

                    <FontAwesome
                        name="calendar-o"
                        size={20}
                        style={{ alignSelf: 'center', right: 30 }}
                    />
                </TouchableOpacity>
                {datePicker === true ?
                    <DateTimePicker
                        value={date}
                        mode={'date'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={true}
                        onChange={onDateSelected}
                        style={styles.datePicker}
                    />
                    : null}

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 5
    },
    btnStyle: {
        width: '100%',
        height: 60,
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },
    dateInputStyle: {
        borderWidth: 0,
        position: 'absolute',
        left: 20,
        fontSize: 14,
        fontWeight: '600',
    },
})

export default EditProjectTarget