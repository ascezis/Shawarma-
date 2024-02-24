import React, {useState} from "react";
import {
    Text,
    TextInput,
    TouchableHighlight,
    View,
    ScrollView,
    RefreshControl, Alert, Button, Image,
} from 'react-native';
import {useFonts} from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import styles from "../../styles/styles";


const RegistrationScreen = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'Monsterrat': require('../../assets/fonts/Montserrat-Regular.ttf'),
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [image, setImage] = useState(null);

    // Avatar
    const PickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.canceled) {
            setImage(result.assets[0].uri)
            try {
                await AsyncStorage.setItem('avatar', result.assets[0].uri);
                console.log("Аватар успешно сохранён");
            } catch (error) {
                console.log("Ошибка в сохранении аватара");
            }
        } else {
            console.log('Пользователь отменил выбор аватарки');
        }
    }
    // Сохранение данных
    const saveUserData = async (email, password, username) => {
        try {
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);
            await AsyncStorage.setItem('username', username);
            console.log('Данные успешно сохранены');
            return true;

        } catch (error) {
            console.log('Непредвиденная ошибка при сохранении данных пользователя');
            return false;
        }
    };
    const handleRefresh = () => {
        setRefreshing(false);
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
        >
            <View>
                <Image source={require("../../assets/image/shaurma_lp74ijv9x3jh_512.png")} style={styles.shawarma_reg}/>
                <Text style={styles.reg_hello_text}>Добро пожаловать</Text>
                <Text style={styles.reg_p_text}>Создайте свой аккаунт</Text>
                <View style={styles.main_border}>
                    {/*Username*/}
                    <TextInput style={styles.placeholder1}
                               placeholder={"Введите Ваше имя"}
                               onChangeText={setUsername}
                               value={username}
                    />

                    {/*Password*/}
                    <TextInput style={styles.placeholder2}
                               placeholder={"Введите пароль"}
                               secureTextEntry={true}
                               onChangeText={setPassword}
                               value={password}
                    />
                    {/*Email*/}

                    <TextInput style={styles.placeholder3}
                               placeholder={"Введите email"}
                               textContentType={"emailAddress"}
                               onChangeText={setEmail}
                               value={email}
                    />
                    <TouchableHighlight onPress={PickAvatar} style={styles.choose_avatar}>
                        <Text style={styles.choose_avatar_text}>Выберите изображение</Text>
                    </TouchableHighlight>



                    <TouchableHighlight style={styles.next_button} onPress={async () => {
                        if (password.length < 8) {
                            Alert.alert("Пароль слишком короткий!")
                            return false;
                        } else if (!username) {
                            Alert.alert('Вы не ввели данные в какое-то из полей!')
                        } else {
                            await saveUserData(email, password, username);
                            navigation.navigate('Authorization_screen');
                        }

                    }}>
                        <Text style={styles.next_button_text}>Далее</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>
    );
};

export default RegistrationScreen;