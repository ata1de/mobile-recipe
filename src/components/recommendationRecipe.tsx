import { Recipe } from "@/server/recipeServer";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

export const RecommendationRecipe = (recipe: Recipe) => {
    return (
        <Link href={`/recipe/${recipe.id}` as any}>
            <View className="rounded-lg shadow-sm w-40 h-48">
                <Image source={{ uri: recipe.imgUrl }} className="rounded-lg w-full h-40" />
                <Text className="text-md text-left font-semibold text-red-950 mt-3">{recipe.title}</Text>
                <Text className="text-sm text-left font-light text-zinc-500 mt-1">{recipe.category}</Text>
            </View>
        </Link>
    )
}