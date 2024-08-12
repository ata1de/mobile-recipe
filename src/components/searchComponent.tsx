import { Recipe } from "@/server/recipeServer";
import { colors } from "@/styles/colors";
import { Link } from "expo-router";
import { BookOpen } from "lucide-react-native";
import { Image, Text, View } from "react-native";

export default function SearchComponent(recipe: Recipe) {
    return (
        <Link href={`/recipe/${recipe.id}` as any} className="w-full">
            <View className="w-full items-center justify-between flex-row px-4">
            <View className="flex-row gap-3">
                <Image source={{ uri: recipe.imgUrl }} className="rounded-2xl w-20 h-20" />

                <View className="gap-1 ml-3">
                    <Text className="text-sm text-zinc-700 overflow-hidden text-ellipsis whitespace-nowrap max-h-6">
                        {recipe.category}
                    </Text>
                    <Text className="text-sm font-bold text-zinc-900 overflow-hidden text-ellipsis max-h-10">
                        {recipe.title}
                    </Text>
                    <Text className="text-sm font-normal text-zinc-400 overflow-hidden text-ellipsis whitespace-nowrap max-h-6">
                        {recipe.calories} cal
                    </Text>
                </View>
            </View>

            <View className="ml-auto">
                <BookOpen color={colors.red[950]} className="h-5 w-5"/>
            </View>
            </View>
        </Link>
    )
}