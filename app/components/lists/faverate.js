import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import colors from '../../config/colors';

function Faverate({ onPress }) {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<MaterialCommunityIcons name="star" size={25} color={colors.white} />
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'gold',
		width: 70,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Faverate;
