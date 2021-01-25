import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["champions"],
};

import champions from "./champions";

const rootReducer = combineReducers({
  champions,
});

export default persistReducer(persistConfig, rootReducer);
