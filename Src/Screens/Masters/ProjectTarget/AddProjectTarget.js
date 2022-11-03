import React, { useEffect, useState } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getResources, addProjectTarget } from "../../../Redux/Actions/ProjectTargetAction";
import DropDownPicker from 'react-native-dropdown-picker';
import { GLOBALSTYLE } from "../../../Constants/Styles";
import CustomNavigationBar from "../../../Components/CustomNavigationBar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../../../Constants/Theme";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from "../../../Components/CustomButton";

const AddProjectTarget = ({ navigation }) => {
    const dispatch = useDispatch()
    const reducerData = useSelector(state => state.ProjectTargetReducer)
    console.log("reducerdata------->", reducerData.getResorceData)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [date, setDate] = useState(new Date(Date.now()));
    const [datePicker, setDatePicker] = useState(false);
    const [displayDate, setDisplayDate] = useState('Select Date')

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

       useEffect(() => {
        if (reducerData.getResorceData != null) {
            let newArray = [];
            for (i of reducerData.getResorceData) {
                let item;
                if (i.resources !== null) {
                    item = { id: i.id, label: `${i.fname} ${i.lname}`, value: i.id };
                }
                newArray.push(item);
            }
            setItems(newArray);
        }
    }, [reducerData.getResorceData]);

    const submitResource = (values) => {
        dispatch(addProjectTarget(values, navigation))
    }

    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Add Project Target" />
            <View style={[GLOBALSTYLE.mainContainer, { margin: 10 }]}>
                <DropDownPicker
                    style={styles.dropdownViewStyle}
                    placeholder="Select Resource"
                    placeholderStyle={{ color: 'lightgray' }}
                    listMode="FLATLIST"
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    renderListItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setValue(item.value);
                                    setOpen(false);
                                }}
                                style={styles.cellStyle}>
                                <Text style={styles.cellTextStyle}>{item.label}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setItems={setItems}
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
                    title="Submit"
                    onPressFunction={() => submitResource({ resource: value, date: date })}
                />

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    dropdownViewStyle: {
        backgroundColor: '#fff',
        marginTop: 10,
        marginHorizontal: 10,
        alignSelf: 'center',
        borderColor: '#fff',
    },
    dropDownContainerStyle: {
        marginVertical: 10,
        paddingVertical: 4,
        borderColor: '#fff',
    },
    cellStyle: {
        padding: 8,
        marginVertical: 4,
    },
    cellTextStyle: {
        color: '#000',
        fontSize: 14,
        textTransform: 'capitalize',
        fontWeight: '600',
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

export default AddProjectTarget