import Avatar from "@/components/avatar";
import { useAppSelector } from "@/store/hooks/hooks";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function Profile() {
    //REDUX
    const user = useAppSelector((state) => state.user.user)

    return (
        <View className="flex-1 p-7">
            <View className="flex justify-center items-center gap-3">
                <Pressable className="absolute left-0 top-8" onPressIn={() => router.back()}>
                    <ArrowLeft color={colors.red[800]} className="w-14 h-14 m-4"/>
                </Pressable>

                <Avatar />
                <Text className="text-2xl font-bold mt-3 capitalize">{user?.name}</Text>
                <Text className="text-sm font-light mt-1"> Criado em 17/08/2024</Text>
            </View>
        </View>
    )
}