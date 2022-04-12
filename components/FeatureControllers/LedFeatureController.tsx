import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { TriangleColorPicker, fromHsv, toHsv } from 'react-native-color-picker';
import { useQueryClient } from 'react-query';
import { executeReq } from '../../requests/execute';
import { View } from '../Themed';
import { useDebouncedValue } from '../useDebouncedValue';
import { useDidUpdate } from '../useDidUpdate';

export interface LedFeatureControllerProps {
	feature: any & { device: string; room: string };
}

export interface LedDataInterface {
	r: number;
	g: number;
	b: number;
}
const randomColor = () =>
	`#${Math.floor(Math.random() * 16777215).toString(16)}`;

function hexToRgb(hex: string) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null;
}

function rgbToHex(r: number, g: number, b: number) {
	return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function isOn(r: number, g: number, b: number) {
	return r > 0 || g > 0 || b > 0;
}

export default function LedFeatureController({
	feature,
}: LedFeatureControllerProps) {
	const queryClient = useQueryClient();
	const data: LedDataInterface = feature.data as any;
	const [value, setValue] = useState(rgbToHex(data.r, data.g, data.b));
	const [debounced] = useDebouncedValue(value, 500);

	useDidUpdate(() => {
		setValue(rgbToHex(data.r, data.g, data.b));
	}, [data]);

	useDidUpdate(() => {
		const rgb = hexToRgb(debounced);
		if (!rgb) return;
		console.log('debounced:', rgb);
		executeReq({
			room: feature.room,
			device: feature.device,
			feature: feature.name,
			data: {
				r: rgb.r,
				g: rgb.g,
				b: rgb.b,
			},
		}).then(() => {
			queryClient.fetchQuery('houseData');
			queryClient.invalidateQueries('houseData');
		});
	}, [debounced]);

	return (
		<>
			<View
				style={{ flex: 1, height: 120, backgroundColor: 'transparent' }}
			>
				<TriangleColorPicker
					hideControls
					color={value}
					onColorChange={(color) => {
						setValue(fromHsv(color));
					}}
					style={{ flex: 1 }}
				/>
			</View>
		</>
	);
}
