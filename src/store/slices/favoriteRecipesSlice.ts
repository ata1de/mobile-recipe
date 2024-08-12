import { Recipe } from "@/server/recipeServer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definindo o tipo para o estado inicial
interface FavoriteRecipesState {
    favoriteRecipes: Recipe[];
}

const initialState: FavoriteRecipesState = {
    favoriteRecipes: [],
};

export const favoriteRecipesSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Recipe>) => {
            state.favoriteRecipes.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<{ id: number }>) => {
            state.favoriteRecipes = state.favoriteRecipes.filter(
                recipe => recipe.id !== action.payload.id
            );
        }
    }
})

export const { addFavorite, removeFavorite } = favoriteRecipesSlice.actions;

export default favoriteRecipesSlice.reducer;