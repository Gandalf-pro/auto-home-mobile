import { Slider } from '@react-native-elements/themed';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { executeReq } from '../../requests/execute';
import { Text, useThemeColor } from '../Themed';
import { useDidUpdate } from '../useDidUpdate';

export interface BlindsFeatureControllerProps {
	feature: any & { device: string; room: string };
}

export interface BlindsDataInterface {
	blindsLevel: number;
}

export default function BlindsFeatureController({
	feature,
}: BlindsFeatureControllerProps) {
	const color = useThemeColor({}, 'primary');
	const queryClient = useQueryClient();
	const data: BlindsDataInterface = feature.data as any;
	const [value, setValue] = useState(data.blindsLevel);

	useDidUpdate(() => {
		setValue(data.blindsLevel);
	}, [data]);

	const onExecute = async (val: number) => {
		if (val == value) return;
		executeReq({
			room: feature.room,
			device: feature.device,
			feature: feature.name,
			data: {
				blindsLevel: val,
			},
		}).then(() => {
			queryClient.invalidateQueries('houseData');
		});
		setValue(val);
	};

	return (
		<>
			<Slider
				value={value}
				maximumValue={100}
				step={1}
				onSlidingComplete={onExecute}
				thumbTintColor={color}
				thumbStyle={{ width: 24, height: 24 }}
			/>
			<Text>Blinds level: {`${value} %`}</Text>
		</>
	);
}
