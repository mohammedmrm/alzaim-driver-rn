import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "https://squretehad.com/driver/api",
    logo: require("../assets/logo/logo.png"),
  },
  staging: {
    apiUrl: "https://squretehad.com/driver/api",
    logo: require("../assets/logo/logo.png"),
  },
  prod: {
    apiUrl: "https://squretehad.com/driver/api",
    logo: require("../assets/logo/logo.png"),
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
