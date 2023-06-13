import Constants from 'expo-constants';
const settings = {
  dev: {
    apiUrl: "https://afaqbaghdad.com/driver/api",
    logo: require("../assets/logo/logo.png"),
    name: "افاق بغداد",
  },
  staging: {
    apiUrl: "https://afaqbaghdad.com/driver/api",
    logo: require("../assets/logo/logo.png"),
    name: "افاق بغداد",
  },
  prod: {
    apiUrl: "https://afaqbaghdad.com/driver/api",
    logo: require("../assets/logo/logo.png"),
    name: "افاق بغداد",
  },
};

const getCurrentSettings = () => {
	if (__DEV__) return settings.dev;
	if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
	return settings.prod;
};

export default getCurrentSettings();
