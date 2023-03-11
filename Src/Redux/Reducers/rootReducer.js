import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import ProjectTargetReducer from './ProjectTargetReducer';
import vendorReducer from './vendorReducer';
import VendorMasterReducer from './VendorMasterReducer';
import resourceReducer from './resourceReducer';
import technologyReducer from './technologyReducer';
import ArchiveResourceReducer from './ArchiveResourceReducer';
import InActiveResourceReducer from './InActiveResourceReducer';
import ExternalProdReducer from './ExternalProdReducer';
import TechnologyMasterReducer from './TechnologyMasterReducer';
import AccountReducer from './AccountReducer';
import ReasonReducer from './ReasonReducer';
import ClientAgreementReducer from './ClientAgreementReducer';
import ClientReducer from './ClientReducer';
import DashboardReducer from './DashboardReducer';
import PurchaseOrderReducer from './PurchaseOrderReducer';
import RequestClientReducer from './RequestClientReducer';
import InvoiceStatusReducer from './InvoiceStatusReducer';
import InvoiceHistoryReducer from './InvoiceHistoryReducer';
import Externalinvicehistoryreducer from './Externalinvicehistoryreducer';
import ExternalInvoiceStatusReducer from './ExternalInvoiceStatusReducer';

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  forgotPasswordReducer: forgotPasswordReducer,
  ProjectTargetReducer: ProjectTargetReducer,
  vendor: vendorReducer,
  VendorMasterReducer: VendorMasterReducer,
  resource: resourceReducer,
  technology: technologyReducer,
  ArchiveResourceReducer: ArchiveResourceReducer,
  InActiveResourceReducer: InActiveResourceReducer,
  ExternalProdReducer: ExternalProdReducer,
  TechnologyMasterReducer: TechnologyMasterReducer,
  AccountReducer: AccountReducer,
  ReasonReducer: ReasonReducer,
  ClientAgreementReducer: ClientAgreementReducer,
  ClientReducer: ClientReducer,
  DashboardReducer: DashboardReducer,
  PurchaseOrderReducer: PurchaseOrderReducer,
  RequestClientReducer: RequestClientReducer,
  InvoiceStatusReducer: InvoiceStatusReducer,
  InvoiceHistoryReducer: InvoiceHistoryReducer,
  Externalinvicehistoryreducer: Externalinvicehistoryreducer,
  ExternalInvoiceStatusReducer: ExternalInvoiceStatusReducer,
});
export default rootReducer;
