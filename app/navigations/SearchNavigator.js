import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Routes from '../Routes';
import ChatModel from '../screens/ChatModel';
import OrderDetails from '../screens/OrderDetails';
import SearchResults from '../screens/SearchResults';

const Stack = createStackNavigator();
const DashboardNavigator = () => {
	return (
		<Stack.Navigator initialRouteName={Routes.DASHBOARD}>
			<Stack.Screen
				name={Routes.SEARCH_RESULTS + '2'}
				component={SearchResults}
				options={{ headerShown: false, title: 'صفحة البحث' }}
			/>

			<Stack.Screen name={Routes.ORDER_DETAILS} component={OrderDetails} options={{ title: 'طلبية' }} />
			<Stack.Screen
				name={Routes.CHAT_MODEL}
				component={ChatModel}
				options={{ title: 'محادثة فورية' }}
			/>
		</Stack.Navigator>
	);
};

export default DashboardNavigator;
