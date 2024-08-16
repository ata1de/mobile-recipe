import { useState } from 'react'

import { Button } from '@/components/button'

import { Alert, Image, Keyboard, Text, View } from 'react-native'

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
                    pathname: '/home'
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

    // useEffect(() => {
    //     userAlreadyExists()
    // }, [])

    // if(loadingStorage) {
    //     return <Loading/>
    // }

    return (
                <View className='flex-1 relative'>
                    <View className='bg-[#fe5f3c] py-20 justify-center items-center'>
                        <Image source={require('../assets/chiken.jpg')} className={`rounded-lg ${keyboardStatus ? 'hidden': 'w-[250px] h-[250px]'} `}/>
                    </View>

                    <View className='justify-center bottom-14 items-center self-center gap-12 py-3 bg-white w-full absolute z-20 rounded-t-[30px]'>
                        <View className=' items-center gap-12 py-8 px-7 rounded-t-[30px]'>
                            <View className='flex justify-center items-start'>
                                <Text className='text-left text-3xl font-bold'>
                                    Welcome to AmigoKitchen
                                </Text>
                                <Text className='text-left text-sm font-light mt-4'>Your culinary journey starts here. Sign in to explore exclusive recipes, save your favorites, and share your creations with a community of friends who love cooking just as much as you do</Text>
                            </View>
                            

                            <View className='w-[300px] flex-1 items-center flex-row gap-3'>
                                <Button 
                                variant='secondary'
                                className='flex-1 rounded-full p-5'>
                                    <Button.Title className='text-lg font-bold'>Login</Button.Title>
                                </Button>
                                <Button 
                                className='flex-1 rounded-full p-5' 
                                onPress={() => saveUserName(name)}
                                isLoading={loading}
                                >
                                    <Button.Title className='text-lg font-bold'>Register</Button.Title>
                                </Button>

                            </View>
                        </View>
                    </View>
                </View>
    )
}
