import { Slider } from '@react-native-elements/themed';
import React from 'react';
import { Text } from '../Themed';

export interface LightLevelFeatureProps {
	feature: any & { device: string; room: string };
}

export interface LightLevelDataInterface {
	lightLevel: number;
}

export default function LightLevelFeature({ feature }: LightLevelFeatureProps) {
	const data: LightLevelDataInterface = feature.data as any;

	return (
		<>
			<Slider
				// label={(value) => `${value} %`}
				value={data.lightLevel}
				disabled
				maximumValue={100}
				thumbStyle={{
					width: 1,
					height: 1,
					backgroundColor: 'transparent',
				}}
			/>
			<Text>Light level: {`${data.lightLevel} %`}</Text>
		</>
	);
}
