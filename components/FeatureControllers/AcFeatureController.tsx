import React, { useEffect, useMemo, useState } from 'react';
import { executeReq } from '../../requests/execute';
import { Input, Picker, Text, useThemeColor, View } from '../Themed';
import { StyleSheet } from 'react-native';
import { Switch } from '@react-native-elements/themed';
import { Picker as DefaultPicker } from '@react-native-picker/picker';
import { useDebouncedValue } from '../useDebouncedValue';
import { useDidUpdate } from '../useDidUpdate';
import { useQueryClient } from 'react-query';

export interface AcFeatureControllerProps {
	feature: any & { device: string; room: string };
}

export const FanModes = {
	auto: '1',
	low: '5',
	med: '9',
	high: '11',
};
export const ReverseFanModes = {
	'1': 'auto',
	'5': 'low',
	'9': 'med',
	'11': 'high',
};
export const AcModes = {
	auto: '0',
	cool: '1',
	dry: '2',
	fan: '3',
	heat: '4',
};
export const ReverseAcModes = {
	'0': 'auto',
	'1': 'cool',
	'2': 'dry',
	'3': 'fan',
	'4': 'heat',
};

export interface AcDataInterface {
	power: 0 | 1;
	temp: number;
	fan: string;
	mode: string;
	swing: 0 | 1;
}

export default function AcFeatureController({
	feature,
}: AcFeatureControllerProps) {
	const primaryColor = useThemeColor({}, 'primary');
	const queryClient = useQueryClient();
	const data: AcDataInterface = feature.data as any;
	const [mode, setMode] = useState<string>(data.mode);
	const [fan, setFan] = useState<string>(data.fan);
	const [power, setPower] = useState<0 | 1>(Number(data.power) as 0 | 1);
	const [swing, setSwing] = useState<0 | 1>(Number(data.swing) as 0 | 1);
	const [temp, setTemp] = useState<number>(data.temp);

	const value = useMemo(() => {
		return {
			power,
			temp,
			fan,
			mode,
			swing,
		};
	}, [mode, fan, power, swing, temp]);

	const [debounced] = useDebouncedValue(value, 500);

	useDidUpdate(() => {
		setMode(data.mode);
		setFan(data.fan);
		setPower(Number(data.power) as 0 | 1);
		setSwing(Number(data.swing) as 0 | 1);
		setTemp(data.temp);
	}, [data]);

	useDidUpdate(() => {
		console.log('Debounced', debounced);
		executeReq({
			room: feature.room,
			device: feature.device,
			feature: feature.name,
			data: debounced,
		}).then(() => {
			queryClient.invalidateQueries('houseData');
		});
	}, [debounced]);

	return (
		<View style={styles.viewStyle}>
			<View style={styles.switchesContainer}>
				<Switch
					value={!!power}
					onValueChange={(val) => {
						setPower(val ? 1 : 0);
					}}
					color={primaryColor}
				/>
				<Text>Power</Text>
				<Switch
					style={{ marginLeft: 6 }}
					value={!!swing}
					onValueChange={(val) => {
						setSwing(val ? 1 : 0);
					}}
					color={primaryColor}
				/>
				<Text>Swing</Text>
			</View>
			<View style={styles.valuesContainer}>
				<Input
					keyboardType="numeric"
					label="Temp"
					value={temp as any}
					onChangeText={(val) => {
						setTemp(val as any);
					}}
				/>
				<Picker
					containerStyle={{ marginHorizontal: 6 }}
					label="Mode"
					selectedValue={mode}
					onValueChange={(itemValue, itemIndex) =>
						setMode(itemValue as string)
					}
				>
					<DefaultPicker.Item label="Auto" value={'0'} />
					<DefaultPicker.Item label="Cool" value={'1'} />
					<DefaultPicker.Item label="Heat" value={'4'} />
					<DefaultPicker.Item label="Fan" value={'3'} />
					<DefaultPicker.Item label="Dry" value={'2'} />
				</Picker>
				<Picker
					label="Fan"
					selectedValue={fan}
					onValueChange={(itemValue, itemIndex) =>
						setFan(itemValue as string)
					}
				>
					<DefaultPicker.Item label="Auto" value={'1'} />
					<DefaultPicker.Item label="Low" value={'5'} />
					<DefaultPicker.Item label="Med" value={'9'} />
					<DefaultPicker.Item label="High" value={'11'} />
				</Picker>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewStyle: {
		backgroundColor: 'transparent',
	},
	switchesContainer: {
		backgroundColor: 'transparent',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	valuesContainer: {
		backgroundColor: 'transparent',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexGrow: 1,
	},
});
