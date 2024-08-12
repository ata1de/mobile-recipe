// store/store.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore
} from 'redux-persist';

import favoriteRecipesSlice from './slices/favoriteRecipesSlice';
import recentViewReducer from './slices/recentViewerSlice';
import userReducer from './slices/userSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedFavoritesReducer = persistReducer(persistConfig, favoriteRecipesSlice);
const persistedRecentView = persistReducer(persistConfig, recentViewReducer);


export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    favorites: persistedFavoritesReducer,
    recentView: persistedRecentView,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware  ({
    serializableCheck: false, // Desabilitando verificação de serializabilidade
  }),
});

export const persistor = persistStore(store);

// Definindo os tipos do estado e do dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
