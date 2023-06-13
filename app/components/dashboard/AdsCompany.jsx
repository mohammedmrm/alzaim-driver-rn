import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../config/colors';
const AdsCompany = props => {
	var text = props.route.params.text;
	return (
		<View style={styles.adsContainer}>
			<View>
				<Text
					style={{
						textAlign: 'right',
						fontFamily: 'app_sb',
						paddingHorizontal: 10,
						fontSize: 15,
						marginVertical: 20,
						color: colors.black,
					}}>
					{text ? text : ''}
				</Text>
			</View>
		</View>
	);
};
export default AdsCompany;
const styles = StyleSheet.create({
	adsContainer: {
		width: '95%',
		alignSelf: 'center',
		minHeight: 100,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		overflow: 'hidden',
		backgroundColor: colors.white,
		margin: 5,
		padding: 5,
		elevation: 5,
	},
	centeredView: {
		flex: 1,
		backgroundColor: '#00000099',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		marginTop: 22,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,

		elevation: 24,
	},
	textStyle: {
		color: 'white',
		fontFamily: 'app_b',
		textAlign: 'justify',
	},
});
