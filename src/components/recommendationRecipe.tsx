import { router } from "expo-router";
import { Image, Pressable, Text } from "react-native";

import { Recipe } from "@/server/recipeServer";
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Loading } from "./loading";

const PressableAnimated = Animated.createAnimatedComponent(Pressable)

interface RecommendationRecipeProps {
    recipe: Recipe
    index: number
}

export const RecommendationRecipe = ({ recipe, index }: RecommendationRecipeProps) => {

    if (!recipe) {
        return <Loading/>
    }
    return (
            <PressableAnimated 
            onPress={() => router.push(`/recipe/${recipe.id}` as any)} 
            className="rounded-lg shadow-sm w-40 h-48"
            entering={FadeInUp.delay(index * 100)}
            >
                <Image source={{ uri: recipe.imgUrl }} className="rounded-lg w-full h-40" />
                <Text className="text-md text-left font-semibold text-red-950 mt-3">{recipe.title}</Text>
                <Text className="text-sm text-left font-light text-zinc-500 mt-1">{recipe.category}</Text>
            </PressableAnimated>
    )
}