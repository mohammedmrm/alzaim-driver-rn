import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import defultStyle from '../config/styles';
import AppText from './AppText';

export default function AppTextinput({ rightIcon, leftIcon, caption, inputStyle = {}, ...otherProps }) {
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	return (
		<View style={styles.contaioner}>
			{caption && <AppText style={{ fontFamily: 'app_sb' }}>{caption}</AppText>}

			<View style={styles.inputContainer}>
				{rightIcon && (
					<MaterialCommunityIcons
						style={styles.icon}
						size={20}
						colors={defultStyle.colors.medium}
						name={rightIcon}
					/>
				)}
				<View style={styles.inputView}>
					{leftIcon ? (
						<TextInput
							style={{ ...defultStyle.text, ...inputStyle }}
							placeholder={caption}
							secureTextEntry={secureTextEntry}
							{...otherProps}
						/>
					) : (
						<TextInput style={defultStyle.text} {...otherProps} placeholder={caption} />
					)}
				</View>
				{leftIcon && (
					<TouchableWithoutFeedback onPress={toggleSecureEntry}>
						<MaterialCommunityIcons
							size={20}
							style={styles.icon}
							colors={defultStyle.colors.medium}
							name={secureTextEntry ? 'eye-off' : 'eye'}
						/>
					</TouchableWithoutFeedback>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	contaioner: {
		paddingHorizontal: 10,
		width: '100%',
		backgroundColor: defultStyle.colors.white,
	},
	inputView: {
		flexGrow: 1,
	},
	inputContainer: {
		backgroundColor: defultStyle.colors.light,
		borderRadius: 5,
		width: '100%',
		height: 50,
		paddingLeft: 10,
		paddingRight: 15,
		alignItems: 'center',
		alignSelf: 'center',
		marginHorizontal: 5,
		flexDirection: 'row-reverse',
		borderBottomWidth: 1,
		borderColor: defultStyle.colors.black,
	},
	icon: {
		width: 20,
	},
});
