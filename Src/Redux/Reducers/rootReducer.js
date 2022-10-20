import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import ProjectTargetReducer from "./ProjectTargetReducer";

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    forgotPasswordReducer: forgotPasswordReducer,
    ProjectTargetReducer: ProjectTargetReducer
})
export default rootReducer;