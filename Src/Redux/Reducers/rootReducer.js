import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import ProjectTargetReducer from './ProjectTargetReducer';
import vendorReducer from './vendorReducer';
import VendorMasterReducer from './VendorMasterReducer';

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  forgotPasswordReducer: forgotPasswordReducer,
  ProjectTargetReducer: ProjectTargetReducer,
  vendor: vendorReducer,
  VendorMasterReducer: VendorMasterReducer
});
export default rootReducer;
