import { Recipe } from "@/server/recipeServer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definindo o tipo para o estado inicial
interface RecentViewersState {
    recentViewsRecipes: Recipe[];
}

const initialState: RecentViewersState = {
    recentViewsRecipes: [],
};

export const recentViewersSlice = createSlice({
    name: 'recentViewers',
    initialState,
    reducers: {
        addRecent: (state, action: PayloadAction<Recipe>) => {
            const find = state.recentViewsRecipes.find(recipe => recipe.id === action.payload.id);
            if (!find) {
                console.log('add recent')
                state.recentViewsRecipes.push(action.payload);
            }
        },
        removeRecent: (state, action: PayloadAction<{ id: number }>) => {
            state.recentViewsRecipes = state.recentViewsRecipes.filter(
                recipe => recipe.id !== action.payload.id
            );
        }
    }
})

export const { addRecent, removeRecent } = recentViewersSlice.actions;

export default recentViewersSlice.reducer;