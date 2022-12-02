import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IMAGES, COLORS } from '../Constants/Theme'
import useAuth from "../context/authContext";

const CustomDrawer = props => {
    const { logout } = useAuth();
    const CustomDrawerItem = ({ navigation, title, route }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(route)}
                style={{ paddingVertical: 8 }}>
                <Text style={styles.itemTextStyle}>{title}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#8200d6' }}>
                <ImageBackground source={IMAGES.menu} style={{ padding: 20 }}>
                    <Image
                        source={IMAGES.userprofile}
                        style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40,
                            marginBottom: 10,
                            alignSelf: 'center',
                        }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 18,
                            marginBottom: 5,
                            alignSelf: 'center',
                        }}>
                        ABC
                    </Text>
                </ImageBackground>

                <View style={{ flex: 1, backgroundColor: 'lightgray', paddingTop: 10 }}>
                    <View style={styles.container}>
                        <View style={styles.sectionViewStyle}>
                            <View style={{ paddingVertical: 16 }}>
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Dashboard"
                                    route={'Home'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Compare Report"
                                    route={'Compare Report'}
                                />
                            </View>
                        </View>
                        <View style={styles.sectionViewStyle}>
                            <Text style={styles.headreTextStyle}>Invoice</Text>
                            <View style={{ paddingVertical: 16 }}>
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Invoice Status"
                                    route={'Invoice Status'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Invoice History"
                                    route={'Invoice History'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="External Project Invoice Status"
                                    route={'External Invoice Status'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="External Project Invoice History"
                                    route={'External Invoice History'}
                                />
                            </View>
                        </View>
                        <View style={styles.sectionViewStyle}>
                            <Text style={styles.headreTextStyle}>Reports </Text>
                            <View style={{ paddingVertical: 16 }}>
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="InterView Reports"
                                    route={'Interview Report'}
                                />
                            </View>
                        </View>
                        <View style={styles.sectionViewStyle}>
                            <Text style={styles.headreTextStyle}>Process</Text>
                            <View style={{ paddingVertical: 16 }}>
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Interview"
                                    route={'Interview'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Joining"
                                    route={'Joining'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Leaving Organization"
                                    route={'Leaving'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Non Joining"
                                    route={'Non Joining'}
                                />
                            </View>
                        </View>
                        <View style={styles.sectionViewStyle}>
                            <Text style={styles.headreTextStyle}>Master</Text>
                            <View style={{ paddingVertical: 16 }}>
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Project Target"
                                    route={'Project Target'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Vendor"
                                    route={'Vendor'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Resource"
                                    route={'Resource'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Archived Resource"
                                    route={'Archive Resource'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="InActive Resource"
                                    route={'InActive Resource'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Client"
                                    route={'Client'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="External Product"
                                    route={'External Product'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Purchase Order"
                                    route={'Purchase Order'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Client Aggrement"
                                    route={'Client Agreement'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Request Client"
                                    route={'Request Client'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Account"
                                    route={'Account'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Technology"
                                    route={'Technology'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Reason"
                                    route={'Reason'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="User Setting"
                                    route={'User Setting'}
                                />
                                <CustomDrawerItem
                                    navigation={props.navigation}
                                    title="Setting"
                                    route={'Setting'}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 2, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity
                    onPress={() => logout()}
                    style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} style={{ marginStart: 15 }} />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 10,
                            }}>
                            Log Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default CustomDrawer;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    headreTextStyle: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '400',
        color: 'blue',
    },
    itemTextStyle: {
        fontSize: 16,
        fontWeight: '600',
    },
    sectionViewStyle: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
        marginBottom: 4,
    },
});
