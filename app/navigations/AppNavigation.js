import React, { useEffect, useState, useRef } from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

import Profile from "./../screens/Profile";
import SearchResults from "./../navigations/SearchNavigator";
import colors from "../config/colors";
import Routes from "../Routes";
import DashboardNavigator from "./DashboardNavigator";
import ChatNavigator from "./ChatNavigator";
import NotificationsNavigator from "./NotificationsNavigator";
import expoPushTokenApi from "../api/expoPushTokens";
import useAuth from "../auth/useAuth";
import navitation from "../navigations/rootNavigation";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
const Tab = createMaterialBottomTabNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
const AppNavigator = (ref) => {
  const { user } = useAuth();
  const navitation = useNavigation();
  const notificationListener = useRef();
  const responseListener = useRef();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  useEffect(() => {
    if (lastNotificationResponse) {
      var id = lastNotificationResponse.notification.request.content.data.id;
      console.log(
        "Noti ORDER ID",
        lastNotificationResponse.notification.request.content.data.id
      );
      id &&
        navitation.navigate(Routes.ORDER_DETAILS, {
          id: id,
          notify_id: "",
        });
    }
  }, [lastNotificationResponse]);

  registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      await expoPushTokenApi.register(user.token, token);
    } catch (error) {
      console.log("Push Notifications", error);
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };
  registerForPushNotificationsAsync();
  return (
    <Tab.Navigator
      initialRouteName={Routes.DASHBOARD}
      activeColor={colors.primery}
      inactiveColor={colors.secondery}
      barStyle={{ backgroundColor: colors.light }}
    >
      <Tab.Screen
        name={Routes.SEARCH_RESULTS}
        component={SearchResults}
        options={{
          tabBarLabel: "بحث",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.NOTIFICATION}
        component={NotificationsNavigator}
        options={{
          tabBarLabel: "اشعاراتي",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-notifications" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.DASHBOARD}
        component={DashboardNavigator}
        options={({ navigation }) => ({
          tabBarLabel: "لوحة التحكم",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={22} />
          ),
          // tabBarButton: () => (
          //   <DashboardButton
          //     onPress={() => navigation.navigate(Routes.DASHBOARD)}
          //   />
          // ),
        })}
      />

      <Tab.Screen
        name={Routes.CHAT}
        component={ChatNavigator}
        options={{
          tabBarLabel: "محادثتي",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubbles" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.PROFILE}
        component={Profile}
        options={{
          tabBarLabel: "حسابي",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AppNavigator;
