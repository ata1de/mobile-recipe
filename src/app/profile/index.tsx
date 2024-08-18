import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import { useAppSelector } from "@/store/hooks/hooks";
import { colors } from "@/styles/colors";
import { dayjsTransformDate } from "@/utils/dayjsTransformDate";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import EditProfile from "./editProfile";
import ProfileStatus from "./profile";

export default function Profile() {
    //REDUX
    const user = useAppSelector((state) => state.user.user)

    //DATA
    const data = dayjsTransformDate(user?.createdAt!)
    const [ status, setStatus ] = useState<'profile' | 'editProfile'>('profile')  

    return (
        <View className="flex-1 p-7">
            <View className="flex justify-center items-center gap-3 border-b-2 border-red-200 py-5">
                <Pressable className="absolute left-0 top-8" onPressIn={() => router.back()}>
                    <ArrowLeft color={colors.red[800]} className="w-14 h-14 m-4"/>
                </Pressable>

                <Avatar />
                <Text className="text-2xl font-bold mt-3 capitalize">{user?.name}</Text>
                <Text className="text-sm font-light mt-1"> Created at {data}</Text>
            </View>

            <ScrollView className="mt-5">
                    {
                        status === 'profile' ? (
                            <ProfileStatus />
                        ) : (
                            <EditProfile />
                        )
                    }

                    <Button
                    variant="secondary"
                    className="flex-1 rounded-md p-3"
                    >
                        <Button.Title className='text-lg font-semibold'>LogOut</Button.Title>    
                    </Button>   
            </ScrollView>

        </View>
    )
}