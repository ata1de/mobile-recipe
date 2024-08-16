import { Loading } from "@/components/loading";
import { RecommendationRecipe } from "@/components/recommendationRecipe";
import { categories } from "@/data/categories";
import { Recipe, recipeServer } from "@/server/recipeServer";
import { colors } from "@/styles/colors";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

export default function Category() {
    //PARAMS
    const category = useLocalSearchParams<{ name: string}>().name

    //LOADING
    const [categoryLoading, setCategoryLoading] = useState(true)

    //DATA
    const [recipeByCategory, setRecipeByCategory] = useState<Recipe[]>([])
    const [activeCategory, setActiveCategory] = useState<string>(category)

    //FUNCTIONS 
    async function getByCategory() {
        try {
            const recipes = await recipeServer.getRecipeByCategory(category)
            setRecipeByCategory(recipes.recipes)
        } catch (error) {
            console.log('error in get recipe by category',error)
            throw new Error
        } finally {
            setCategoryLoading(false)
        }
    }

    useEffect(() => {
        getByCategory()
    }, [category])

    if (categoryLoading) {
        return <Loading/>
    }
    return (
        <View className="flex-1">
            <View className="justify-center items-start mt-8 p-7">
                <Pressable onPress={() => router.back()} className="bg-red-50 z-10 rounded-full flex justify-center items-center p-2">
                    <ArrowLeft size={24} color={colors.red[950]} />
                </Pressable>

                <Text className="text-red-950 text-2xl font-bold text-left mt-5">Hey 👋 i want...</Text>
                <FlatList
                    data={categories}
                    horizontal
                    contentContainerClassName="flex-row gap-3 mt-4 flex-row justify-start overflow-scroll"
                    renderItem={({ item }) => (
                        <Pressable 
                        onPress={() => {
                            router.navigate(`/category/${item.name}` as any)
                            setActiveCategory(item.name)
                        }} 
                        className={`flex-col p-3 gap-2 border border-red-100 justify-center items-center w-[90px] max-h-[100px] rounded-lg ${activeCategory === item.name && 'bg-red-500'}`}
                        >
                            <Image 
                                source={item.imgUrl} 
                                style={{width: 50, height: 50}}
                                resizeMode="cover" 
                            />
                            <Text className={`text-sm font-semibold ${activeCategory === item.name && 'text-red-50'}`}>{item.name}</Text>
                        </Pressable>
                    )}
                />
            </View>
                
            {
                recipeByCategory.length == 0 ? (
                    <Text className="text-red-700 font-regular text-base mt-2 mb-6 text-center">
                        No recipes found in this category.
                    </Text>) : (
                        <FlatList 
                        data={recipeByCategory}
                        contentContainerClassName="flex-wrap w-full flex-1 gap-3 mt-4 flex-row justify-center items-center"
                        renderItem={({ item }) => (
                            <RecommendationRecipe {...item} />
                        )}
                    />
                    )
            }
            
        </View>
    )
}