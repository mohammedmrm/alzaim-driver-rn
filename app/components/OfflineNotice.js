import { useNetInfo } from '@react-native-community/netinfo';
import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../config/colors';
import Text from './AppText';

function OfflineNotice(props) {
	const netInfo = useNetInfo();

	if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false)
		return (
			<View style={styles.container}>
				<Text style={styles.text}>لايوجد انترنيت حاليا</Text>
			</View>
		);

	return null;
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: colors.offline,
		height: 50,
		justifyContent: 'center',
		position: 'absolute',
		top: Constants.statusBarHeight,
		width: '100%',
		zIndex: 1,
	},
	text: {
		color: colors.black,
		textAlign: 'center',
	},
});

export default OfflineNotice;
