import { api } from "./api";

export interface Recipe {
    id: number;
    title: string;
    description: string;
    time: number;
    difficulty: string;
    category: string;
    calories: number;
    imgUrl: string;
    authorId?: number;
}

export type RecipeCreationAttributes = Omit<Recipe, 'id'>

export interface RecipeByCategoryAndName {
    recipes: Recipe[],
    totalRecipes: number
}

interface NewestRecipes {
    newest: Recipe[]
}

async function getRecipeByCategory(category: string) {
    try {
        const recipes = await api.get<RecipeByCategoryAndName>(`/recipes/category/${category}`)

        return {
            recipes: recipes.data.recipes,
            totalRecipes: recipes.data.totalRecipes
        }

        // reponse: {data: {recipes: 1, totalRecipes: [{}]}} 
    } catch (error) {
        console.log('Error getting recipe by category:', error)
        throw new Error
    }
}

async function getRecipeById(id: string) {
    try {
        const recipe = await api.get<Recipe>(`/recipe/${id}`)

        return recipe.data
    } catch (error) {
        console.log('Error getting recipe by id:', error)
        throw new Error
    }
}

async function getRecipeByName(name: string) {
    try {
        const recipes = await api.get<RecipeByCategoryAndName>(`/recipes/search/${name}`)

        return {
            recipes: recipes.data.recipes,
            totalRecipes: recipes.data.totalRecipes
        }

        // reponse: {data: {recipes: 1, totalRecipes: [{}]}} 
    } catch (error) {
        console.log('Error getting recipe by name:', error)
        throw new Error
    }
}

async function getTop5NewRecipes() {
    try {
        const recipes = await api.get<NewestRecipes>('/recipes/newest')

        return recipes.data.newest
    } catch (error) {
        console.log('Error getting top 5 new recipes:', error)
    }
}

async function createRecipe(recipe: RecipeCreationAttributes) {
    try {
        const response = await api.post('/recipes', recipe)

        return response.status
    } catch (error) {
        console.log('Error creating recipe:', error)
        throw new Error
    }
}

export const recipeServer = { getRecipeByCategory, getRecipeById, getRecipeByName, getTop5NewRecipes, createRecipe }