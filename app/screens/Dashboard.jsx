import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, RefreshControl, ScrollView, View } from 'react-native';
import { Headline } from 'react-native-paper';

import getStatistic from '../api/getSummayBoxed';
import useAuth from '../auth/useAuth';
import OptionsList from '../components/dashboard/OptionsList';
import SummaryBoxes from '../components/dashboard/SummaryBoxes';
import colors from '../config/colors';
import settings from '../config/settings';
import Routes from '../Routes';
const Dashboard = () => {
	const navigator = useNavigation();
	const [adsText, setText] = useState({ d_ad2: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [oneDay, setOneDay] = useState(null);
	const [data, setData] = useState(null);
	let { user } = useAuth();
	const startValue = useRef(new Animated.Value(0.2)).current;
	const endValue = 1;
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = async () => {
		setRefreshing(true);
		await loadStatic();
		setRefreshing(false);
	};
	const loadStatic = async () => {
		setIsLoading(true);
		const results = await getStatistic.get(user.token);
		try {
			results && setOneDay(results.data.data[0]);
			results && setData(results.data.static[0]);
		} catch (e) {
			console.log(e);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		loadStatic();
		Animated.loop(
			Animated.timing(startValue, {
				toValue: endValue,
				duration: 1000,
				useNativeDriver: true,
			})
		).start();
	}, []);

	return (
		<View
			style={{
				paddingTop: Constants.statusBarHeight + 10,
				backgroundColor: colors.white,
				height: '100%',
			}}>
			<View
				style={{
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: 'row-reverse',
					backgroundColor: colors.white,
				}}>
				<Headline
					style={{
						fontFamily: 'app_r',
						paddingTop: 0,
						paddingHorizontal: 10,
						color: colors.black,
					}}>
					{settings.name}
				</Headline>
				<Pressable
					style={{ marginLeft: 10 }}
					onPress={() => navigator.navigate(Routes.AdsCompany, { text: adsText.d_ad2 })}>
					<Animated.View
						style={{
							opacity: startValue,
							width: 30,
							height: 30,
						}}>
						<Image
							style={{
								width: '90%',
								height: '90%',
								alignSelf: 'center',
							}}
							source={require('../assets/dashboard/advertisement.png')}
						/>
					</Animated.View>
				</Pressable>
			</View>
			<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<SummaryBoxes oneDay={oneDay} isLoading={isLoading} />
				<OptionsList data={data} />
			</ScrollView>
		</View>
	);
};
export default Dashboard;
