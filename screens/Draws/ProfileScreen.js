import React, {useEffect, useState} from "react";
import {View, Text, Button, Alert, Image, ScrollView, RefreshControl} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({navigation}) => {
    const [userData, setUserData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const clearAllData = async () => {
        try {
            await AsyncStorage.clear();
            setUserData(null);
            Alert.alert('Хранилище очищено!');
        } catch (error) {
            console.log('Произошла ошибка при очистке хранилища!', error);
        }
    };

    const fetchUserData = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            const email = await AsyncStorage.getItem('email');
            const avatar = await AsyncStorage.getItem('avatar');
            if (username && email && avatar) {
                setUserData({email, username, avatar});
            }
        } catch (error) {
            console.log('Произошла ошибка:', error);
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchUserData().then(() => setRefreshing(false));
    }

    useEffect(() => {
        fetchUserData().then(r => '');
    }, []);

    const handleRegister = () => {
        navigation.navigate('Registration_screen')
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            {userData ? (
                <>
                    <Text>Email: {userData.email}</Text>
                    <Text>Email: {userData.username}</Text>
                    {userData.avatar && <Image source={{uri: userData.avatar}} style={{width: 100, height: 100}}/>}
                    <Button title={'Очистка хранилища'} onPress={async () => {
                        try {
                            await clearAllData();
                            Alert.alert('Хранилище очищено!');
                        } catch (error) {
                            Alert.alert('Произошла ошибка при очистке хранилища:', error);
                        }
                    }}/>
                </>
            ) : (
                <>
                    <Text>Данные о пользователе не найдены.</Text>
                    <Button title={"Зарегистрироваться"} onPress={handleRegister}></Button>
                </>
            )}
        </ScrollView>
    )
}

export default Profile;
