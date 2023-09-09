import Constants from 'expo-constants';
const settings = {
	dev: {
		apiUrl: 'http://alkhayalexpress.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'الخيال',
	},
	staging: {
		apiUrl: 'http://alkhayalexpress.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'الخيال',
	},
	prod: {
		apiUrl: 'http://alkhayalexpress.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'الخيال',
	},
};

const getCurrentSettings = () => {
	if (__DEV__) return settings.dev;
	if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
	return settings.prod;
};

export default getCurrentSettings();
