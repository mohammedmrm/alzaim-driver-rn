import React from 'react';
import { StyleSheet, View } from 'react-native';
const SummaryBoxes = ({ children }) => {
	return (
		<>
			<View style={styles.container}>{children}</View>
		</>
	);
};
export default SummaryBoxes;
const styles = StyleSheet.create({
	container: {},
});
