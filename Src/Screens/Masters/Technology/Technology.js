import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    Linking
} from "react-native";
import { GLOBALSTYLE } from "../../../Constants/Styles";
import SearchBox from "../../../Components/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../../../Constants/Theme";
import SmallButton from "../../../Components/SmallButton";
import { getTechnology, deleteTechnology } from "../../../Redux/Actions/TechnologyMasterAction";

const Technology = ({ navigation }) => {
    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.TechnologyMasterReducer)

    const [technology, setTechnology] = useState([]);
    const [filterTechnology, setFilterTechnolgy] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const unSubscribe = navigation.addListener('focus', () => {
            dispatch(getTechnology())

        });
        return unSubscribe;
    }, [navigation]);

    useEffect(() => {
        getTechnologyFilterData();
    }, [search])

    useEffect(() => {
        console.log("-------------------", reducerData.technologyData)
        setTechnology(reducerData.technologyData)
        setFilterTechnolgy(reducerData.technologyData)
    }, [reducerData.technologyData])

    const setSearchValue = value => {
        setSearch(value);
    };
    const getTechnologyFilterData = () => {
        const filterValue = technology?.filter(data => {
            if (search.length === 0) {
                return data;
            } else if (
                data.technology.toLowerCase().includes(search.toLowerCase()) ||
                data.url.toLowerCase().includes(search.toLowerCase())
            ) {
                console.log(data);
                return data;
            }
        });
        setFilterTechnolgy(filterValue);

    };

    const editTechnology = (data) => {
        navigation.navigate('EditTechnology', { newData: data })
    }
    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <SearchBox
                setSearchValue={setSearchValue}
            />
            <View>
                <FlatList
                    data={filterTechnology}
                    renderItem={({ item }) => (
                        <View style={GLOBALSTYLE.cardView}>
                            <View style={GLOBALSTYLE.columnView}>
                                <Text style={GLOBALSTYLE.label}>Technology</Text>
                                <Text style={GLOBALSTYLE.text}>{item.technology === null ? '-' : item.technology}</Text>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Primary Skill</Text>
                                    <Text style={GLOBALSTYLE.text}>
                                        {item.primary_resource === null
                                            ? '-'
                                            : item.primary_resource}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>URL</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Linking.openURL(item.url === null ? '-' : item.url);
                                        }}>
                                        <Text style={[GLOBALSTYLE.text, { color: COLORS.blue, fontWeight: 'bold', fontSize: 16 }]}>View</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <SmallButton
                                    color={COLORS.lightBlue}
                                    title={"Edit"}
                                    onPressFunction={() => {
                                        editTechnology(item)
                                    }}
                                />
                                <SmallButton
                                    color={COLORS.red}
                                    title={"Delete"}
                                    onPressFunction={() => {
                                        //deleteProduct(item.id)
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

export default Technology