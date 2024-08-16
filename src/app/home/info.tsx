import { RecommendationRecipe } from "@/components/recommendationRecipe";
import SearchComponent from "@/components/searchComponent";
import { useAppSelector } from "@/store/hooks/hooks";
import { FlatList, Text, View } from "react-native";

export default function Info() {
    //REDUX
    const recentViewer = useAppSelector((state) => state.recentView.recentViewsRecipes)
    const favorites = useAppSelector((state) => state.favorites.favoriteRecipes)
    
    return (
        
        <View className="flex-1 p-7">
            <Text className="text-red-950 text-2xl font-semibold my-6">Recently Viewed</Text>
            <View className="flex-1 border-b border-red-400">

                {
                    recentViewer.length == 0 ? (
                        <Text className="text-zinc-400 font-regular text-base mt-2 mb-6">
                            No recent recipe found.
                        </Text>
                    ) : (
                        <FlatList 
                        data={recentViewer.slice(0, 5)} 
                        horizontal
                        renderItem={({ item }) => <RecommendationRecipe {...item} />}
                        contentContainerClassName="gap-3 flex-row pb-3"
                        />
                    )
                }

            </View>
            
            <Text className="text-red-950 text-2xl font-semibold my-6">Favorites</Text>
            <View className="flex-1 ">

                {
                    favorites.length == 0 ? (
                        <Text className="text-zinc-400 font-regular text-base mt-2 mb-6">
                            No favorites recipes found.
                        </Text>
                    ) : (
                        <FlatList 
                        data={favorites}
                        renderItem={({ item }) => <SearchComponent {...item} />}
                        contentContainerClassName="gap-3 pb-3"
                        />
                    )
                }
            </View>
        </View>
    )
}