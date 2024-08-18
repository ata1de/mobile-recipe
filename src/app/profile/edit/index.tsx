import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useAppSelector } from "@/store/hooks/hooks";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Pencil } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

export default function EditProfile() {
    const user = useAppSelector((state) => state.user.user)

    //LOADING
    const [showPassword, setShowPassword ] = useState(false)

    //FUNCTIONS
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View className="flex-1 p-7">
            <View className="flex justify-center items-center gap-3 border-b-2 border-red-200 py-5">
                <Pressable className="absolute left-1 top-8" onPressIn={() => router.back()}>
                    <ArrowLeft color={colors.red[800]} className="w-14 h-14 m-4"/>
                </Pressable>

                <Avatar />
            </View>

            <ScrollView className="mt-5">
                <View className="flex-1 my-4 gap-4">
                    <Input className="bg-zinc-100 gap-2 ">
                        <Mail color={colors.red[800]} className="w-14 h-14 m-4"/>

                        <Input.Field
                        aria-label="Email"
                        placeholder={user?.email}
                        />
                    </Input>
                    <Input className="bg-zinc-100 gap-2">
                        <Pencil color={colors.red[800]} className="w-14 h-14 m-4"/>

                        <Input.Field
                        aria-label="Name"
                        placeholder={user?.name}
                        />
                    </Input>
                    <Input className="bg-zinc-100 justify-between items-center">
                        <View className="flex-row justify-center items-center gap-3">
                            <Lock color={colors.red[800]} className="w-14 h-14 m-4"/>

                            <Input.Field
                            aria-label="Password"
                            placeholder={user?.password.slice(0, 10) + '****'}
                            secureTextEntry={!showPassword}
                            />
                        </View>

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
                </View>
                    

                    <Button
                    variant="secondary"
                    className="flex-1 rounded-md p-3"
                    >
                        <Button.Title className='text-lg font-semibold'>Edit</Button.Title>    
                    </Button>   
            </ScrollView>

        </View>
    
    )
}