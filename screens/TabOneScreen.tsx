import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import FeatureCard from '../components/Devices/FeatureCard';

import EditScreenInfo from '../components/EditScreenInfo';
import { ScrollView, Text, View } from '../components/Themed';
import requestData from '../requests/requestData';
import { RootTabScreenProps } from '../types';
import {
	FavouritesValueInterface,
	default as favouritesHandler,
} from '../utils/favourites';

export default function TabOneScreen({
	navigation,
	route,
}: RootTabScreenProps<'TabOne'>) {
	const data = useQuery('houseData', requestData, {
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		optimisticResults: false,
		keepPreviousData: true,
	});
	const favouritesQuery = useQuery(
		'favourites',
		favouritesHandler.getFavourites,
		{ refetchOnMount: true }
	);
	const favourites = favouritesQuery.data;
	const homeData = data.data;

	const features = useMemo(() => {
		if (!homeData) return null;
		if (!favourites) return null;

		const tmp: any[] = [];

		for (const fav of Object.keys(favourites)) {
			const [room, device, feature] = fav.split('/');
			if (!room || !device || !feature) continue;

			const roomData = homeData[room];
			if (!roomData) continue;

			const deviceData = roomData[device];
			if (!deviceData) continue;

			const featureData = deviceData.features.find(
				(val) => val.name === feature
			);
			if (!featureData) continue;

			tmp.push({ ...featureData, device, room });
		}
		console.log('Tmp:', tmp);

		return tmp;
	}, [homeData, favourites]);

	const featureCards = useMemo(() => {
		if (!features) return;
		const tmp = features.map((val, i) => {
			return <FeatureCard key={i} room={val.room} feature={val} />;
		});
		console.log('Cards:', tmp);

		return tmp;
	}, [features]);

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
