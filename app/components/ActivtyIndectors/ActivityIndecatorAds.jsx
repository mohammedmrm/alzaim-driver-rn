import React from 'react';
import LottieView from 'lottie-react-native';
import { Platform } from 'react-native';
import Loading from '../../config/loadings';

const ActivityIndecator = (visable = false, style) => {
	const t = Loading.adsTab;
	if (!visable || Platform.OS == 'web') {
		return null;
	} else {
		return (
			<LottieView
				style={{
					width: '90%',
					height: 200,
				}}
				autoPlay
				loop
				source={t}
			/>
		);
	}
};

export default ActivityIndecator;
