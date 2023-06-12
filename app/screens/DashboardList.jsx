import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import getOrders from '../api/categoryOrders';
import useAuth from '../auth/useAuth';
import ActivityIndecatorLoadingList from '../components/ActivtyIndectors/ActivityIndecatorLoadingList';
import Button from '../components/AppButton';
import AppFormField from '../components/AppTextInput';
import { ListItemSeparator, ListOrderCopyAction, OrderCard } from '../components/lists';
import colors from '../config/colors';
import { handleCopy } from '../utility/helper';

//================================================

function Dashboard() {
	let { user } = useAuth();
	const route = useRoute();
	const [orders, setOrders] = useState([]);
	const [search, setSearch] = useState('');
	const [refreshing, setRefreshing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [noOrders, setNoOrders] = useState('0');
	const [page, setPage] = useState('1');
	//================================================
	const loadOrders = async nextPage => {
		const results = await getOrders.get(
			user.token,
			route.params.action,
			search ? search : null,
			nextPage
		);
		if (!results.ok || results.data.success === '0') {
			return setIsLoading(false);
		}
		setPage(results.data.nextPage);
		if (nextPage === '1') {
			setNoOrders(results.data.orders);
			setOrders(results.data.data);
			return setIsLoading(false);
		}
		setOrders([...orders, ...results.data.data]);
		setIsLoading(false);
	};
	//================================================
	useEffect(() => {
		setRefreshing(true);
		setIsLoading(true);
		loadOrders('1');
		setRefreshing(false);
	}, []);
	//================================================
	const onEndReachedMohamed = () => {
		setIsLoading(true);
		loadOrders(page);
	};
	//================================================
	const refreshingMethod = () => {
		setRefreshing(true);
		loadOrders('1');
		setRefreshing(false);
	};
	//================================================
	const footer = () => {
		return (
			<View
				style={{
					flex: 1,
					height: 300,
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{isLoading && <ActivityIndecatorLoadingList visable={isLoading} />}
			</View>
		);
	};
	//================================================
	return (
		<View style={{ flex: 1 }}>
			<AppFormField
				rightIcon="table-search"
				autoCapitalize="none"
				autoCorrect={true}
				onChangeText={x => setSearch(x)}
				placeholder="بحث رقم الوصل او رقم الهاتف..."
			/>

			<View
				style={{
					alignItems: 'center',
					width: '100%',
					borderBottomColor: colors.black,
					borderBottomWidth: 2,
					marginVertical: 5,
					backgroundColor: colors.white,
				}}>
				<Button
					color="primery"
					width="95%"
					onPress={() => loadOrders('1')}
					title={`أبحث في (${noOrders}) طلبية`}
				/>
			</View>
			<FlatList
				style={{ flex: 1, width: '100%' }}
				data={orders}
				keyExtractor={item => `${item.id}-${item.date}`.toString()}
				renderItem={({ item }) => (
					<OrderCard
						item={item}
						renderRightActions={() => (
							<ListOrderCopyAction icon="content-copy" onPress={() => handleCopy(item)} />
						)}
						renderLeftActions={() => (
							<ListOrderCopyAction icon="content-copy" onPress={() => handleCopy(item)} />
						)}
					/>
				)}
				ItemSeparatorComponent={ListItemSeparator}
				onEndReachedThreshold={0.25}
				onEndReached={() => onEndReachedMohamed()}
				refreshing={refreshing}
				onRefresh={() => refreshingMethod()}
				ListFooterComponent={footer}
			/>
		</View>
	);
}
export default Dashboard;
