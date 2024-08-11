// store/store.js
import AsyncStorage from '@react-native-async-storage/async-storage';

import { configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';

import userReducer from './slices/userSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
// const persistedRecipeReducer = persistReducer(persistConfig, recipeReducer);
// const persistedRecentSearchReducer = persistReducer(persistConfig, recentSearchReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    // recipes: persistedRecipeReducer,
    // recentSearches: persistedRecentSearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
