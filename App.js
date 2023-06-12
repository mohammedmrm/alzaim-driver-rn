import './warnings';
import 'react-native-gesture-handler';

import {
	Cairo_200ExtraLight,
	Cairo_300Light,
	Cairo_400Regular,
	Cairo_600SemiBold,
	Cairo_700Bold,
	Cairo_900Black,
	useFonts,
} from '@expo-google-fonts/cairo';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';

import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import OfflineNotice from './app/components/OfflineNotice';
import AppNavigator from './app/navigations/AppNavigation';
import AuthNavigator from './app/navigations/AuthNavigator';
import navigationTheme from './app/navigations/NavigationTheme';
import { navigationRef } from './app/navigations/rootNavigation';

SplashScreen.preventAutoHideAsync();
export default function App() {
	const [user, setUser] = useState();
	const [isReady, setIsReady] = useState(false);

	const [loaded] = useFonts({
		app_el: Cairo_200ExtraLight,
		app_l: Cairo_300Light,
		app_r: Cairo_400Regular,
		app_sb: Cairo_600SemiBold,
		app_b: Cairo_700Bold,
		app_bb: Cairo_900Black,
	});
	const restoreUser = async () => {
		const user = await authStorage.getUser();
		if (user.code != '300') setUser(user);
	};
	useEffect(() => {
		async function prepare() {
			try {
				// Pre-load fonts, make any API calls you need to do here
				await Font.loadAsync(Entypo.font);
				// Artificially delay for two seconds to simulate a slow loading
				// experience. Please remove this if you copy and paste the code!
				await new Promise(resolve => setTimeout(resolve, 2000));
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}
	if (!loaded) {
		return null;
	}
	return (
		<RootSiblingParent>
			<StatusBar style="dark" />
			<AuthContext.Provider value={{ user, setUser }}>
				<OfflineNotice />
				<NavigationContainer ref={navigationRef} theme={navigationTheme}>
					{user?.token ? <AppNavigator /> : <AuthNavigator />}
				</NavigationContainer>
			</AuthContext.Provider>
		</RootSiblingParent>
	);
}
