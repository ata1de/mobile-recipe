import { Input } from "@/components/input";
import { categories } from "@/data/categories";
import { UserState } from "@/store/slices/userSlice";
import { FlatList, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Home() {
    //REDUX
    const userName = useSelector((state: UserState) => state.user.name)

    return (
        <View className="bg-[#FFFCFC] flex-1 justify-center p-7">
            <View className="flex-1 justify-center items-center">
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

            <View className="flex-1 my-5">
                <Text className="text-2xl text-left font-bold text-red-950">Categories</Text>
                <FlatList
                    data={categories}
                    className="overflow-x-scroll w-full"
                    renderItem={({ item }) => (
                        <View className="flex-col justify-center items-center w-[100px] rounded-xl">
                            <Image 
                                source={item.imgUrl} 
                                className="w-8 h-8" 
                                resizeMode="cover" 
                            />
                            <Text className="text-sm font-semibold">{item.name}</Text>
                        </View>
                    )}
                    contentContainerClassName="p-5 gap-3 flex-row justify-center items-center "
                />
            </View>
        </View>
    )
}