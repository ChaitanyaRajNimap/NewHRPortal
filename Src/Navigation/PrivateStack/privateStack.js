import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from '../../Components/DrawerNavigation';
import Home from '../../Screens/DashBoard/Home';
import CompareReport from '../../Screens/CompareReport/CompareReport';
import InvoiceStatus from '../../Screens/Invoice/InvoiceStatus/InvoiceStatus';
import InvoiceHistory from '../../Screens/Invoice/InvoiceHistory/InvoiceHistory';
import ExternalProjectInvoiceStatus from '../../Screens/Invoice/ExternalProjectInvoiceStatus/ExternalProjectInvoiceStatus';
import ExternalProjectInvoiceHistory from '../../Screens/Invoice/ExternalProjectInvoiceHistory/ExternalProjectInvoiceHistory';
import InterViewReport from '../../Screens/Reports/InterViewReport';
import InterView from '../../Screens/Process/InterView/InterView';
import Joining from '../../Screens/Process/Joining/Joining';
import LeavingOrgnisation from '../../Screens/Process/LeavingOrgnisation/LeavingOrgnisation';
import NonJoining from '../../Screens/Process/NonJoining/NonJoining';
import ProjectTarget from '../../Screens/Masters/ProjectTarget/ProjectTarget';
import Vendor from '../../Screens/Masters/Vendor/vendor/Vendor';
import Resources from '../../Screens/Masters/Resources/resource/Resources';
import ArchivedResources from '../../Screens/Masters/ArchivedResources/ArchivedResources';
import InActiveResources from '../../Screens/Masters/InActiveResources/InActiveResources';
import Client from '../../Screens/Masters/Client/Client';
import ExternalProduct from '../../Screens/Masters/ExternalProduct/ExternalProduct';
import PurchaseOrder from '../../Screens/Masters/PurchaseOrder/PurchaseOrder';
import ClientAgreement from '../../Screens/Masters/ClientAgreement/ClientAgreement';
import RequestClient from '../../Screens/Masters/RequestClient/RequestClient';
import Account from '../../Screens/Masters/Account/Account';
import Technology from '../../Screens/Masters/Technology/Technology';
import UserSetting from '../../Screens/Masters/UserSetting/UserSetting';
import Setting from '../../Screens/Masters/Setting/Setting';
import Logout from '../../Screens/LogOut/Logout';
import EditProjectTarget from '../../Screens/Masters/ProjectTarget/EditProjectTarget';
import AddProjectTarget from '../../Screens/Masters/ProjectTarget/AddProjectTarget';
import Editvendor from '../../Screens/Masters/Vendor/EditVendor/EditVendor';
import AddVendor from '../../Screens/Masters/Vendor/AddVendor/AddVendor';
import AddResource from '../../Screens/Masters/Resources/addResource/addResourcse';
import AddExternalProd from '../../Screens/Masters/ExternalProduct/AddExternalProd';
import EditExternalProd from '../../Screens/Masters/ExternalProduct/EditExternalProd';
import AddTechnology from '../../Screens/Masters/Technology/AddTechnology';
import EditTechnology from '../../Screens/Masters/Technology/EditTechnology';
import Reason from '../../Screens/Masters/Reason/Reason';
import AddReason from '../../Screens/Masters/Reason/AddReason';
import EditReason from '../../Screens/Masters/Reason/EditReason';
import AddAccount from '../../Screens/Masters/Account/AddAccount';
import EditAccount from '../../Screens/Masters/Account/EditAccount';

const privatestack = createNativeStackNavigator();

function privateStack() {
  return (
    <privatestack.Navigator screenOptions={{ headerShown: false }}>
      <privatestack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
      />
      <privatestack.Screen name="Home" component={Home} />
      <privatestack.Screen name="CompareReport" component={CompareReport} />
      <privatestack.Screen name="InvoiceStatus" component={InvoiceStatus} />
      <privatestack.Screen name="InvoiceHistory" component={InvoiceHistory} />
      <privatestack.Screen
        name="ExternalProjectInvoiceStatus"
        component={ExternalProjectInvoiceStatus}
      />
      <privatestack.Screen
        name="ExternalProjectInvoiceHistory"
        component={ExternalProjectInvoiceHistory}
      />
      <privatestack.Screen name="InterViewReport" component={InterViewReport} />
      <privatestack.Screen name="InterView" component={InterView} />
      <privatestack.Screen name="Joining" component={Joining} />
      <privatestack.Screen
        name="LeavingOrgnisation"
        component={LeavingOrgnisation}
      />
      <privatestack.Screen name="NonJoining" component={NonJoining} />
      <privatestack.Screen name="Project Target" component={ProjectTarget} />
      <privatestack.Screen name="Vendor" component={Vendor} />
      <privatestack.Screen name="Resource" component={Resources} />
      <privatestack.Screen
        name="Archive Resource"
        component={ArchivedResources}
      />
      <privatestack.Screen
        name="InActive Resource"
        component={InActiveResources}
      />
      <privatestack.Screen name="Client" component={Client} />
      <privatestack.Screen name="ExternalProduct" component={ExternalProduct} />
      <privatestack.Screen name="PurchaseOrder" component={PurchaseOrder} />
      <privatestack.Screen name="ClientAgreement" component={ClientAgreement} />
      <privatestack.Screen name="RequestClient" component={RequestClient} />
      <privatestack.Screen name="Account" component={Account} />
      <privatestack.Screen name="Technology" component={Technology} />
      <privatestack.Screen name="UserSetting" component={UserSetting} />
      <privatestack.Screen name="Setting" component={Setting} />
      <privatestack.Screen name="Logout" component={Logout} />
      <privatestack.Screen
        name="EditProjectTarget"
        component={EditProjectTarget}
      />
      <privatestack.Screen
        name="AddProjectTarget"
        component={AddProjectTarget}
      />
      <privatestack.Screen name='Editvendor' component={Editvendor} />
      <privatestack.Screen name='AddVendor' component={AddVendor} />

      <privatestack.Screen name="AddResource" component={AddResource} />
      <privatestack.Screen name='AddExternalProd' component={AddExternalProd} />
      <privatestack.Screen name='EditExternalProd' component={EditExternalProd} />
      <privatestack.Screen name='AddTechnology' component={AddTechnology} />
      <privatestack.Screen name='EditTechnology' component={EditTechnology} />
      <privatestack.Screen name='Reason' component={Reason} />
      <privatestack.Screen name='AddReason' component={AddReason} />
      <privatestack.Screen name='EditReason' component={EditReason} />
      <privatestack.Screen name="AddAccount" component={AddAccount} />
      <privatestack.Screen name="EditAccount" component={EditAccount} />
    </privatestack.Navigator>
  );
}
export default privateStack;
