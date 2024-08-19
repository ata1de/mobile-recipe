import { useEffect, useState } from 'react'

import { Button } from '@/components/button'

import { Image, Text, View } from 'react-native'

import { Loading } from '@/components/loading'
import { userService } from '@/server/userService'
import { router } from 'expo-router'



export default function Index() {
    //Loading
    const [ loadingAuthenticated, setLoadingAuthenticated ] = useState(true)

    //FUNCTIONS
    async function userAlreadyExists() {
        try {

            const authenticated = await userService.check()

            if(authenticated.isAuthenticated) {
                router.push({
                    pathname: '/home'
                })   
            }  
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error getting if user is authenticated:', error.message)
            }
            throw new Error 
        } finally {
            setLoadingAuthenticated(false)
        }
    }

    useEffect(() => {
        userAlreadyExists()
    }, [])

    if(loadingAuthenticated) {
        return <Loading/>
    }

    return (
                <View className='flex-1 relative'>
                    <View className='bg-[#fe5f3c] py-20 justify-center items-center'>
                        <Image source={require('../assets/chiken.jpg')} className={`rounded-lg h-72 w-72`}/>
                    </View>

                    <View className='justify-center bottom-10 items-center self-center gap-12 py-3 bg-white w-full absolute z-20 rounded-t-[30px]'>
                        <View className='items-center gap-12 py-8 px-7 rounded-t-[30px]'>
                            <View className='flex justify-center items-start'>
                                <Text className='text-left text-3xl font-bold'>
                                    Welcome to AmigoKitchen
                                </Text>
                                <Text className='text-left text-sm font-light mt-4'>Your culinary journey starts here. Sign in to explore exclusive recipes, save your favorites, and share your creations with a community of friends who love cooking just as much as you do</Text>
                            </View>
                            

                            <View className='w-[300px] flex-1 items-center flex-row gap-3'>
                                <Button 
                                variant='secondary'
                                className='flex-1 rounded-full p-5'
                                onPress={() => router.push({pathname: '/login' as any})}
                                
                                >
                                    <Button.Title className='text-lg font-bold'>Login</Button.Title>
                                </Button>
                                <Button 
                                className='flex-1 rounded-full p-5' 
                                onPress={() => router.push({pathname: '/register' as any})}
                                >
                                    <Button.Title className='text-lg font-bold'>Register</Button.Title>
                                </Button>

                            </View>
                        </View>
                    </View>
                </View>
    )
}
