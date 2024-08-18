import PersonalInfo from "@/components/personalInfo";
import { useAppSelector } from "@/store/hooks/hooks";
import { Lock, Mail, Pencil } from "lucide-react-native";
import { Text, View } from "react-native";

export default function ProfileStatus() {
   //REDUX
   const user = useAppSelector((state) => state.user.user)
   
   //DATA
   const userName = user?.name ? capitalize(user.name) : '';
   const maskedPassword = user?.password ? maskPassword(user.password) : '';

   //Functions
    function capitalize(text: string) {
        return text.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    }

    function maskPassword(password: string) {
        return '*'.repeat(password.length);
    }

    return (
        <View className="flex-1 my-4">
            <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-red-950">Personal Info</Text>

                <Text className="text-sm font-normal text-red-400">Edit</Text>
            </View>

            <View className="mt-4 w-full">
                <PersonalInfo Icon={Mail} gender="Email" content={user?.email!} />
                <PersonalInfo Icon={Pencil} gender="Email" content={userName} />
                <PersonalInfo Icon={Lock} gender="Email" content={maskedPassword} />
            </View>
        </View>
    )
}