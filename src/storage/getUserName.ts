import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserNameFromStorage = async () => {
  try {
    const persistedState = await AsyncStorage.getItem('persist:root');
    if (persistedState) {
      const state = JSON.parse(persistedState); // user está armazenado como uma string serializada
      const userName = state.name || '';
      return userName;
    }
    return '';
  } catch (error) {
    console.error('Error retrieving user name from storage:', error);
    return '';
  }
};

export default getUserNameFromStorage;
