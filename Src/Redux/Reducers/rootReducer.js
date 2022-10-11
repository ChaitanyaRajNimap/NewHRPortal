import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    forgotPasswordReducer: forgotPasswordReducer
})
export default rootReducer;