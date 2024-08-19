import { router } from "expo-router";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Pencil, UserPen } from "lucide-react-native";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";

import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

import { CreateUserAttributes, userService } from "@/server/userService";

import { useAppSelector } from "@/store/hooks/hooks";

import { colors } from "@/styles/colors";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required()
});

export default function EditProfile() {
    //REDUX
    const user = useAppSelector((state) => state.user.user)

    //DATA
    const [password, setPassword] = useState(user?.password!);

    //FORM
    const { control, handleSubmit, formState } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: user?.email!,
            name: user?.name!,
            password: password
        }
    })

    //LOADING
    const [showPassword, setShowPassword ] = useState(false)

    //FUNCTIONS
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    async function handleUpdate(data: CreateUserAttributes) {
        if (!formState.isValid) {
            return Alert.alert('Error', `${formState.errors}`)
        }

        try {
            const user = {
                email: data.email,
                name: data.name,
                password: data.password
            }

            Alert.alert('Warning', 'Are you sure you want to update your profile?', [
                {
                    text: 'Yes',
                    onPress: () => saveUser(user)
                },
                {
                    text: 'No',
                }
            ])

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message)
            }
    }}

    async function saveUser(data: CreateUserAttributes) {
        const response = await userService.update(data)

            if (response.status == 200) {
                Alert.alert('Success', 'Profile updated successfully')
            }
    }

    return (
        <KeyboardAvoidingView 
        className="flex-1 p-7"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        >
            <View className="flex justify-center items-center gap-3 border-b-2 border-red-200 py-5">
                <Pressable className="absolute left-1 top-8" onPressIn={() => router.back()}>
                    <ArrowLeft color={colors.red[800]} className="w-14 h-14 m-4"/>
                </Pressable>

                <Avatar />
            </View>

            <ScrollView className="flex-1 mt-6">
                <View className="my-4 gap-4">
                    <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-semibold text-red-950">Edit Profile</Text>

                            <UserPen color={colors.red[800]} className="w-14 h-14 m-4"/>

                    </View>
                    <Input className="bg-zinc-100 gap-2 ">
                        <Mail color={colors.red[800]} className="w-14 h-14 m-4"/>

                        <Controller
                        control={control}
                        name='email'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input.Field
                            aria-label="Email"
                            placeholder='Write your email'
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            />
                        )}
                        />
                    </Input>
                    <Input className="bg-zinc-100 gap-2">
                        <Pencil color={colors.red[800]} className="w-14 h-14 m-4"/>

                        <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input.Field
                            aria-label="name"
                            placeholder='Write your name'
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            />
                        )}
                        />
                    </Input>
                    <Input className="bg-zinc-100 justify-between items-center">
                        <View className="flex-row justify-center items-center gap-3">
                            <Lock color={colors.red[800]} className="w-14 h-14 m-4"/>

                            <Controller 
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input.Field
                                className="max-w-[200px]"
                                aria-label="Password"
                                secureTextEntry={!showPassword}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                />
                            )}
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
                onPress={handleSubmit(handleUpdate)}
                >
                    <Button.Title className='text-lg font-semibold'>Edit</Button.Title>    
                </Button>   
            </ScrollView>

        </KeyboardAvoidingView >
    
    )
}