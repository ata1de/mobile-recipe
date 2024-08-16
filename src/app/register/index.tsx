import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { userService } from "@/server/userService";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

export default function Register() {
    //DATA
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ name, setName ] = useState('')

    //LOADING
    const [ loading, setLoading ] = useState(false)

    async function handleRegister() {
        if (!email || !password || !name) {
            return Alert.alert('Error', 'Please fill all fields')
        }

        setLoading(true)

        try {
            const response = await userService.register({
                name,
                email,
                password
            })

            if(response.status === 201) {
                Alert.alert('Success', 'User created successfully', [
                    {
                        text: 'Ok',
                        onPress: () => router.push({
                            pathname: '/login'
                        })
                    }
                ])
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
        <View className="flex-1">
            <View className="bg-[#E03C28] justify-center items-center py- h-2/5">
                <Pressable className="absolute left-5 top-8" onPressIn={() => router.back()}>
                    <ArrowLeft color={colors.red[300]} className="w-14 h-14 m-4"/>
                </Pressable>

                <View className="gap-3 justify-center items-start px-7">
                    <Text className="text-3xl font-bold text-red-100">
                        Register
                    </Text>
                    <Text className="text-sm font-light text-red-100 ">
                    Ready to transform your culinary skills? At <Text className="font-bold text-red-50">AmigoKitchen</Text>, you can access <Text className="font-bold text-red-50">amazing recipes</Text>, personalize your recipe book, and share your creations with friends and family. Create your account and become part of a <Text className="font-bold text-red-50">passionate cooking community</Text>.
                    </Text>
                </View>
            </View>

            <View className="absolute z-20 bottom-14 self-center w-full bg-white py-7 rounded-tl-[40px] h-3/5">
                <View className="flex justify-center items-center gap-8 py-8 px-7">
                    
                    <Text className="text-3xl font-bold">
                        SignIn
                    </Text>

                    <Input>
                        <Input.Field
                        value={name}
                        onChangeText={setName}
                        placeholder="Write your name"
                        />
                    </Input>
                    
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
                    className="w-full p-4 rounded-lg"
                    isLoading={loading}
                    onPress={handleRegister}
                    >
                        <Button.Title className="font-bold text-xl">Register</Button.Title>
                    </Button>
                
                </View>
            </View>
        </View>
    )
}