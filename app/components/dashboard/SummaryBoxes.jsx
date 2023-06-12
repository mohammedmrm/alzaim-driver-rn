import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../config/colors';
import ActivityIndecator from '../ActivtyIndectors/ActivityIndecatorSquers';
import SummaryBox from './SummaryBox';
import AppText from '../AppText';

const SummaryBoxes = ({ oneDay, isLoading }) => {
	return (
		<>
			<AppText style={styles.text}>خلاصة الطلبيات والمبالغ</AppText>
			{isLoading && <ActivityIndecator style={styles.summaryContainer} visable={isLoading} />}
			<View style={styles.summaryContainer}>
				{oneDay && (
					<SummaryBox
						isLoading={isLoading}
						background="#4CAF50"
						boxes={oneDay.today}
						colorM={colors.white}
						amount="اليوم"
					/>
				)}
				{oneDay && (
					<SummaryBox
						background="#0B4EBC"
						boxes={oneDay.waiting}
						amount={'قيد الانتظار'}
						colorM="#fff"></SummaryBox>
				)}
				{oneDay && (
					<SummaryBox
						background="#a38903"
						boxes={oneDay.postponded ? oneDay.postponded : 0}
						amount="معلق"
						colorM={colors.white}></SummaryBox>
				)}
			</View>
		</>
	);
};
export default SummaryBoxes;
const styles = StyleSheet.create({
	summaryContainer: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-around',
		paddingBottom: 5,
	},
	text: {
		paddingVertical: 20,
		textAlign: 'center',
		fontFamily: 'app_r',
	},
});
