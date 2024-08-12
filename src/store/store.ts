// store/store.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore
} from 'redux-persist';

import userReducer from './slices/userSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware  ({
    serializableCheck: false, // Desabilitando verificação de serializabilidade
  }),
});

export const persistor = persistStore(store);
