import { useState } from "react";
import { Alert, View } from "react-native";

import { Button } from "@/components/button";


import { HomeIcon, Plus, TextSearch } from 'lucide-react-native';

import RNPickerSelect from 'react-native-picker-select';

import { colors } from "@/styles/colors";

import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import Info from "./info";
import Main from "./main";

import { RecipeCreationAttributes, recipeServer } from "@/server/recipeServer";

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";

import { Loading } from "@/components/loading";
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    time: Yup.number().required('Time is required').positive('Must be a positive number'),
    difficulty: Yup.string().required('Difficulty is required'),
    category: Yup.string().required('Category is required'),
    calories: Yup.number().required('Calories is required').positive('Must be a positive number'),
    imgUrl: Yup.string().url('Must be a valid URL').required('Image URL is required'),
  });

export default function Home() {
    //DATA
    const [ options, setOptions ] = useState<'home' | 'search'>('home')
    const [ showModal, setShowModal ] = useState(false)

    //LOADING
    const [ loading, setLoading ] = useState(false)

    //FORM
    const { control, handleSubmit, formState: { errors } } = useForm<RecipeCreationAttributes>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: '', // Valor padrão para o campo "title"
            description: '', // Valor padrão para o campo "description"
            time: Number('0'), // Valor padrão para o campo "time"
            difficulty: 'Easy', // Valor padrão para o campo "difficulty"
            category: 'Lunch', // Valor padrão para o campo "category"
            calories: Number('0'), // Valor padrão para o campo "calories"
            imgUrl: '', // Valor padrão para o campo "imgUrl"
        },
    });

    //FUNCTIONS
    async function handleCreateRecipe(data: RecipeCreationAttributes) {
        try {
            setLoading(true);

            const recipe: RecipeCreationAttributes = {
                ...data,
                time: Number(data.time),
                calories: Number(data.calories)
            };

            const response = await recipeServer.createRecipe(recipe);

            if (response === 201) {
                Alert.alert('Success', 'Recipe created successfully');
            }
            
            setShowModal(false);
        } catch (error) {
            console.log('Error in create recipe', error);
        } finally {
            setLoading(false);
        }

    }

    if (loading) {
        return <Loading />
    }
    
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
                    className="flex-1 rounded-lg h-11 px-3 "
                    
                    onPress={() => setOptions('home')}
                    >
                        
                        <HomeIcon
                        color={options === 'home' ? colors.red[950] : colors.zinc[500]}
                        size={28}
                        />
                    </Button>

                    <Button
                    // className="absolute botto h-11 px-3m-10 left-[155px] z-10 self-center justify-end rounded-full"
                    className="flex-1 rounded-lg h-11 px-3"
                    variant="secondary"
                    onPress={() => setShowModal(true)}
                    >
                        <Plus   
                        color={colors.zinc[200]}
                        size={28}
                        />
                    </Button>

                    <Button 
                    className="flex-1 rounded-lg h-11 px-3 "
                    
                    onPress={() => setOptions('search')}
                    >
                        <TextSearch 
                        color={options === 'search' ? colors.red[950] : colors.zinc[500]}
                        size={28}
                        />
                    </Button>
                </View>
            </View>

            <Modal
            title="Create a new recipe"
            onClose={() => setShowModal(false)}
            visible={showModal}
            subtitle="Fill the fields below to create a new recipe" 
            >
                <View className="gap-4 mt-7">
                    <View className="flex-row items-center justify-center gap-2">
                        <Input className="flex-1">
                            <Controller
                                control={control}
                                name="title"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input.Field
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder="Write the title"
                                        
                                    />
                                )}
                            />
                        </Input>
                        <Input className="flex-1">
                            <Controller
                                control={control}
                                name="description"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input.Field
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder="Write the description"
                                        
                                    />
                                )}
                            />
                        </Input>
                    </View>
                    <View className="flex-row items-center justify-center gap-2">
                        <Input className="flex-1">
                            <Controller
                                control={control}
                                name="time"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input.Field
                                        value={value.toLocaleString()}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder="Write the time"
                                        
                                    />
                                )}
                            />
                        </Input>
                        <View className="flex-row flex-1 items-center justify-center rounded-lg py-3.5 border-red-600 border">
                            <Controller
                                control={control}
                                name="difficulty"
                                render={({ field: { onChange, value } }) => (
                                    <RNPickerSelect
                                        value={value}
                                        activeItemStyle={{ backgroundColor: colors.red[950] }}
                                        dropdownItemStyle={{ backgroundColor: colors.red[200] }}
                                        darkTheme
                                        style={{ inputAndroid: { color: colors.red[950] }, inputIOS: { color: colors.red[950] }}}
                                        onValueChange={onChange}
                                        items={[
                                            { label: 'Easy', value: 'Easy' },
                                            { label: 'Medium', value: 'Medium' },
                                            { label: 'Hard', value: 'Hard' },
                                        ]}
                                    />
                                )}
                            />
                        </View>
                    </View>
                    <View className="flex-row items-center justify-center gap-2">
                        <View className="flex-row flex-1 items-center justify-center rounded-lg py-3.5 border-red-600 border">
                            <Controller
                                control={control}
                                name="category"
                                render={({ field: { onChange, value } }) => (
                                    <RNPickerSelect
                                        value={value}
                                        activeItemStyle={{ backgroundColor: colors.red[950] }}
                                        dropdownItemStyle={{ backgroundColor: colors.red[200] }}
                                        darkTheme
                                        style={{ inputAndroid: { color: colors.red[950] }, inputIOS: { color: colors.red[950] }}}
                                        onValueChange={onChange}
                                        items={[
                                            { label: 'Lunch', value: 'Lunch' },
                                            { label: 'Dinner', value: 'Dinner' },
                                            { label: 'Sweets', value: 'Sweets' },
                                            { label: 'Salted', value: 'Salted' },
                                            { label: 'Breakfast', value: 'Breakfast' },
                                        ]}
                                    />
                                )}
                            />
                        </View>
                        <Input className="flex-1">
                            <Controller
                                control={control}
                                name="calories"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input.Field
                                        value={value.toLocaleString()}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder="Write the calories"
                                        
                                    />
                                )}
                            />
                        </Input>
                    </View>
                    <Input>
                        <Controller
                            control={control}
                            name="imgUrl"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input.Field
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholder="Write url from image"
                                    
                                />
                            )}
                        />
                    </Input>
                    <Button
                        className="rounded-lg h-11 px-3" 
 h-11 px-3                        variant="secondary"
                        onPress={handleSubmit(handleCreateRecipe)}
                    >
                        <Button.Title>Create recipe</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}