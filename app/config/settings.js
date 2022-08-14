import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "http://alzaimexpress.com/driver/api",
    logo: require("../assets/logo.jpg"),
  },
  staging: {
    apiUrl: "http://alzaimexpress.com/driver/api",
    logo: require("../assets/logo.jpg"),
  },
  prod: {
    apiUrl: "http://alzaimexpress.com/driver/api",
    logo: require("../assets/logo.jpg"),
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
