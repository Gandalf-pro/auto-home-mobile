import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { Card, Button } from '@react-native-elements/themed';
import { useThemeColor } from '../Themed';
import { Text as MyText } from '../Themed';
import FeatureController from '../FeatureControllers/FeatureController';
import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from 'react-query';
import { FeatureJsonInterface } from '../../requests/requestData';
import favourites, { FavouritesValueInterface } from '../../utils/favourites';

export interface FeatureCardProps {
	room: string;
	feature: FeatureJsonInterface & { device: string };
}

export default function FeatureCard({ room, feature }: FeatureCardProps) {
	const color = useThemeColor({}, 'cardBackground');
	const favouritesQuery = useQuery<FavouritesValueInterface>('favourites');

	const isFaved = useMemo(() => {
		if (!favouritesQuery.data) return false;
		return favouritesQuery.data[
			`${room}/${feature.device}/${feature.name}`
		];
	}, [favouritesQuery.data]);
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
				<MyText
					style={styles.titleText}
					onPress={async (e) => {
						if (isFaved) {
							await favourites.removeFromFavourites(
								`${room}/${feature.device}/${feature.name}`
							);
						} else {
							await favourites.addToFavourites(
								`${room}/${feature.device}/${feature.name}`
							);
						}

						favouritesQuery.refetch();
					}}
				>
					{isFaved ? (
						<FontAwesome
							size={24}
							style={{ marginBottom: -3 }}
							name="star"
						/>
					) : (
						<FontAwesome
							size={24}
							style={{ marginBottom: -3 }}
							name="star-o"
						/>
					)}{' '}
					{feature.name}
				</MyText>
				<MyText style={styles.titleText}>
					Device: {feature.device}
				</MyText>
			</View>
			<View style={{}}>
				<FeatureController feature={feature} />
			</View>
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
