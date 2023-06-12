import Constants from 'expo-constants';
const settings = {
	dev: {
		apiUrl: 'http://sahamalnabel.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'سهم النابل ',
	},
	staging: {
		apiUrl: 'http://sahamalnabel.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'سهم النابل ',
	},
	prod: {
		apiUrl: 'http://sahamalnabel.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'سهم النابل ',
	},
};

const getCurrentSettings = () => {
	if (__DEV__) return settings.dev;
	if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
	return settings.prod;
};

export default getCurrentSettings();
