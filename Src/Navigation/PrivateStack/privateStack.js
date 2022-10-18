import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "../../Components/DrawerNavigation";
import Home from "../../Screens/DashBoard/Home";
import CompareReport from "../../Screens/CompareReport/CompareReport";
import InvoiceStatus from "../../Screens/Invoice/InvoiceStatus/InvoiceStatus";
import InvoiceHistory from "../../Screens/Invoice/InvoiceHistory/InvoiceHistory";
import ExternalProjectInvoiceStatus from "../../Screens/Invoice/ExternalProjectInvoiceStatus/ExternalProjectInvoiceStatus";
import ExternalProjectInvoiceHistory from "../../Screens/Invoice/ExternalProjectInvoiceHistory/ExternalProjectInvoiceHistory";
import InterViewReport from "../../Screens/Reports/InterViewReport";
import InterView from "../../Screens/Process/InterView/InterView";
import Joining from "../../Screens/Process/Joining/Joining";
import LeavingOrgnisation from "../../Screens/Process/LeavingOrgnisation/LeavingOrgnisation";
import NonJoining from "../../Screens/Process/NonJoining/NonJoining";
import ProjectTarget from "../../Screens/Masters/ProjectTarget/ProjectTarget";
import Vendor from "../../Screens/Masters/Vendor/Vendor";
import Resources from "../../Screens/Masters/Resources/Resources";
import ArchivedResources from "../../Screens/Masters/ArchivedResources/ArchivedResources";
import InActiveResources from "../../Screens/Masters/InActiveResources/InActiveResources";
import Client from "../../Screens/Masters/Client/Client";
import ExternalProduct from "../../Screens/Masters/ExternalProduct/ExternalProduct";
import PurchaseOrder from "../../Screens/Masters/PurchaseOrder/PurchaseOrder";
import ClientAgreement from "../../Screens/Masters/ClientAgreement/ClientAgreement";
import RequestClient from "../../Screens/Masters/RequestClient/RequestClient";
import Account from "../../Screens/Masters/Account/Account";
import Technology from "../../Screens/Masters/Technology/Technology";
import UserSetting from "../../Screens/Masters/UserSetting/UserSetting";
import Setting from "../../Screens/Masters/Setting/Setting";
import Logout from "../../Screens/LogOut/Logout";

const privatestack = createNativeStackNavigator();

function privateStack() {
    return (
        <privatestack.Navigator screenOptions={{ headerShown: false }}>
            <privatestack.Screen name="DrawerNavigation" component={DrawerNavigation} />
            <privatestack.Screen name="Home" component={Home} />
            <privatestack.Screen name="CompareReport" component={CompareReport} />
            <privatestack.Screen name="InvoiceStatus" component={InvoiceStatus} />
            <privatestack.Screen name="InvoiceHistory" component={InvoiceHistory} />
            <privatestack.Screen name="ExternalProjectInvoiceStatus" component={ExternalProjectInvoiceStatus} />
            <privatestack.Screen name="ExternalProjectInvoiceHistory" component={ExternalProjectInvoiceHistory} />
            <privatestack.Screen name="InterViewReport" component={InterViewReport} />
            <privatestack.Screen name="InterView" component={InterView} />
            <privatestack.Screen name="Joining" component={Joining} />
            <privatestack.Screen name="LeavingOrgnisation" component={LeavingOrgnisation} />
            <privatestack.Screen name="NonJoining" component={NonJoining} />
            <privatestack.Screen name="ProjectTarget" component={ProjectTarget} />
            <privatestack.Screen name="Vendor" component={Vendor} />
            <privatestack.Screen name="Resources" component={Resources} />
            <privatestack.Screen name="ArchivedResources" component={ArchivedResources} />
            <privatestack.Screen name="InActiveResources" component={InActiveResources} />
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


        </privatestack.Navigator>
    );
}
export default privateStack