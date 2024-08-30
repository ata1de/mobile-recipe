import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { ArrowLeft, Eye, EyeOff, Image, Lock, Mail, Pencil, SwitchCamera, Trash2, UserPen } from "lucide-react-native";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";

import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Loading } from "@/components/loading";

import { CreateUserAttributes, UpdateUserRequest, userService } from "@/server/userService";

import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";

import { colors } from "@/styles/colors";

import { Modal } from "@/components/modal";
import { setUser } from "@/store/slices/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';


const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required()
});

function errorMessage(formIsValid: any) {
    if (!formIsValid.isValid) {
        let errorMessage = '';

        switch (true) {
            case !!formIsValid.errors.email?.message:
                errorMessage = `Email Error: ${formIsValid.errors.email.message}`;
                break;
            case !!formIsValid.errors.name?.message:
                errorMessage = `Name Error: ${formIsValid.errors.name.message}`;
                break;
            case !!formIsValid.errors.password?.message:
                errorMessage = `Password Error: ${formIsValid.errors.password.message}`;
                break;
            default:
                errorMessage = 'Unknown Error';
        }

        return Alert.alert('Error', errorMessage);
    }
}

function urlImagePlatform(image: string) {
    if (Platform.OS === 'ios') {
        return image.replace('file://', 'ph:/');
    }

    return image;
}

export default function EditProfile() {
    //REDUX
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.user)

    //DATA
    const [ image, setImage ] = useState<string>()
    const [ modalImage, setModalImage ] = useState(false)

    //FORM
    const { control, handleSubmit, formState } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: user?.name!,
            email: user?.email!,
            password: user?.password!,
        }
        
    })

    //LOADING
    const [showPassword, setShowPassword ] = useState(false)
    const [ updateLoading, setUpdateLoading ] = useState(false)

    //FUNCTIONS
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    async function handleUpdate(data: CreateUserAttributes) {
        try {
            setUpdateLoading(true);
    
            const userUpdate = {
                id: user?.id!,
                email: data.email,
                name: data.name,
                password: data.password,
            };
        
            Alert.alert('Warning', 'Are you sure you want to update your profile?', [
                {
                    text: 'Yes',
                    onPress: async () => {
                        await saveUser(userUpdate);
                    }
                },
                {
                    text: 'No',
                    onPress: () => console.log("No button pressed")
                }
            ]);
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error caught in handleUpdate: ", error.message);
                Alert.alert('Error', error.message);
            }
        } finally {
            setUpdateLoading(false);
        }
    }

    const onSubmit = handleSubmit(
        async (data) => handleUpdate(data),
        (errors) => errorMessage({ isValid: false, errors })
    );

    async function saveUser(data: UpdateUserRequest) {
        try {
            const response = await userService.update(data)
    
            if (response.status == 200) {
                const user = await userService.getUser(Number(response.user))

                if (!user) {
                    throw new Error('User not found')
                }

                dispatch(setUser(user))
                
                Alert.alert('Success', 'Profile updated successfully')
            }
            
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message)
            }
            
        }
    }

    async function uploadImage(mode='camera') {
        try {
            if(mode === 'gallery') {
                await ImagePicker.requestMediaLibraryPermissionsAsync()
                let resultGallery = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                })

                if (!resultGallery.canceled) {
                    // const imageUrl = urlImagePlatform(resultGallery.assets[0].uri)
                    // await saveImage(imageUrl)
                    await saveImage(resultGallery.assets[0].uri) 
            }} else if (mode === 'remove') {
                setImage('')
            } else {
                console.log('camera')
                await ImagePicker.requestCameraPermissionsAsync()
    
                let result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                })
    
                if (!result.canceled) {
                    // const imageUrl = urlImagePlatform(result.assets[0].uri)
                    // await saveImage(imageUrl)
                    await saveImage(result.assets[0].uri)
    
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error uploading image', error.message)
            }
            setModalImage(false)

        }
    }

    async function saveImage(image: string) {
        try {
            setImage(image)
            setModalImage(false)
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message)
            }
            setModalImage(false)
        }
    }

    if (updateLoading) {
        return (
            <Loading />
        )
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

                <Pressable onPressIn={() => setModalImage(true)}>
                    <Avatar source={image} />
                </Pressable>

            </View>

            <ScrollView className="flex-1 mt-6">
                <View className="my-5 gap-4">
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
                            onChangeText={onChange}
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
                            onChangeText={onChange}
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
                                placeholder="Write your new password"
                                secureTextEntry={!showPassword}
                                onChangeText={onChange}
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
                    onPress={onSubmit}
                >
                    <Button.Title className='text-lg font-semibold'>Edit</Button.Title>    
                </Button>   
            </ScrollView>

            <Modal
            title="Upload Image"
            onClose={() => setModalImage(false)}
            visible={modalImage}
            subtitle="Upload your profile image"
            >
                <View className='flex-1 flex-row items-center justify-center gap-3 mt-5'>
                    <Button
                    variant="secondary"
                    onPress={() => uploadImage()}
                    className='rounded-lg p-5 flex-col items-center justify-center gap-3 flex-1'
                    >
                        <SwitchCamera color={colors.red[200]} className="w-16 h-16"/>

                        <Button.Title>Camera</Button.Title>
                    </Button>
                    <Button
                    variant="secondary"
                    onPress={() => uploadImage('gallery')}
                    className='rounded-lg p-5 flex-col items-center justify-center gap-3 flex-1'

                    >
                        <Image color={colors.red[200]} className="w-16 h-16"/>

                        <Button.Title>Gallery</Button.Title>

                    </Button>
                    <Button
                    variant="secondary"
                    onPress={() => uploadImage('remove')}
                    className='rounded-lg p-5 flex-col items-center justify-center gap-3 flex-1'

                    >
                        <Trash2 color={colors.red[200]} className="w-16 h-16"/>

                        <Button.Title>Remove</Button.Title>

                    </Button>
                </View>

            </Modal>

        </KeyboardAvoidingView >
    
    )
}