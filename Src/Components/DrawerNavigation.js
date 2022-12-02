import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './DrawerContent';
import Home from '../Screens/DashBoard/Home';
import CompareReport from '../Screens/CompareReport/CompareReport';
import InvoiceStatus from '../Screens/Invoice/InvoiceStatus/InvoiceStatus';
import InvoiceHistory from '../Screens/Invoice/InvoiceHistory/InvoiceHistory';
import ExternalProjectInvoiceHistory from '../Screens/Invoice/ExternalProjectInvoiceHistory/ExternalProjectInvoiceHistory';
import ExternalProjectInvoiceStatus from '../Screens/Invoice/ExternalProjectInvoiceStatus/ExternalProjectInvoiceStatus';
import InterViewReport from '../Screens/Reports/InterViewReport';
import InterView from '../Screens/Process/InterView/InterView';
import Joining from '../Screens/Process/Joining/Joining';
import LeavingOrgnisation from '../Screens/Process/LeavingOrgnisation/LeavingOrgnisation';
import NonJoining from '../Screens/Process/NonJoining/NonJoining';
import ProjectTarget from '../Screens/Masters/ProjectTarget/ProjectTarget';
import Vendor from '../Screens/Masters/Vendor/vendor/Vendor';
import Resources from '../Screens/Masters/Resources/resource/Resources';
import ArchivedResources from '../Screens/Masters/ArchivedResources/ArchivedResources';
import InActiveResources from '../Screens/Masters/InActiveResources/InActiveResources';
import Client from '../Screens/Masters/Client/Client';
import ExternalProduct from '../Screens/Masters/ExternalProduct/ExternalProduct';
import PurchaseOrder from '../Screens/Masters/PurchaseOrder/PurchaseOrder';
import ClientAgreement from '../Screens/Masters/ClientAgreement/ClientAgreement';
import RequestClient from '../Screens/Masters/RequestClient/RequestClient';
import Account from '../Screens/Masters/Account/Account';
import Technology from '../Screens/Masters/Technology/Technology';
import UserSetting from '../Screens/Masters/UserSetting/UserSetting';
import Setting from '../Screens/Masters/Setting/Setting';
import Reason from '../Screens/Masters/Reason/Reason';
import { GLOBALSTYLE } from '../Constants/Styles';

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
      }}>
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
      <Drawer.Screen
        name="InterView"
        component={InterView}
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      <Drawer.Screen
        name="Joining"
        component={Joining}
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      <Drawer.Screen
        name="Leaving Orgnisation"
        component={LeavingOrgnisation}
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      <Drawer.Screen
        name="Non Joining"
        component={NonJoining}
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      <Drawer.Screen
        name="Project Target"
        component={ProjectTarget}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerRight: () => (
            <AntDesign
              name="plus"
              size={25}
              color="black"
              style={GLOBALSTYLE.headerRightStyle}
              onPress={() => navigation.navigate('AddProjectTarget')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Vendor"
        component={Vendor}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerRight: () => (
            <AntDesign
              name="plus"
              size={25}
              color="black"
              style={GLOBALSTYLE.headerRightStyle}
              onPress={() => navigation.navigate('AddVendor')}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Resource"
        component={Resources}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerRight: () => (
            <AntDesign
              name="plus"
              size={25}
              color="black"
              style={GLOBALSTYLE.headerRightStyle}
              onPress={() => navigation.navigate('AddResource')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Archive Resource"
        component={ArchivedResources}
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      <Drawer.Screen
        name="InActive Resource"
        component={InActiveResources}
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      <Drawer.Screen
        name="Client"
        component={Client}
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      <Drawer.Screen
        name="External Product"
        component={ExternalProduct}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerRight: () => (
            <AntDesign
              name="plus"
              size={25}
              color="black"
              style={GLOBALSTYLE.headerRightStyle}
              onPress={() => navigation.navigate('AddExternalProd')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Purchase Order"
        component={PurchaseOrder}
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      <Drawer.Screen
        name="Client Agreement"
        component={ClientAgreement}
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      <Drawer.Screen
        name="Request Client"
        component={RequestClient}
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerRight: () => (
            <AntDesign
              name="plus"
              size={25}
              color="black"
              style={GLOBALSTYLE.headerRightStyle}
              onPress={() => navigation.navigate('AddAccount')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Technology"
        component={Technology}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerRight: () => (
            <AntDesign
              name="plus"
              size={25}
              color="black"
              style={GLOBALSTYLE.headerRightStyle}
              onPress={() => navigation.navigate('AddTechnology')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Reason"
        component={Reason}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerRight: () => (
            <AntDesign
              name="plus"
              size={25}
              color="black"
              style={GLOBALSTYLE.headerRightStyle}
              onPress={() => navigation.navigate('AddReason')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="User Setting"
        component={UserSetting}
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
