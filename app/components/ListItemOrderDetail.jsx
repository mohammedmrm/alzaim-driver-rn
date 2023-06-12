import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Linking } from "react-native";

import colors from "../config/colors";
import settings from "../config/settings";
const ListItemOrderDetail = ({ caption, details, order, onPress = false }) => {
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
	return (
		<View style={styles.containertextContainer}>
			<View style={styles.textView}>
				<Text style={styles.titleText}>{caption}</Text>
			</View>
			<View style={styles.textView2}>
				{onPress ? (
					<>
						<Text>
							<Text
								onPress={() => {
									Linking.openURL(`tel:${details}`);
								}}
								style={{
									...styles.text,
									color: colors.secondery,
									textDecorationLine: 'none',
								}}>
								{details + '   '}
							</Text>
							<Text
								onPress={() => {
									Linking.openURL(
										`https://wa.me/+964${parseInt(details)}?text=مندوب شركة ${
											settings.name
										}\nرقم الطلب : ${order?.order_no}\n`
									);
								}}
								style={{
									...styles.text,
									color: colors.success,
									textDecorationLine: 'none',
								}}>
                                واتساب
							</Text>
						</Text>
					</>
				) : (
					<Text style={styles.text}>{details && numberWithCommas(details)}</Text>
				)}
			</View>
		</View>
	);
};

export default ListItemOrderDetail;

const styles = StyleSheet.create({
  containertextContainer: {
    width: "100%",
    height: 20,
    flexDirection: "row-reverse",
    // backgroundColor: "gold"
  },
  textView: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  textView2: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    // backgroundColor: "gold"
  },
  text: {
    fontFamily: "app_sb",
    fontSize: 13,
  },
  titleText: {
    fontWeight: "200",
    fontFamily: "app_r",
    fontSize: 12,
    color: colors.medium,
  },
});
