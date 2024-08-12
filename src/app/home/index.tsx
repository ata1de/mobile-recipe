import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { categories } from "@/data/categories";
import { Recipe, recipeServer } from "@/server/recipeServer";
import { UserState } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Home() {
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
            console.log(newest)
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
        <View className="bg-[#FFFCFC] flex-1 justify-center p-7">
            <View className="justify-center items-center">
                <View className="my-5 flex-row w-full justify-between items-center">
                    <View className="items-start gap-2 max-w-[200px]">
                        <Text className="text-zinc-400 text-sm font-light">Hello, <Text className="text-red-500">{userName}</Text></Text>
                        <Text className="text-2xl font-bold leading-7 text-red-950">What would you like to cook today?</Text>
                    </View>

                    <Image source={require('../../../assets/favicon.png')} className="rounded-full w-16 h-16" />
                </View>

                <Input>
                    <Input.Field placeholder="Search for recipes" />
                </Input>
            </View>

            <View className="flex-1 mt-5">
                <Text className="text-2xl text-left font-bold text-red-950">Categories</Text>
                <FlatList
                    data={categories}
                    horizontal
                    contentContainerClassName="flex-row gap-3 mt-4 flex-row justify-start overflow-scroll"
                    renderItem={({ item }) => (
                        <View className="flex-col p-3 gap-2 border border-red-300 justify-center items-center w-[90px] max-h-[100px] rounded-lg">
                            <Image 
                                source={item.imgUrl} 
                                style={{width: 50, height: 50}}
                                resizeMode="cover" 
                            />
                            <Text className="text-sm font-semibold">{item.name}</Text>
                        </View>
                    )}
                />
            </View>

            <View className="flex-1">
                <Text className="text-2xl text-left font-bold text-red-950">Recent Recipes</Text>
                <FlatList 
                    data={categories}
                    horizontal
                    contentContainerClassName="flex-row gap-3 mt-4 flex-row justify-start overflow-scroll"
                    renderItem={({ item }) => (
                        <View className="flex-col p-3 gap-2 border border-red-300 justify-center items-center w-[90px] max-h-[100px] rounded-lg">
                            <Image 
                                source={item.imgUrl} 
                                style={{width: 50, height: 50}}
                                resizeMode="cover" 
                            />
                            <Text className="text-sm font-semibold">{item.name}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}