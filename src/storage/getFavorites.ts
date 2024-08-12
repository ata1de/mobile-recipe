import { Recipe } from '@/server/recipeServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getFavoritesStorage = async (): Promise<Recipe[]> => {
    try {
      const persistedState = await AsyncStorage.getItem('persist:root');
      if (persistedState) {
        const state = JSON.parse(persistedState);
        
        // Verifique se favoriteRecipes existe e se é um array
        const favorites: Recipe[] = state.favoriteRecipes ? JSON.parse(state.favoriteRecipes) : [];
        return favorites;
      }
      return [];
    } catch (error) {
      console.error('Error retrieving favorite recipes from storage:', error);
      return [];
    }
  };
  
  export default getFavoritesStorage;
