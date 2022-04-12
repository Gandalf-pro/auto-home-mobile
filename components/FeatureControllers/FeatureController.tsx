import React, { useMemo } from 'react';
import { Text } from '../Themed';
import AcFeatureController from './AcFeatureController';
import BlindsFeatureController from './BlindsFeatureController';
import LedFeatureController from './LedFeatureController';
import LightLevelFeature from './LightLevelFeature';

export interface FeatureControllerProps {
	feature: any & { device: string; room: string };
}

export default function FeatureController({ feature }: FeatureControllerProps) {
	const selectedFeature = useMemo(() => {
		switch (feature.type) {
			case 'AcFeature':
				return <AcFeatureController feature={feature} />;
			case 'BlindsFeature':
				return <BlindsFeatureController feature={feature} />;
			case 'LedFeature':
				return <LedFeatureController feature={feature} />;
			case 'LightLevelFeature':
				return <LightLevelFeature feature={feature} />;
			default:
				return <Text>Feature type not supported</Text>;
		}
	}, [feature]);

	return selectedFeature;
}
