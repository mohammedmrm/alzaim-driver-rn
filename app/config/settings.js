import Constants from 'expo-constants';
const settings = {
	dev: {
		apiUrl: 'https://basra.alkhayalexpress.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'شركه الخيال (البصرة)',
	},
	staging: {
		apiUrl: 'https://basra.alkhayalexpress.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'شركه الخيال (البصرة)',
	},
	prod: {
		apiUrl: 'https://basra.alkhayalexpress.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'شركه الخيال (البصرة)',
	},
};

const getCurrentSettings = () => {
	if (__DEV__) return settings.dev;
	if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
	return settings.prod;
};

export default getCurrentSettings();
