import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';

//screens
import LS from './screens/LoginScreen';
import CS from './screens/ChatScreen';

const AppNavigator = createStackNavigator(
    {
        Login: LS,
        Chat: CS
    },
    {
        headerMode: "none"
    }
);

export default createAppContainer(AppNavigator);


