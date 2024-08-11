import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserNameFromStorage = async () => {
  try {
    const persistedState = await AsyncStorage.getItem('root');
    if (persistedState) {
        const state = JSON.parse(persistedState);
        const userName = state?.user?.name || '';
        return userName;
    }
    return '';
  } catch (error) {
    console.error('Error retrieving user name from storage:', error);
    return '';
  }
};

export default getUserNameFromStorage;