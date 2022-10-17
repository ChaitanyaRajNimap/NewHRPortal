import React from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    StatusBar,
    View,
    Text,
} from 'react-native';
import CustomDrawer from "./DrawerContent";
import Home from '../Screens/DashBoard/Home';
import CompareReport from '../Screens/CompareReport/CompareReport';
import InvoiceStatus from '../Screens/Invoice/InvoiceStatus/InvoiceStatus';
import InvoiceHistory from '../Screens/Invoice/InvoiceHistory/InvoiceHistory';
import ExternalProjectInvoiceHistory from '../Screens/Invoice/ExternalProjectInvoiceHistory/ExternalProjectInvoiceHistory';
import ExternalProjectInvoiceStatus from '../Screens/Invoice/ExternalProjectInvoiceStatus/ExternalProjectInvoiceStatus'
import InterViewReport from '../Screens/Reports/InterViewReport'

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ navigation }) => {
    return (
        <Drawer.Navigator
            drawerPosition="right"
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: 'lightblue',
                drawerActiveTintColor: 'blue',
                drawerInactiveTintColor: 'black',
                drawerLabelStyle: {
                    fontSize: 15,
                },
            }}
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{ headerShown: true, headerTitleAlign: 'center' }}
            />
            <Drawer.Screen
                name="Compare Report"
                component={CompareReport}
                options={{ headerShown: true, headerTitleAlign: 'center' }}
            />
            <Drawer.Screen
                name="Invoice Status"
                component={InvoiceStatus}
                options={{ headerShown: true, headerTitleAlign: 'center' }}
            />
            <Drawer.Screen
                name="Invoice History"
                component={InvoiceHistory}
                options={{ headerShown: true, headerTitleAlign: 'center' }}
            />
            <Drawer.Screen
                name="External Project Invoice History"
                component={ExternalProjectInvoiceHistory}
                options={{ headerShown: true, headerTitleAlign: 'center' }}
            />
            <Drawer.Screen
                name="External Project Invoice Status"
                component={ExternalProjectInvoiceStatus}
                options={{ headerShown: true, headerTitleAlign: 'center' }}
            />
            <Drawer.Screen
                name="InterView Report"
                component={InterViewReport}
                options={{ headerShown: true, headerTitleAlign: 'center' }}
            />

        </Drawer.Navigator>
    );
};

export default DrawerNavigation