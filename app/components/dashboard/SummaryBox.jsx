import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../config/colors';
import AppText from '../AppText';
const SummaryBox = ({ background, boxes, amount, time, colorM }) => {
	return (
		<View
			style={{
				width: '27%',
				height: 90,
				borderRadius: 5,
				backgroundColor: background,
				flexDirection: 'column',
				alignItems: 'flex-end',
				elevation: 11,
			}}>
			<View style={styles.boxContainer}>
				<FontAwesome5 name="box-open" size={20} color={colorM ? colorM : colors.dark} />
				<AppText
					style={{
						fontSize: 14,
						paddingRight: 5,
						fontFamily: 'app_r',
						color: colorM ? colorM : colors.dark,
					}}>
					{boxes}
				</AppText>
			</View>

			<View
				style={{
					alignSelf: 'center',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<AppText
					style={{
						fontSize: 16,
						fontFamily: 'app_r',
						color: colorM ? colorM : colors.dark,
					}}>
					{amount}
				</AppText>
				<AppText
					style={{
						fontSize: 14,
						fontFamily: 'app_r',
						color: colorM ? colorM : colors.dark,
					}}>
					{time}
				</AppText>
			</View>
		</View>
	);
};
export default SummaryBox;
const styles = StyleSheet.create({
	boxContainer: {
		flexDirection: 'row-reverse',
		padding: 5,
	},
});
