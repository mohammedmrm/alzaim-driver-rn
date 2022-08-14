import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView } from "react-native";
import { View } from "react-native";
Screen = ({ children }) => {
  return <View style={styles.screen}>{children}</View>;
};
const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});
export default Screen;
