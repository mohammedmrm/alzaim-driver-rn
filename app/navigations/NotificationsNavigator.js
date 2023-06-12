import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Routes from '../Routes';
import ChatModel from '../screens/ChatModel';
import Notificaitons from '../screens/Notificaitons';
import OrderDetails from '../screens/OrderDetails';

const Stack = createStackNavigator();
const DashboardNavigator = () => {
	return (
		<Stack.Navigator initialRouteName={Routes.Notificaitons}>
			<Stack.Screen
				name={Routes.NOTIFICATION + '1'}
				component={Notificaitons}
				options={{ headerShown: false, title: 'صفحة الاشعارات' }}
			/>

			<Stack.Screen name={Routes.ORDER_DETAILS} component={OrderDetails} options={{ title: 'طلبية' }} />
			<Stack.Screen
				name={Routes.CHAT_MODEL}
				component={ChatModel}
				options={{ title: 'محادثة مع الشركة' }}
			/>
		</Stack.Navigator>
	);
};

export default DashboardNavigator;
