import LottieView from 'lottie-react-native';
import React from 'react';
import { Platform } from 'react-native';

import Loading from '../../config/loadings';

const ActivityIndecator = (visable = false, style) => {
	// chatLoading
	const t = Loading.loadingList;
	if (!visable || Platform.OS == 'web') {
		return null;
	} else {
		return (
			<LottieView
				style={{
					flex: 1,
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
