import { colors } from "@/styles/colors";
import { LucideIcon } from "lucide-react-native";
import { Text, View } from "react-native";

interface PersonalInfoProps {
    Icon: LucideIcon
    gender: string
    content: string
}

export default function PersonalInfo({ Icon, gender, content }: PersonalInfoProps) {
    return (
        <View  className="w-full flex-row p-2 h-16 justify-between items-center bg-zinc-100 rounded-lg my-2">
            <View className="flex-row justify-center items-center gap-2">
                <Icon className="w-8 h-8" color={colors.red[900]}/>
                <Text className="text-md text-zinc-400">{gender}</Text>
            </View>

            <Text className="text-lg font-semibold text-zinc-500 max-w-[200px] overflow-ellipsis truncate">{content}</Text>
        </View>
    )
}