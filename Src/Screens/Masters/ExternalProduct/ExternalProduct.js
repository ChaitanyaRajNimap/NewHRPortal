import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    Linking,
    Alert
} from "react-native";
import { GLOBALSTYLE } from "../../../Constants/Styles";
import SearchBox from "../../../Components/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { getExternalProduct, deleteExternalProduct } from "../../../Redux/Actions/ExternalProdAction";
import { COLORS } from "../../../Constants/Theme";
import SmallButton from "../../../Components/SmallButton";

const ExternalProduct = ({ navigation }) => {
    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.ExternalProdReducer)

    const [product, setProduct] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const unSubscribe = navigation.addListener('focus', () => {
            dispatch(getExternalProduct())

        });
        return unSubscribe;
    }, [navigation]);

    useEffect(() => {
        getProductFilterData();
    }, [search])

    useEffect(() => {
        // console.log("-------------------", reducerData.externalProductData)
        setProduct(reducerData.externalProductData)
        setFilterProduct(reducerData.externalProductData)
    }, [reducerData.externalProductData])

    const setSearchValue = value => {
        setSearch(value);
    };
    const getProductFilterData = () => {
        const filterValue = product?.filter(data => {
            if (search.length === 0) {
                return data;
            } else if (
                data.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                data.url.toLowerCase().includes(search.toLocaleLowerCase())
            ) {
                console.log(data);
                return data;
            }
        });
        setFilterProduct(filterValue);

    };

    const deleteOk = (id) => {
        dispatch(deleteExternalProduct(id))
        setSearch('');
        const remaningData = product.filter(t => t.id !== id);
        setFilterProduct([...remaningData]);
    }
    const deleteProduct = (id) => {
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

    const editProduct = (item) => {
        navigation.navigate('EditExternalProd', { newData: item })
    }
    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <SearchBox
                setSearchValue={setSearchValue}
            />
            <View>
                <FlatList
                    data={filterProduct}
                    renderItem={({ item }) => (
                        <View style={GLOBALSTYLE.cardView}>
                            <View style={GLOBALSTYLE.columnView}>
                                <Text style={GLOBALSTYLE.label}>Name</Text>
                                <Text style={GLOBALSTYLE.text}>{item.name === null ? '-' : item.name}</Text>
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
                            <View style={GLOBALSTYLE.rowView}>
                                <SmallButton
                                    color={COLORS.lightBlue}
                                    title={"Edit"}
                                    onPressFunction={() => {
                                        editProduct(item)
                                    }}
                                />
                                <SmallButton
                                    color={COLORS.red}
                                    title={"Delete"}
                                    onPressFunction={() => {
                                        deleteProduct(item.id)
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

export default ExternalProduct