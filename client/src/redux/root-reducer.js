import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userreducer";
import fontReducer from "./font/fontreducer";

const persistConfig = {
  key: "root", // from root
  storage,
  whitelist: ["font"], // which reducer to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  font: fontReducer,
});

export default persistReducer(persistConfig, rootReducer);
