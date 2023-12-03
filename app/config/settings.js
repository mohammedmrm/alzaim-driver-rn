import Constants from 'expo-constants';
const settings = {
	dev: {
		apiUrl: 'https://thiqar.alkhayalexpress.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'شركه الخيال (الناصريه)',
	},
	staging: {
		apiUrl: 'https://thiqar.alkhayalexpress.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'شركه الخيال (الناصريه)',
	},
	prod: {
		apiUrl: 'https://thiqar.alkhayalexpress.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'شركه الخيال (الناصريه)',
	},
};

const getCurrentSettings = () => {
	if (__DEV__) return settings.dev;
	if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
	return settings.prod;
};

export default getCurrentSettings();
