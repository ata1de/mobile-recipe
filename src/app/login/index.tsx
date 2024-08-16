import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";

export default function Login() {
    return (
        <View className="flex-1 ">
            <View className="justify-center items-center flex-1">
                <Image source={require('@/assets/bg-login.png')} className="absolute top-0"/>

                <Pressable className="absolute left-5 top-8" onPressIn={() => router.back()}>
                    <ArrowLeft color={colors.red[850]} className="w-14 h-14 m-4"/>
                </Pressable>
                    
                <Image source={require('@/assets/icon.png')} className="w-40 h-40" resizeMode='contain'/>

            </View>


            
        </View> 
    )
}