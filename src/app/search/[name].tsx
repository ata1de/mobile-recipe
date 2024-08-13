import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import SearchComponent from "@/components/searchComponent";
import { RecipeByCategoryAndName, recipeServer } from "@/server/recipeServer";
import { colors } from "@/styles/colors";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, SearchIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";

interface fetchDataProps {
    q: string
}


export default function Search() {
    //PARAMS
    const recipeName = useLocalSearchParams<{ name: string }>().name;

    //DATA
    const [recipe, setRecipe] = useState<RecipeByCategoryAndName>()
    const [inputValue, setInputValue] = useState<string>("")

    //LOADING
    const [recipeLoading, setRecipeLoading] = useState(true)

    //FUNCTIONS

    async function fetchData({ q }: fetchDataProps) {
        try {
            const response = await recipeServer.getRecipeByName(q)
            setRecipe(response)
        } catch (error) {
            console.log('Error in get recipes by name in search page', error)
            throw error
        } finally {
            setRecipeLoading(false)
        }
    }

    async function handleSubmit() {
        try {
            if (inputValue.length === 0) {
                return Alert.alert('Campo vazio', 'Digite algo para pesquisar')
            }
            
            // Navegar para a nova página
            router.push({
                pathname: `/search/${inputValue}` as any,  // Cast para "any" ou "string"
            });
            
            
        } catch (error) {
            console.log('Error in search', error)
        }
    }

    useEffect(() => {
        fetchData({ q: recipeName })
    },[recipeName])

    if (recipeLoading) {
        return <Loading />
    }

    console.log(recipe)

    return (
        <View className="flex-1 p-5">
            <View className="flex-row gap-4 justify-between items-center">
                <Pressable onPressIn={() => router.back()} className="flex bg-red-200 mt-3 rounded-3xl p-2 items-center justify-center">
                    <ArrowLeft size={24} color={colors.red[900]} />
                </Pressable>

                <Input className="mt-3 gap-3 flex justify-center items-center max-w-[269px]">
                    <SearchIcon size={20} color={colors.red[900]} />
                    <Input.Field 
                        value={inputValue} 
                        onChangeText={setInputValue} 
                        placeholder="Procure uma notícia"
                        onSubmitEditing={() => handleSubmit()}
                    />
                </Input>
            </View>

            <View className="flex-1 mt-7">
                <Text className="font-bold text-lg"> <Text className="text-red-800">{recipe?.totalRecipes}</Text> Results Found for <Text className="text-red-800">{recipeName}</Text></Text>

                <FlatList  
                    data={recipe?.recipes}
                    renderItem={({ item }) => <SearchComponent {...item} />}
                    contentContainerClassName="gap-4 mt-5"
                />

            </View>
        </View>
    )
}