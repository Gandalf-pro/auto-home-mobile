import { StyleSheet } from 'react-native';
import { Button } from '@react-native-elements/base';

import { Text, View } from '../../components/Themed';
import { DevicesTabScreenProps } from '../../types';
import { useQuery } from 'react-query';
import requestData from '../../requests/requestData';
import LoadingComponent from '../../components/LoadingComponent';
import RoomCard from '../../components/Devices/RoomCard';
import { useEffect } from 'react';

export default function RoomsScreen({
	navigation,
}: DevicesTabScreenProps<'RoomsScreen'>) {
	// Get the data
	const data = useQuery('houseData');

	useEffect(() => {
		if (data.isStale) {
			data.refetch();
		}
	}, []);

	if (data.isLoading) {
		return <LoadingComponent />;
	}

	let rooms: any = <Text>Error</Text>;

	if (!data.isError) {
		rooms = Object.entries(data.data as any).map(([key, obj], i) => {
			const deviceCount = Object.keys(obj as any).length;
			return (
				<RoomCard
					key={key}
					room={key}
					deviceCount={deviceCount}
					navigation={navigation}
				/>
			);
		});
	}

	return <View style={styles.container}>{rooms}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		padding: 6,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
