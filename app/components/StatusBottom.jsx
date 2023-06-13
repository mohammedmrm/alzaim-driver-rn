import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

const AppButton = ({ title, onPress, color = 'primery', isLoading = false, Children }) => {
	return (
		<TouchableOpacity style={[styles.button, { backgroundColor: colors[color] }]} onPress={onPress}>
			<Text style={styles.text}>{title}</Text>
			{Children}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		padding: 10,
		width: '25%',
		height: 50,
		margin: 15,
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	text: {
		color: colors.white,
		fontFamily: 'app_b',
	},
});
export default AppButton;
