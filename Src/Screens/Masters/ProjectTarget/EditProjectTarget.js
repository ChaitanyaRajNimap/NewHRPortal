import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomNavigationBar from "../../../Components/CustomNavigationBar";
import { GLOBALSTYLE } from "../../../Constants/Styles";
import { COLORS } from "../../../Constants/Theme";
import DateTimePicker from '@react-native-community/datetimepicker'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from "../../../Components/CustomButton";
import { updateProjectTarget } from "../../../Redux/Actions/ProjectTargetAction";


const EditProjectTarget = ({ navigation, route }) => {
    const params = route.params.newData;
   // console.log("Params", params)
    const dispatch = useDispatch();


    const [resorce, setResource] = useState(params.fname + ' ' + params.lname)
    const [date, setDate] = useState(new Date(Date.now()));
    const [datePicker, setDatePicker] = useState(false);
    const [displayDate, setDisplayDate] = useState(params.date)

    const convertDate = (value) => {
        const currentDate = value || date;
        let tempDate = new Date(currentDate);
        let fDate = (tempDate.getMonth() + 1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
        //console.log(fDate)
        return (fDate)
    }

    function onDateSelected(event, value) {
        setDatePicker(false);
        setDate(value);
        setDisplayDate(convertDate(value))
    };

    function showDatePicker() {
        setDatePicker(true);
    };

    const updateResource = () => {
        dispatch(updateProjectTarget(params.resource, date, params.id, navigation))
    }
    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Edit Project Target" />
            <View style={styles.container}>
                <TextInput
                    style={[GLOBALSTYLE.TextInputStyle, { color: COLORS.black, fontSize: 16, fontWeight: 'bold', padding: 15 }]}
                    value={resorce}
                    editable={false}
                />
                <TouchableOpacity style={styles.btnStyle}
                    onPress={showDatePicker}
                >
                    <Text style={{ color: COLORS.black }}>{displayDate}</Text>
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
                    />
                    : null}

                <CustomButton
                    title="Update"
                    onPressFunction={() => updateResource()}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 5,
        alignItems: 'center'
    },
    btnStyle: {
        width: Dimensions.get('screen').width - 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        margin: 10,
        padding: 15
    },

})

export default EditProjectTarget