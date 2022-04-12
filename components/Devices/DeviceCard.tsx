import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Card, Button } from '@react-native-elements/themed';
import { useThemeColor } from '../Themed';
import { Text as MyText } from '../Themed';

export interface DeviceCardProps {
	room: string;
	navigation: any;
}

export default function DeviceCard({ room, navigation }: DeviceCardProps) {
	const color = useThemeColor({}, 'cardBackground');
	return (
		<Card
			theme={{
				colors: {
					grey5: color,
					white: color,
				} as any,
			}}
		>
			<View style={styles.titleContainer}>
				<MyText style={styles.titleText}>Room: {room}</MyText>
			</View>
			<Button
				onPress={(e) => {
					navigation.navigate('DevicesScreen', {
						room,
					});
				}}
				title="Goto room"
			/>
		</Card>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		minWidth: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
		padding: 2,
	},
	titleText: { fontWeight: 'bold', fontSize: 20 },
});
