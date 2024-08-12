import { useEffect, useState } from 'react'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from 'react-native'

import { Loading } from '@/components/loading'
import getUserNameFromStorage from '@/storage/getUserName'
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks'
import { setUserName } from '@/store/slices/userSlice'
import { router } from 'expo-router'



export default function Index() {

    //REDUX 
    const dispatch = useAppDispatch()  
    const userName = useAppSelector((state) => state.user.name)
    const [name, setName] = useState(userName)

    //STATES
    const [ keyboardStatus, setKeyboardStatus ] = useState(false)

    //Loading
    const [loading, setLoading] = useState(false)
    const [ loadingStorage, setLoadingStorage ] = useState(true)

    //FUNCTIONS
    function handleKeyboardStatus() {
        Keyboard.dismiss()
        setKeyboardStatus(false)
    }

    async function userAlreadyExists() {
        try {
            const userName = await getUserNameFromStorage()
    
            if(userName.length > 0) {
                router.push({
                    pathname: '/home' as any
                })   
            }  
        } catch (error) {
            console.log('Error getting user name from storage:', error)
            throw new Error 
        } finally {
            setLoadingStorage(false)
        }
    }

    async function saveUserName(name: string) {
        try {
            setLoading(true)

            if (!name) {
                return Alert.alert('Name is required')
            }

            Alert.alert(
                'Confirm',
                'Are you sure you want to save this name?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Save Cancelled'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            dispatch(setUserName(name))
                            router.push({
                                pathname: '/home' as any
                            })
                        },
                    },
                ]
            );

        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        userAlreadyExists()
    }, [])

    if(loadingStorage) {
        return <Loading/>
    }

    return (
        <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 0} // Ajuste o valor conforme necessário
                    contentContainerClassName='flex-1 justify-center items-center pt-8 gap-12'
                    >
            <TouchableWithoutFeedback onPress={handleKeyboardStatus}>
                <View className='flex-1'>
                    <View className='bg-[#fe5f3c] flex-1 justify-center items-center'>
                        <Image source={require('../assets/chiken.jpg')} className={`rounded-lg ${keyboardStatus ? 'hidden': 'w-[250px] h-[250px]'} `}/>
                    </View>

                    <View className='justify-center items-center gap-12 mt-9 pb-7'>
                        <Text className='text-center text-3xl font-bold'>
                            Welcome to AmigoKitchen
                        </Text>
                        

                        <View className='w-[300px] items-start gap-3'>
                            <Text className='text-xl font-semibold'>Whats your name?</Text>
                            <Input>
                                <Input.Field
                                 placeholder='Enter your name'
                                 onPressIn={() => setKeyboardStatus(true)}
                                 value={name}
                                 onChangeText={setName}
                                 ></Input.Field>
                            </Input>
                            <Button 
                            className='w-full' 
                            onPress={() => saveUserName(name)}
                            isLoading={loading}
                            >
                                <Button.Title>Continue</Button.Title>
                            </Button>

                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
                    
        </KeyboardAvoidingView>

    )
}
