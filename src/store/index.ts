import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./user/user";
import countReducer from "./reducers";
import useSlice from "./toolkit";
import locationSlice from "./common/location";
import userSlice from "./common/user";

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    user: userSlice,
    countReducer,
    location: locationSlice,

    // user: useSlice,
  },
});

export default store;
