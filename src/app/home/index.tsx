import { useState } from "react";
import { Alert, View } from "react-native";

import { Button } from "@/components/button";


import { HomeIcon, Plus, TextSearch } from 'lucide-react-native';


import { colors } from "@/styles/colors";

import Info from "./info";
import Main from "./main";

import { RecipeCreationAttributes, recipeServer } from "@/server/recipeServer";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
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


    // FORM STATES
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');
    const [calories, setCalories] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    //FORM
    const { handleSubmit, formState: { errors } } = useForm<RecipeCreationAttributes>({
        resolver: yupResolver(validationSchema),
      });

    //FUNCTIONS
    async function handleCreateRecipe() {
        try {
            const errorSchema = errors.calories || errors.category || errors.description || errors.difficulty || errors.imgUrl || errors.time || errors.title
            if (errorSchema){    
                return Alert.alert('Error', 'Fill all fields')
            }
            const recipe: RecipeCreationAttributes = {
                title,
                description,
                time: Number(time),
                difficulty,
                category,
                calories: Number(calories),
                imgUrl
            }

            const response = await recipeServer.createRecipe(recipe)

            if (response === 201) {
                Alert.alert('Success', 'Recipe created successfully')
            }

        } catch (error) {
            console.log('Error in create recipe', error)
        } finally {
            setShowModal(false)
        }
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
                    onPress={() => setShowModal(true)}
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

            <Modal
            title="Create a new recipe"
            onClose={() => setShowModal(false)}
            visible={showModal}
            subtitle="Fill the fields below to create a new recipe" 
            >
                <View className="gap-4 mt-5">
                    <View className="flex-row items-center justify-center gap-2">
                        <Input className="flex-1">
                            <Input.Field
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Write the title"
                            />
                        </Input>
                        <Input className="flex-1">
                            <Input.Field
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Write the description"
                            />
                        </Input>
                    </View>
                    <View className="flex-row items-center justify-center gap-2">
                        <Input className="flex-1">
                            <Input.Field
                            value={time}
                            onChangeText={setTime}
                            placeholder="Write the time"
                            />
                        </Input>
                        <Input className="flex-1">
                            <Input.Field
                            placeholder="Write the title of the recipe"
                            />
                        </Input>
                    </View>
                    <View className="flex-row items-center justify-center gap-2">
                        <Input className="flex-1">
                            <Input.Field
                            placeholder="Write the title of the recipe"
                            />
                        </Input>
                        <Input className="flex-1">
                            <Input.Field
                            value={calories}
                            onChangeText={setCalories}
                            placeholder="Write the calories"
                            />
                        </Input>
                    </View>
                    <Input>
                        <Input.Field
                        value={imgUrl}
                        onChangeText={setImgUrl}
                        placeholder="Write url from image"
                        />
                    </Input>
                    <Button
                    className="rounded-lg" 
                    variant="secondary"
                    onPress={handleSubmit(handleCreateRecipe)}>
                        <Button.Title>Create recipe</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}