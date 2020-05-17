import { combineReducers } from "redux";

import userReducer from "./user/userreducer";

export default combineReducers({
  user: userReducer,
});
