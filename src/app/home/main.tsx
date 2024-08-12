import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { RecommendationRecipe } from "@/components/recommendationRecipe";
import { categories } from "@/data/categories";
import { Recipe, recipeServer } from "@/server/recipeServer";
import { UserState } from "@/store/slices/userSlice";
import { colors } from "@/styles/colors";
import { Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Main() {
    //REDUX
    const userName = useSelector((state: UserState) => state.user.name)

    //LOADING
    const [newestLoading, setNewestLoading] = useState(true)

    //DATA
    const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([])

    //FUNCTIONS 
    async function getNewestRecipes() {
        try {
            const newest = await recipeServer.getTop5NewRecipes()
            setRecentRecipes(newest!)
        } catch (error) {
            console.log('error in get newest recipes',error)
            throw new Error
        } finally {
            setNewestLoading(false)
        }
    }

    useEffect(() => {
        getNewestRecipes()
    }, [])

    if (newestLoading) {
        return <Loading/>
    }

    return (
        <View className="flex-1">
            <View className="justify-center items-center px-7 pt-7">
                <View className="my-5 flex-row w-full justify-between items-center">
                    <View className="items-start gap-2 max-w-[200px]">
                        <Text className="text-zinc-500 text-sm font-light">Hello, <Text className="text-red-500">{userName}</Text></Text>
                        <Text className="text-2xl font-bold leading-7 text-red-950">What would you like to cook today?</Text>
                    </View>

                    <Image source={require('../../../assets/favicon.png')} className="rounded-full w-16 h-16" />
                </View>

                <Input className="gap-2">
                    <Search color={colors.red[900]} size={20} />
                    <Input.Field placeholder="Search for recipes" />
                </Input>
            </View>

            <ScrollView className="mt-5 px-7">
                <Text className="text-2xl text-left font-bold text-red-950">Categories</Text>
                <FlatList
                    data={categories}
                    horizontal
                    contentContainerClassName="flex-row gap-3 mt-4 flex-row justify-start overflow-scroll"
                    renderItem={({ item }) => (
                        <View className="flex-col p-3 gap-2 border border-red-100 justify-center items-center w-[90px] max-h-[100px] rounded-lg">
                            <Image 
                                source={item.imgUrl} 
                                style={{width: 50, height: 50}}
                                resizeMode="cover" 
                            />
                            <Text className="text-sm font-semibold">{item.name}</Text>
                        </View>
                    )}
                />

                <Text className="text-2xl mt-7 text-left font-bold text-red-950">Recent Recipes</Text>
                <FlatList 
                    data={recentRecipes}
                    horizontal
                    contentContainerClassName="flex-row gap-3 mt-4 flex-row justify-start"
                    renderItem={({ item }) => (
                        <RecommendationRecipe {...item} />
                    )}
                />
            </ScrollView>
        </View>
    )
}