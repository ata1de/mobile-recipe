import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { userService } from "@/server/userService";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { setUser } from "@/store/slices/userSlice";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";

export default function Login() {
    //REDUX
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.user)

    //DATA
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    //LOADING
    const [ loading, setLoading ] = useState(false)//LOADING
    const [showPassword, setShowPassword ] = useState(false)

    //FUNCTIONS
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    async function handleLogin() {
        if (email.length === 0 || password.length === 0) {
            return Alert.alert('Error', 'Please fill all fields');
        }
    
        setLoading(true);
    
        try {
            const response = await userService.login({
                email,
                password
            });
    
            if (response.status === 200) {
                dispatch(setUser(response.user));
                router.push({
                    pathname: '/home'
                });
            } else if (response.status === 401) {
                Alert.alert('Error', response.message);
            } else {
                Alert.alert('Error', 'An unknown error occurred');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred');
        } finally {
            setLoading(false);
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
                <View className="flex justify-center items-center gap-5   px-7">
                    
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
                        secureTextEntry={!showPassword}
                        />

                        {   
                            showPassword ? (
                                <Pressable onPressIn={toggleShowPassword}>
                                    <EyeOff color={colors.red[800]} className="w-14 h-14 mr-4"/>
                                </Pressable>
                            ) : (
                                <Pressable onPressIn={toggleShowPassword}>
                                    <Eye color={colors.red[800]} className="w-14 h-14 mr-4"/>
                                </Pressable>
                            )
                        }
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