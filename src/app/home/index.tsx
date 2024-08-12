import { useState } from "react";
import { View } from "react-native";

import { Button } from "@/components/button";


import { HomeIcon, Plus, TextSearch } from 'lucide-react-native';


import { colors } from "@/styles/colors";
import Info from "./info";
import Main from "./main";

export default function Home() {
    //DATA
    const [ options, setOptions ] = useState<'home' | 'search'>('home')
    
    return (
        <View className="bg-[#FFFCFC] flex-1 justify-center">
            {
                options === 'home' ? (
                    <Main />
                ) : (
                    <Info />
                )
            }

            <View className="w-full absolute -bottom-1 self-center justify-end z-10">
                <View className="w-full flex-row bg-[#feebea] self-center border-zinc-300 gap-2 p-4 rounded-lg">
                    <Button 
                    className="flex-1 rounded-lg "
                    
                    onPress={() => setOptions('home')}
                    >
                        
                        <HomeIcon
                        color={options === 'home' ? colors.red[950] : colors.zinc[500]}
                        size={28}
                        />
                    </Button>

                    <Button
                    // className="absolute bottom-10 left-[155px] z-10 self-center justify-end rounded-full"
                    className="flex-1 rounded-lg"
                    variant="secondary"
                    >
                        <Plus   
                        color={colors.zinc[200]}
                        size={28}
                        />
                    </Button>

                    <Button 
                    className="flex-1 rounded-lg "
                    
                    onPress={() => setOptions('search')}
                    >
                        <TextSearch 
                        color={options === 'search' ? colors.red[950] : colors.zinc[500]}
                        size={28}
                        />
                    </Button>
                </View>
            </View>

            
        </View>
    )
}