import Storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "../reducers/userReducer";
import currentUserReducer from "../reducers/currentUserReducer";
import chatReducer from "../reducers/chatReducer";
import currentChatReducer from "../reducers/currentChat";
import liveChatReducer from "../reducers/liveChatReducer";
import roomReducer from "../reducers/roomReducer";

const persistConfig = {
  storage: Storage,
  key: "root",
};

const combinedReducer = combineReducers({
  users: userReducer,
  currentUser: currentUserReducer,
  chats: chatReducer,
  currentChat: currentChatReducer,
  liveChat: liveChatReducer,
  room: roomReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      // immutableCheck: false,
      serializableCheck: false,
    });
  },
});

const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistedStore };
