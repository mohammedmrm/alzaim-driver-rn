import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";

import AppButton from "../components/AppButton";
import Routes from "./../Routes";
import settings from "../config/settings";
import colors from "../config/colors";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      blurRadius={2}
      style={styles.background}
      source={require("../assets/background/welcomePage.png")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={settings.logo} />
        <Text style={styles.text}>مرحباً بك في تطبيق المندوب</Text>
        <Text style={styles.text}>معاً لنكون الافضل</Text>
      </View>
      <View
        style={{
          width: "100%",
          bottom: "5%",
        }}
      >
        <AppButton
          title="أبداء رحلتك معنا"
          onPress={() => navigation.navigate(Routes.LOGIN)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 80,
    alignItems: "center",
    margin: 10,
  },
  text: {
    fontSize: 20,
    paddingVertical: 5,
    color: colors.primery,
    fontFamily: "app_bb",
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: 5,
    backgroundColor: colors.white,
    margin: 10,
  },
});
