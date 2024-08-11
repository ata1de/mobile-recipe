import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from 'react-native'

export default function Index() {

    //STATES
    const [ keyboardStatus, setKeyboardStatus ] = useState(false)

    function handleKeyboardStatus() {
        Keyboard.dismiss()
        setKeyboardStatus(false)
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
                            <Input
                            
                            >
                                <Input.Field
                                 placeholder='Enter your name'
                                 onPressIn={() => setKeyboardStatus(true)}
                                 ></Input.Field>
                            </Input>
                            <Button className='w-full'>
                                <Button.Title>Continue</Button.Title>
                            </Button>

                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
                    
        </KeyboardAvoidingView>

    )
}
