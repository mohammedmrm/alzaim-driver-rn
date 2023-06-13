import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

const AppButton = ({
	title,
	onPress,
	color = 'primery',
	textColor = '#fff',
	isLoading = false,
	width = '85%',
	height = 50,
	children,
}) => {
	return (
		<TouchableOpacity
			style={[styles.button, { height: height, width: width, backgroundColor: colors[color] }]}
			onPress={onPress}>
			<Text style={{ ...styles.text, color: textColor }}>
				<ActivityIndicator animating={isLoading} size="small" />
				{title}
			</Text>
			{children}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primery,
		borderRadius: 5,
		flexDirection: 'row-reverse',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		padding: 10,
		marginBottom: 3,
		elevation: 5,
	},
	text: {
		fontSize: 18,
		color: colors.white,
		fontFamily: 'app_r',
	},
});
export default AppButton;
