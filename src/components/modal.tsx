import { BlurView } from "expo-blur"
import { X } from "lucide-react-native"
import {
  KeyboardAvoidingView,
  ModalProps,
  Platform,
  Modal as RNModal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { colors } from "@/styles/colors"

type Props = ModalProps & {
  title: string
  subtitle?: string
  onClose?: () => void
}

export function Modal({
  title,
  subtitle = "",
  onClose,
  children,
  ...rest
}: Props) {
  return (
    <RNModal transparent animationType="slide" {...rest}>
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
        <BlurView
          className="flex-1"
          intensity={7}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
        >
          <View className="flex-1 justify-end bg-red-50/10">
            <View className="bg-red-50 border-t border-red-900 px-6 pt-5 pb-10">
              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex-row justify-between items-center pt-5">
                  <Text className="text-red-950 font-medium text-xl">{title}</Text>

                  {onClose && (
                    <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
                      <X color={colors.zinc[400]} size={20} />
                    </TouchableOpacity>
                  )}
                </View>

                {subtitle.trim().length > 0 && (
                  <Text className="text-zinc-400 font-regular leading-6  my-2">
                    {subtitle}
                  </Text>
                )}

                {children}
              </ScrollView>
            </View>
          </View>
        </BlurView>
      </KeyboardAvoidingView> 
    </RNModal>
  )
}