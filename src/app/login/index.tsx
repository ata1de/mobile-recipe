import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

export default function Login() {
    return (
        <View className="flex-1 ">
            <View className="justify-center items-center h-2/5">
                <Image source={require('@/assets/bg-login.png')} className="absolute top-0"/>

                <Pressable className="absolute left-5 top-8" onPressIn={() => router.back()}>
                    <ArrowLeft color={colors.red[850]} className="w-14 h-14 m-4"/>
                </Pressable>
                    
                <Image source={require('@/assets/icon.png')} className="w-40 h-40" resizeMode='contain'/>

            </View>

            <View className="absolute z-20 bottom-14 self-center w-full bg-white py-7 rounded-tl-[40px] h-3/5">
                <View className="flex justify-center items-center gap-8 py-8 px-7">
                    
                    <Text className="text-3xl font-bold">
                        Login
                    </Text>

                    <Input>
                        <Input.Field>Write your best email</Input.Field>
                    </Input>
                
                    <Input>
                        <Input.Field>Write your password</Input.Field>
                    </Input>

                    <Button variant="secondary" className="w-full p-4 rounded-lg">
                        <Button.Title className="font-bold text-xl">Login</Button.Title>
                    </Button>
                
                </View>
            </View>


            
        </View> 
    )
}