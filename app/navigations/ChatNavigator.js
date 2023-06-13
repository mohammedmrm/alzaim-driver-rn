import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Routes from '../Routes';
import Chat from '../screens/Chat';
import ChatModel from '../screens/ChatModel';

const Stack = createStackNavigator();
const DashboardNavigator = () => {
	return (
		<Stack.Navigator initialRouteName={Routes.CHAT}>
			<Stack.Screen
				name={Routes.CHAT + '2'}
				component={Chat}
				options={{ headerShown: false, title: 'صفحة المحادثات' }}
			/>
			<Stack.Screen
				name={Routes.CHAT_MODEL}
				component={ChatModel}
				options={{ title: 'محادثة مع الشركة' }}
			/>
		</Stack.Navigator>
	);
};

export default DashboardNavigator;
