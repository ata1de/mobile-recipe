import { StatusBar, View } from 'react-native'
import '../../global.css'

import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter'
import { Slot } from 'expo-router'

import { Loading } from '@/components/loading'

import store, { persistor } from '@/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'


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
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <View className='flex-1 justify-center'>
                    <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent/>
                    <Slot/>
                </View>
            </PersistGate>
        </Provider>
    )
}