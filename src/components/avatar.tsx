import { colors } from "@/styles/colors";
import { Camera } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";

interface AvatarProps {
    source?: string
}

export default function Avatar({ source }: AvatarProps) {
    console.log(source)
    return (
        <View className={`rounded-full justify-center items-center border-8 ${!source && 'bg-zinc-100'} border-zinc-100 w-[150px] h-[150px] p-3`}>
            <Image source={source ? { uri: source } : require(`@/assets/avatar.png`)} className="w-28 h-w-28 rounded-full" resizeMode='contain'/>

            <Pressable className="absolute bg-zinc-100 p-3 -bottom-3 -right-5 rounded-full">
                <Camera color={colors.red[800]} className="h-12 w-12" />
            </Pressable>
        </View>
    )
}