import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import PersonalInfo from "@/components/personalInfo";
import { useAppSelector } from "@/store/hooks/hooks";
import { colors } from "@/styles/colors";
import { dayjsTransformDate } from "@/utils/dayjsTransformDate";
import { FormattedProfile } from "@/utils/formattedStatusProfile";
import { router } from "expo-router";
import { ArrowLeft, Lock, Mail, Pencil } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Profile() {
    //REDUX
    const user = useAppSelector((state) => state.user.user)

    //DATA
   const userName = user?.name ? FormattedProfile.capitalize(user.name) : '';
   const maskedPassword = user?.password ? FormattedProfile.maskPassword(user.password) : '';
   const data = dayjsTransformDate(user?.createdAt!)

    return (
        <View className="flex-1 p-7">
            <View className="flex justify-center items-center gap-3 border-b-2 border-red-200 py-5">
                <Pressable className="absolute left-1 top-8" onPressIn={() => router.back()}>
                    <ArrowLeft color={colors.red[800]} className="w-14 h-14 m-4"/>
                </Pressable>

                <Avatar />
                <Text className="text-2xl font-bold mt-3 capitalize">{user?.name}</Text>
                <Text className="text-sm font-light mt-1"> Created at {data}</Text>
            </View>

            <ScrollView className="mt-5">
                <View className="flex-1 my-4">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-lg font-semibold text-red-950">Personal Info</Text>

                        <Pressable onPressIn={() => router.push('/profile/edit')}>
                            <Text className="text-sm font-normal text-red-400">Edit</Text>
                        </Pressable>

                    </View>

                    <View className="mt-4 w-full">
                        <PersonalInfo Icon={Mail} gender="Email" content={user?.email!} />
                        <PersonalInfo Icon={Pencil} gender="Name" content={userName} />
                        <PersonalInfo Icon={Lock} gender="Password" content={maskedPassword} />
                    </View> 
                </View>

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