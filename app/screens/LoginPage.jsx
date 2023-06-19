import React, { useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';

import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import ActivityIndecator from '../components/ActivtyIndectors/ActivityIndecatorLoading';
import { AppForm, AppFormField, ErrorMessage, SubmitButton } from '../components/forms';
import colors from '../config/colors';
import settings from '../config/settings';

const validationSchema = Yup.object().shape({
	phone: Yup.string().required().min(11).max(11).label('رقم الهاتف'),
	password: Yup.string().required().min(4).label('كلمةالمرور'),
});
export default function LoginPage() {
	const auth = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);
	const handleSubmit = async ({ phone, password }) => {
		setIsLoading(true);
		const results = await authApi.login(phone, password);
		if (!results.ok) {
			setIsLoading(false);
			return setLoginFailed(true);
		}
		if (!results.data.token) {
			setIsLoading(false);
			return setLoginFailed(true);
		}
		setLoginFailed(false);
		setIsLoading(false);
		auth.logIn(results.data);
	};
	return (
		<ImageBackground
			blurRadius={2}
			style={styles.background}
			source={require('../assets/background/welcomePage.png')}>
			{isLoading && <ActivityIndecator visible={isLoading} />}
			<View style={styles.logoContainer}>
				<Image style={styles.logo} source={settings.logo} />
			</View>
			<View style={{ flex: 1, padding: 5, alignContent: 'center', width: '95%' }}>
				<ScrollView contentContainerStyle={{ flexGrow: 1, alignContent: 'center' }}>
					<AppForm
						initialValues={{ phone: '', password: '' }}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}>
						<View style={styles.formContainer}>
							<Text style={styles.text}>أهلا وسهلا بك</Text>
							<ErrorMessage error="رقم الهاتف او كلمة المرور خطاْ" visible={loginFailed} />
							<AppFormField
								rightIcon="cellphone"
								name="phone"
								caption="رقم الموبايل"
								autoCapitalize="none"
								placeholder="رقم الموبايل"
								keyboardType="phone-pad"
								autoCorrect={false}
							/>
							<AppFormField
								rightIcon="lock"
								inputStyle={{ height: '100%' }}
								leftIcon="eye"
								caption="كلمة المرور"
								name="password"
								placeholder="كلمة المرور"
								autoCapitalize="none"
								autoCorrect={false}
								textContentType="password"
							/>
							<SubmitButton title="تسجيل دخول" />
						</View>
					</AppForm>
				</ScrollView>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: 'center',
	},
	main: {
		width: '100%',
		height: '100%',
		backgroundColor: 'gold',
		flexGrow: 1,
		alignContent: 'center',
	},
	logoContainer: {
		top: 20,
	},
	text: {
		fontSize: 20,
		paddingVertical: 5,
		marginTop: 20,
		fontFamily: 'app_b',
		fontFamily: 'app_l',
		alignSelf: 'center',
	},
	logo: {
		width: 200,
		height: 200,
		margin: 20,
		borderRadius: 5,
	},

	formContainer: {
		top: 10,
		backgroundColor: colors.white,
		width: '95%',
		borderRadius: 10,
		paddingBottom: 10,
		elevation: 5,
	},
});
