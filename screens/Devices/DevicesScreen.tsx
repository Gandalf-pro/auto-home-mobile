import { Button } from '@react-native-elements/base';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import FeatureCard from '../../components/Devices/FeatureCard';

import { ScrollView, View } from '../../components/Themed';
import requestData from '../../requests/requestData';
import { DevicesTabScreenProps } from '../../types';

export default function DevicesScreen({
	navigation,
	route,
}: DevicesTabScreenProps<'DevicesScreen'>) {
	const data = useQuery<any, any>('houseData');
	const { room } = route.params as any;
	console.log('Got room:', room);
	const roomData = data.data?.[room];

	const features = useMemo(() => {
		if (!roomData) return null;

		const tmp: any[] = [];
		const haha: any[] = Object.values(roomData);
		for (const val of haha) {
			val.features.map((deepVal: any) => {
				tmp.push({ ...deepVal, device: val.name, room });
			});
		}
		return tmp;
	}, [data, roomData, data]);

	const featureCards = features?.map((val, i) => {
		return <FeatureCard key={i} room={room} feature={val} />;
	});

	return (
		<ScrollView>
			<View style={styles.container}>{featureCards}</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		padding: 6,
		overflow: 'scroll',
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
