import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import ProjectTargetReducer from './ProjectTargetReducer';
import vendorReducer from './vendorReducer';
import VendorMasterReducer from './VendorMasterReducer';
import resourceReducer from './resourceReducer';
import technologyReducer from './technologyReducer';
import ArchiveResourceReducer from './ArchiveResourceReducer';

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  forgotPasswordReducer: forgotPasswordReducer,
  ProjectTargetReducer: ProjectTargetReducer,
  vendor: vendorReducer,
  VendorMasterReducer: VendorMasterReducer,
  resource: resourceReducer,
  technology: technologyReducer,
  ArchiveResourceReducer: ArchiveResourceReducer
});
export default rootReducer;
