import { Loading } from '@/components/loading'
import '../../global.css'

import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter'
import { Slot } from 'expo-router'
import { StatusBar, View } from 'react-native'


export default function Layout() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold
    
    })

    if (!fontsLoaded) {
        return <Loading/>
    }
    return (
        <View className='flex-1 justify-center'>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent/>
            <Slot/>
        </View>
    )
}