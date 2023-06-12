import React, { useState } from "react";
import "./warnings";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import AppLoading from "expo-app-loading";
import {
<<<<<<< HEAD
  useFonts,
  Cairo_200ExtraLight,
  Cairo_300Light,
  Cairo_400Regular,
  Cairo_600SemiBold,
  Cairo_700Bold,
  Cairo_900Black,
} from "@expo-google-fonts/cairo";
import navigationTheme from "./app/navigations/NavigationTheme";
import AppNavigator from "./app/navigations/AppNavigation";
import AuthNavigator from "./app/navigations/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";
import { navigationRef } from "./app/navigations/rootNavigation";
import { StatusBar } from "expo-status-bar";
export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const [loaded] = useFonts({
    app_el: Cairo_200ExtraLight,
    app_l:  Cairo_300Light,
    app_r:  Cairo_400Regular,
    app_sb: Cairo_600SemiBold,
    app_b:  Cairo_700Bold,
    app_bb: Cairo_900Black,
  });
  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user.code != "300") setUser(user);
  };
  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={async () => {
          setIsReady(true);
        }}
        onError={(e) => console.log(e)}
      />
    );
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
=======
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
import React, { useCallback,useEffect, useState } from 'react';
import { View } from 'react-native';
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
				await restoreUser();
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setIsReady(true);
			}
		}

		prepare();
	}, []);
	useEffect(() => {
		onLayoutRootView();
	}, [isReady]);
	const onLayoutRootView = useCallback(async () => {
		if (isReady) {
			await SplashScreen.hideAsync();
		}
	}, [isReady]);

	if (!isReady) {
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
>>>>>>> bc41f80... fix
}
