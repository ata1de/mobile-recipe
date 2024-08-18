import { colors } from "@/styles/colors";
import { Camera } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";

export default function Avatar() {
    return (
        <View className="rounded-full justify-center items-center bg-zinc-100 w-[150px] h-[150px] p-3">
            <Image source={require('@/assets/avatar.png')} className="w-28 h-w-28 rounded-full" resizeMode='contain'/>

            <Pressable className="absolute bg-zinc-100 p-3 -bottom-2 -right-4 rounded-full">
                <Camera color={colors.red[800]} className="h-12 w-12" />
            </Pressable>
        </View>
    )
}