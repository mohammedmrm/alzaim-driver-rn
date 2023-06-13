import LottieView from 'lottie-react-native';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import Loading from '../../config/loadings';

const ActivityIndecator = (visable = false, style) => {
	const t = Loading.simpleLine;
	if (!visable || Platform.OS == 'web') {
		return null;
	} else {
		return (
			<View>
				<LottieView style={styles.item} autoPlay loop source={t} />
				<LottieView style={styles.item} autoPlay loop source={t} />
				<LottieView style={styles.item} autoPlay loop source={t} />
				<LottieView style={styles.item} autoPlay loop source={t} />
				<LottieView style={styles.item} autoPlay loop source={t} />
				<LottieView style={styles.item} autoPlay loop source={t} />
				<LottieView style={styles.item} autoPlay loop source={t} />
				<LottieView style={styles.item} autoPlay loop source={t} />
				<LottieView style={styles.item} autoPlay loop source={t} />
			</View>
		);
	}
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		width: '100%',
	},
});
export default ActivityIndecator;
