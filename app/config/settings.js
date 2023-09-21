import Constants from 'expo-constants';
const settings = {
	dev: {
		apiUrl: 'http://ec2-3-137-158-198.us-east-2.compute.amazonaws.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'شركه سرعه',
	},
	staging: {
		apiUrl: 'http://ec2-3-137-158-198.us-east-2.compute.amazonaws.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'شركه سرعه',
	},
	prod: {
		apiUrl: 'http://ec2-3-137-158-198.us-east-2.compute.amazonaws.com/driver/api',
		logo: require('../assets/logo/logo.png'),
		name: 'شركه سرعه',
	},
};

const getCurrentSettings = () => {
	if (__DEV__) return settings.dev;
	if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
	return settings.prod;
};

export default getCurrentSettings();
