import LottieView from 'lottie-react-native';
import React from 'react';
import { Platform } from 'react-native';

import Loading from '../../config/loadings';

const ActivityIndecator = (visable = false, style) => {
	const t = Loading.chatLoading;
	if (!visable || Platform.OS == 'web') {
		return null;
	} else {
		return (
			<LottieView
				style={{
					width: '98%',
					height: 210,
					alignSelf: 'center',
				}}
				autoPlay
				loop
				source={t}
			/>
		);
	}
};

export default ActivityIndecator;
