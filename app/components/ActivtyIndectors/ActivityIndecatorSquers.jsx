import LottieView from 'lottie-react-native';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import Loading from '../../config/loadings';

const ActivityIndecator = (visable = false, style) => {
	const t = Loading.moneyDaily;
	if (!visable || Platform.OS == 'web') {
		return null;
	} else {
		return (
			<View style={styles.container}>
				<LottieView style={styles.item} autoPlay loop source={t} />
				<LottieView style={styles.item} autoPlay loop source={t} />
				<LottieView style={styles.item} autoPlay loop source={t} />
			</View>
		);
	}
};
const styles = StyleSheet.create({
	container: {
		//top: 99,
		flex: 1,

		flexDirection: 'row',
		justifyContent: 'space-around',
		// alignItems: "center"
	},
	item: {
		width: 95,
		height: 95,
		marginHorizontal: 5,
	},
});
export default ActivityIndecator;
