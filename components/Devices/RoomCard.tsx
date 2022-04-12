import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Card, Text, Button } from '@react-native-elements/themed';
import { useThemeColor } from '../Themed';
import { Text as MyText } from '../Themed';

export interface RoomCardProps {
	room: string;
	deviceCount: number;
	navigation: any;
}

export default function RoomCard({
	room,
	deviceCount,
	navigation,
}: RoomCardProps) {
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
				<MyText style={styles.titleText}>Device: {deviceCount}</MyText>
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
