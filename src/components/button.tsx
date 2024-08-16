import { createContext, useContext } from "react";

import clsx from "clsx";
import { ActivityIndicator, Text, TextInputProps, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Variants = 'primary' | 'secondary'

type ButtonProps = TouchableOpacityProps & {
    variant?: Variants
    isLoading?: boolean
}

const ThemeContext = createContext<{variant?: Variants}>({})

function Button({ children ,variant = 'primary', isLoading, className, ...props }: ButtonProps) {
    return <TouchableOpacity
     className={clsx("flex justify-center items-center gap-2 flex-row ",
        {
            'bg-[#feebea]': variant === 'primary',
            'bg-[#F65050]': variant === 'secondary',
        },
        className
    )}
    disabled={isLoading}
    activeOpacity={0.7}
    {...props}
     
    >
        <ThemeContext.Provider value={{variant}}>
            {isLoading ? <ActivityIndicator className="text-rose-900"/> : children}
        </ThemeContext.Provider>
    </TouchableOpacity>
}

function Title({ children, className }: TextInputProps) {
    const { variant } = useContext(ThemeContext)

    return <Text className={clsx("text-base font-semibold",
        {
            'text-[#E84143]': variant === 'primary',
            'text-[#FFFCFC]': variant === 'secondary',
        },
        className
    )}>{children}</Text>
}

Button.Title = Title

export { Button };

