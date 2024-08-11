import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Image, Text, View } from 'react-native'

export default function Index() {
    return (
        <View className='flex-1'>
            <View className='bg-[#fe5f3c] flex-1 justify-center items-center'>
                <Image source={require('../assets/chiken.jpg')} className='rounded-lg' style={{ width: 270, height: 270 }}/>
            </View>

            <View className='flex-1 mt-5 z-10 rounded-t-xl justify-start items-center gap-12'>  
                <Text className='text-center text-3xl font-bold'>Welcome to <Text className='gradient-text'>AmigoKitchen</Text></Text>

                <View className='w-[300px] items-start gap-3'>
                    <Text className='text-xl font-semibold'>Whats your name?</Text>
                    <Input>
                        <Input.Field placeholder='Enter your name'></Input.Field>
                    </Input>
                    <Button className='w-full'>
                        <Button.Title>Continue</Button.Title>
                    </Button>

                </View>
            </View>
        </View>
    )
}