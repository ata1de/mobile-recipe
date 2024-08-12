import { Loading } from "@/components/loading";
import { Recipe, recipeServer } from "@/server/recipeServer";
import getFavoritesStorage from "@/storage/getFavorites";
import { addFavorite, removeFavorite } from "@/store/slices/favoriteRecipesSlice";
import { colors } from "@/styles/colors";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, BicepsFlexed, Clock, Droplet, Heart } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";

interface RecipeProps {
    recipe: Recipe
}

export default function RecipeDetails() {
    //PARAMS
    const id = useLocalSearchParams<{ id: string}>().id

    //REDUX
    const dispatch = useDispatch()
    //STATE
    const [recipe, setRecipe] = useState<Recipe>()
    const [isFavorite, setIsFavorite] = useState(false)

    //LOADING
    const [recipeLoading, setRecipeLoading] = useState(true)
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(true)

    //FUNCTIONS
    async function getRecipe() {
        try {
            const recipe = await recipeServer.getRecipeById(id)
            setRecipe(recipe!)
        } catch (error) {
            console.log('error in get recipe',error)
            throw new Error
        } finally {
            setRecipeLoading(false)
        }
    }

    function ToggleFavorite(recipe: Recipe) {
        if (recipe) {
            if (isFavorite) {
                dispatch(removeFavorite(recipe))
                setIsFavorite(false)
            } else {
                dispatch(addFavorite(recipe))
                setIsFavorite(true)
        }
    }
        
    }

    const loadFavorites = async () => {
        try {
            const favorites = await getFavoritesStorage();
            
            if (favorites.find((fav) => fav.id == Number(id))) {
                setIsFavorite(true);
            } 
        } catch (error) {
            console.log('Error in load favorites', error)
            throw new Error
        } finally {
            setIsFavoriteLoading(false)
        }
    };

    useEffect(() => {
        getRecipe()
        loadFavorites()
    }, [id])

    if (recipeLoading || !recipe || isFavoriteLoading) {
        return <Loading/>
    }

    return (
        <View className="flex-1 ">
            <Pressable onPress={() => router.back()} className="bg-red-50 z-10 rounded-full absolute top-8 left-5 flex justify-center items-center p-2">
                <ArrowLeft size={24} color={colors.red[950]} />
            </Pressable>

            <Image source={{ uri: recipe.imgUrl }} className="w-full flex-1 relative"/>

            <View className="flex-1 p-7 rounded-t-xl">
                <View className="gap-4">
                    <View className="flex-row justify-between w-full gap-4">
                        <Text className="font-semibold text-red-950 text-2xl">{recipe.title}</Text>
                        {
                            isFavorite ? (
                                <Pressable onPress={() => ToggleFavorite(recipe)} className="rounded-full p-2">
                                    <Heart size={24} color={colors.red[950]} />
                                </Pressable>
                            ) : (
                                <Pressable onPress={() => ToggleFavorite(recipe)} className="rounded-full p-2">
                                    <Heart size={24} color={colors.zinc[400]} />
                                </Pressable>
                            )
                        }
                    </View>
                    
                    <View className="flex-row gap-3">
                        <View className="flex-row gap-2 justify-center items-center">
                            <Clock size={20} color={colors.zinc[400]} />
                            <Text className="text-sm text-zinc-400">{recipe.time} min</Text>
                        </View>
                            
                        <View className="flex-row gap-2 justify-center items-center">
                            <BicepsFlexed size={20} color={colors.zinc[400]} />
                            <Text className="text-sm text-zinc-400">{recipe.difficulty}</Text>
                        </View>

                        <View className="flex-row gap-2 justify-center items-center">
                            <Droplet size={20} color={colors.zinc[400]} />
                            <Text className="text-sm text-zinc-400">{recipe.calories} cal</Text>
                        </View>
                    </View>

                </View>

                <View className="gap-3 w-full mt-5">
                    <Text className="font-semibold text-red-950 text-2xl">Description</Text>
                    <Text className="text-md text-zinc-400 text-wrap">{recipe.description}</Text>
                </View>
            </View>
        </View>
    )
}