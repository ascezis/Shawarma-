//Main
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import 'react-native-gesture-handler';
import Authorization from "./screens/log/Authorization";
import HomeDrawer from "./screens/Draws/DrawerNavigator";
import Registration from "./screens/log/Registration";
import SplashScreen from "./screens/Splash/SplashScreen";
//


//


const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{headerShown: false}}
            >
                <Stack.Screen name={'Splash_screen'} component={SplashScreen} />
                <Stack.Screen name={'Authorization_screen'} component={Authorization} />
                <Stack.Screen name={'Registration_screen'} component={Registration} />
                <Stack.Screen name={'Home_screen'} component={HomeDrawer} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

//Icons

