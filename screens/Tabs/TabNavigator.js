import React from "react";
import {View, Text} from 'react-native';


//Navigation
import 'react-native-gesture-handler';
import {createMaterialBottomTabNavigator} from "react-native-paper/react-navigation";

//Icons
import Icon from 'react-native-vector-icons/AntDesign';



import CartScreen from "./CartScreen";
import SearchScreen from "./SearchScreen";
import Home from "./HomeScreen";

const Tab = createMaterialBottomTabNavigator();
export default function TabsOnHome() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color}) => screenOptions(route, color),
            })}>
            <Tab.Screen name={'Главная'} component={Home} />
            <Tab.Screen name={'Поиск'} component={SearchScreen} />
            <Tab.Screen name={'Корзина'} component={CartScreen}/>

        </Tab.Navigator>
    )
}

const screenOptions = (route, color) => {
    let iconName;

    switch (route.name) {
        case 'Главная':
            iconName = 'home';
            break;
        case 'Корзина':
            iconName = 'shoppingcart';
            break;
        case 'Поиск':
            iconName = 'search1';
            break;
        default:
            break;
    }

    return <Icon name={iconName} color={color} size={24} />;
}