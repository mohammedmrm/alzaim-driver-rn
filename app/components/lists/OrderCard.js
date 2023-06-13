import React from 'react';
import { View, StyleSheet, Linking, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';
import Moment from 'react-moment';
import 'moment/locale/ar';

import Icon from './../Icon';
import Text from '../AppText';
import colors from '../../config/colors';
import Routes from '../../Routes';
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function OrderCard({ item, onPress, renderRightActions }) {
	const navigation = useNavigation();
	const handelColor = id => {
		switch (id) {
			case '4':
				return colors.success;
			case '5':
				return colors.secondery;
			case '6':
				return colors.primery;
			case '7':
				return colors.pause;
			case '8':
				return colors.returned;
			case '9':
				return colors.returned;
			case '13':
				return colors.unseen;
			default:
				return colors.medium;
		}
	};
	return (
		<Swipeable
			key={item.id || Date.now()}
			renderRightActions={renderRightActions}
			renderLeftActions={renderRightActions}>
			<View
				style={{
					alignSelf: 'center',
					width: '90%',
					height: 75,
					paddingTop: 5,
				}}>
				<View
					style={[
						styles.container,
						{
							backgroundColor: item.driver_invoice >= 0 ? colors.lightGreen : colors.white,
						},
					]}>
					<TouchableHighlight
						style={{ width: '87%', height: '100%' }}
						underlayColor={colors.light}
						onPress={() => navigation.navigate(Routes.ORDER_DETAILS, { id: item.id })}>
						<View
							style={{
								width: '100%',
								height: '100%',
								flexDirection: 'row-reverse',
							}}>
							<View style={styles.detailsContainer}>
								<Text style={styles.title} numberOfLines={1}>
									{item.order_no}
								</Text>
								{item.city && (
									<Text style={styles.subTitle} numberOfLines={1}>
										{item.city} - {item.town}
									</Text>
								)}
								{item?.date && (
									<Text style={styles.subTitle} numberOfLines={1}>
										<Moment
											style={{ color: '#111', fontSize: 10 }}
											element={Text}
											locale="ar"
											interval={30000}
											fromNow>
											{item?.date}
										</Moment>
									</Text>
								)}
							</View>
							<View style={styles.detailsContainer}>
								<Text style={styles.title} numberOfLines={1}>
									{item.store_name}
								</Text>
								{item.city && (
									<Text style={styles.subTitle} numberOfLines={1}>
										{item.status_name}
									</Text>
								)}
								{item.order_status_id !== '9' ? (
									<Text style={styles.subTitle2} numberOfLines={1}>
										المبلغ: {numberWithCommas(item?.new_price)}
									</Text>
								) : (
									<Text style={styles.subTitle} numberOfLines={1}>
										{item?.t_note ? item?.t_note : ''}
									</Text>
								)}
							</View>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						style={styles.icon}
						onPress={() => Linking.openURL(`tel:${item.client_phone}`)}>
						<Icon
							iconColor={handelColor(item.order_status_id)}
							shadow={false}
							name="phone-outline"
							size={70}
						/>
					</TouchableHighlight>
				</View>
			</View>
		</Swipeable>
	);
}

const styles = StyleSheet.create({
	text: {
		paddingRight: 10,
		paddingTop: 5,
		fontSize: 14,
		fontWeight: 'bold',
	},
	container: {
		alignItems: 'center',
		flexDirection: 'row-reverse',
		borderRadius: 5,
		elevation: 5,
		marginBottom: 5,
		width: '100%',
	},
	detailsContainer: {
		flex: 1,
		marginRight: 10,
		justifyContent: 'center',
		flex: 1,
	},
	subTitle: {
		color: colors.medium,
		fontSize: 13,
		fontFamily: 'app_r',
	},
	subTitle2: {
		color: colors.medium,
		fontFamily: 'app_sb',
		fontSize: 12,
	},
	title: {
		fontFamily: 'app_sb',
		color: colors.primery,
		fontSize: 12,
	},
	icon: {
		right: 15,
	},
});

export default OrderCard;
