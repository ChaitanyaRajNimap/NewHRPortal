import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Alert,
    Text,
    FlatList
} from "react-native";
import { GLOBALSTYLE } from "../../../Constants/Styles";
import SearchBox from "../../../Components/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../../../Constants/Theme";
import SmallButton from "../../../Components/SmallButton";
import {  deleteReason, getReason } from "../../../Redux/Actions/ReasonAction";

const Reason = ({ navigation }) => {
    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.ReasonReducer)

    const [reason, setReason] = useState([]);
    const [filterReason, setFilterReason] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const unSubscribe = navigation.addListener('focus', () => {
            dispatch(getReason())
        });
        return unSubscribe;
    }, [navigation]);

    useEffect(() => {
        getReasonFilter();
    }, [search])

    useEffect(() => {
        // console.log("-------------------", reducerData.reasonData)
        setReason(reducerData.reasonData)
        setFilterReason(reducerData.reasonData)
    }, [reducerData.reasonData])

    const setSearchValue = value => {
        setSearch(value);
    };
    const getReasonFilter = () => {
        const filterValue = reason?.filter(data => {
            if (search.length === 0) {
                return data;
            } else if (
                data.description.toLowerCase().includes(search.toLowerCase())
            ) {
                console.log(data);
                return data;
            }
        });
        setFilterReason(filterValue);

    };

    const deleteOk = (id) => {
        dispatch(deleteReason(id))
        setSearch('');
        const remaningData = reason.filter(t => t.id !== id);
        setFilterReason([...remaningData]);
    }
    const editReason = (item) => {
        navigation.navigate('EditReason', { newData: item })
    }
    const deleteareason = (id) => {
        Alert.alert(
            'Are you sure want to Delete?',
            'You wont be able to revert this.',
            [
                {
                    text: 'Yes, Delete it',
                    onPress: () => deleteOk(id),
                },
                {
                    type: 'cancel',
                    text: 'Cancel',
                    onPress: () => console.log("Cancel Pressed"),
                },
            ],
        );
    }
    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <SearchBox
                setSearchValue={setSearchValue}
            />
            <View>
                <FlatList
                    data={filterReason}
                    renderItem={({ item }) => (
                        <View style={GLOBALSTYLE.cardView}>

                            <View style={GLOBALSTYLE.columnView}>
                                <Text style={GLOBALSTYLE.label}>Reason</Text>
                                <Text style={GLOBALSTYLE.text}>{item.description === null ? '-' : item.description}</Text>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <SmallButton
                                    color={COLORS.lightBlue}
                                    title={"Edit"}
                                    onPressFunction={() => {
                                        editReason(item)
                                    }}
                                />
                                <SmallButton
                                    color={COLORS.red}
                                    title={"Delete"}
                                    onPressFunction={() => {
                                        deleteareason(item.id)
                                    }}
                                />
                            </View>
                        </View>
                    )}
                />
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

})

export default Reason