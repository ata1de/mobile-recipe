import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { userService } from "@/server/userService";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";

export default function Login() {

    //DATA
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    //LOADING
    const [ loading, setLoading ] = useState(false)

    async function handleLogin() {
        if (email.length === 0 || password.length === 0) {
            return Alert.alert('Error', 'Please fill all fields')
        }

        setLoading(true)

        try {
            const response = await userService.login({
                email,
                password
            })

            if(response.status === 200) {
                router.push({
                    pathname: '/home'
                })
            } else {
                Alert.alert('Error', 'Invalid email or password')
            }
        } catch (error) {
            console.log('Error login:', error)
            Alert.alert('Error', 'An error occurred')
            }
        finally {
            setLoading(false)
        }
    }

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
                        <Input.Field
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Write your email"
                        />
                    </Input>
                
                    <Input>
                        <Input.Field
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Write your password"
                        />
                    </Input>

                    <Button 
                    variant="secondary" 
                    className="w-full p-4 rounded-lg"
                    isLoading={loading}
                    onPress={handleLogin}
                    >
                        <Button.Title className="font-bold text-xl">Login</Button.Title>
                    </Button>
                
                </View>
            </View>


            
        </View> 
    )
}