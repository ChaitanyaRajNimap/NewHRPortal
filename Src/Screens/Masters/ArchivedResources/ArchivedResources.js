import React, { useEffect, useState } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Text,
    Linking
} from "react-native";
import SearchBox from "../../../Components/SearchBox";
import { GLOBALSTYLE } from "../../../Constants/Styles";
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { getArchivedResources, ArchiveUser } from "../../../Redux/Actions/ArchiveResourceAction";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../../../Constants/Theme";
import { getResources } from "../../../Redux/Actions/ProjectTargetAction";


const ArchivedResources = ({ navigation }) => {
    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.ArchiveResourceReducer)

    const [resources, setResources] = useState([]);
    const [filterResource, setFilterResources] = useState([]);
    const [search, setSearch] = useState('');

    const setSearchValue = value => {
        setSearch(value);
    };

    useEffect(() => {
        const unSubscribe = navigation.addListener('focus', () => {
            dispatch(getArchivedResources())

        });
        return unSubscribe;
    }, [navigation]);

    useEffect(() => {
        getAccountFilterData();
    }, [search])

    useEffect(() => {
        // console.log("-------------------", reducerData.archiveResourceData)
        setResources(reducerData.archiveResourceData)
        setFilterResources(reducerData.archiveResourceData)
    }, [reducerData.archiveResourceData])


    const getAccountFilterData = () => {
        const filterValue = resources?.filter(data => {
            if (search.length === 0) {
                return data;
            } else if (
                data.fname.toLowerCase().includes(search.toLowerCase()) ||
                data.lname.toLowerCase().includes(search.toLowerCase()) ||
                data.email.toLowerCase().includes(search.toLowerCase()) ||
                data.passing_year.toLowerCase().includes(search.toLowerCase()) ||
                data.phone.toLowerCase().includes(search.toLowerCase()) ||
                data.resident_address.toLowerCase().includes(search.toLowerCase())
            ) {
                // console.log(data);
                return data;
            }
        });
        setFilterResources(filterValue);

    };

    const handleArchive = (item) => {
        console.log("hit archive", item.id)
        dispatch(ArchiveUser(item.id))
        dispatch(getResources())
    }
    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <SearchBox
                setSearchValue={setSearchValue}
            />

            <View>
                <FlatList
                    data={filterResource}
                    renderItem={({ item }) => (
                        <View style={GLOBALSTYLE.cardView}>
                            <TouchableOpacity
                                style={{ marginBottom: 30, flex: 1 }}
                                onPress={() => handleArchive(item)}
                            >
                                <Ionicons
                                    style={{ position: 'absolute', right: 10, top: 0 }}
                                    name={'unarchive'}
                                    size={26}
                                    color={COLORS.green}
                                />
                            </TouchableOpacity>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Name</Text>
                                    <Text style={GLOBALSTYLE.text}>
                                        {item?.fname === null
                                            ? '-'
                                            : `${item.fname} ${item.lname}`}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Mobile</Text>

                                    <Text style={GLOBALSTYLE.text}>
                                        {item?.phone === null
                                            ? '-'
                                            : item.phone
                                        }
                                    </Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}> Offical Email Id</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.email == null ? '-' : item.email}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}> Alternate Number</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.alternate_no === null ? '-' : item.alternate_no}</Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Locality</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.resident_address == null
                                        ? '-'
                                        : item.resident_address}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Interview Level</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.l1 === null ? '-' : item.l1}</Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Personal Email Id</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.personal_email === null ? '-' : item.personal_email}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Skills</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.primary_skill === null ? '-' : item.primary_skill}</Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Status</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.on_bench === null
                                        ? '-'
                                        : item.on_bench === 1
                                            ? 'Bench'
                                            : 'Project'}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Vendor</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.company_name == null ? '-' : item?.company_name}</Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>CV</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Linking.openURL(
                                                item.resume === null ? '-' : item.resume,
                                            );
                                        }}
                                    >
                                        <Text style={[GLOBALSTYLE.text, { color: COLORS.lightBlue }]}>View</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Cost</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.cost === null ? '-' : item.cost}</Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Passing Year</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.passing_year === null ? '-' : item.passing_year}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Project</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.project === null ? '-' : item.project}</Text>
                                </View>
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

export default ArchivedResources;