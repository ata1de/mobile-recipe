import { colors } from "@/styles/colors";
import { Settings } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";

export default function Avatar() {
    return (
        <View className="rounded-full justify-center items-center bg-zinc-300 w-[150px] h-[150px] p-3">
            <Image source={require('@/assets/avatar.png')} className="w-28 h-28  " resizeMode='contain'/>

            <Pressable className="absolute bg-zinc-300 p-3 -bottom-3 -right-3 rounded-full">
                <Settings color={colors.red[800]} className="h-12 w-12" />
            </Pressable>
        </View>
    )
}