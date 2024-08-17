import { Recipe } from "@/server/recipeServer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
                state.recentViewsRecipes.unshift(action.payload);
            } else {
                const index = state.recentViewsRecipes.indexOf(find);
                if (index !== -1) {
                    state.recentViewsRecipes.splice(index, 1);
                }
                
                state.recentViewsRecipes.unshift(find);
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