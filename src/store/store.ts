// store/store.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore
} from 'redux-persist';

import favoriteRecipesSlice from './slices/favoriteRecipesSlice';
import userReducer from './slices/userSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedFavoritesReducer = persistReducer(persistConfig, favoriteRecipesSlice);


export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware  ({
    serializableCheck: false, // Desabilitando verificação de serializabilidade
  }),
});

export const persistor = persistStore(store);
