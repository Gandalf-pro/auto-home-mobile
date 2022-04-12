import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FavouritesValueInterface {
	[url: string]: boolean;
}

let favouritesData: FavouritesValueInterface = {};
let rerievedFromStorage = false;

const favourites = {
	getFavourites: async () => {
		if (rerievedFromStorage) return favouritesData;

		const favs = await AsyncStorage.getItem('favourites');
		if (!favs) return favouritesData;
		try {
			const favsParsed = JSON.parse(favs);

			favouritesData = { ...favsParsed };
			rerievedFromStorage = true;
		} catch (error) {}
		return favouritesData;
	},
	setFavourites: async (favs: FavouritesValueInterface) => {
		await AsyncStorage.setItem('favourites', JSON.stringify(favs));
		favouritesData = favs;
	},
	addToFavourites: async (url: string) => {
		console.log('Adding:', url);
		favouritesData = { ...favouritesData, [url]: true };
		await AsyncStorage.setItem(
			'favourites',
			JSON.stringify(favouritesData)
		);
	},
	removeFromFavourites: async (url: string) => {
		console.log('Url:', url);
		console.log('favourites:', favouritesData);

		if (!favouritesData[url]) return;
		const tmp = { ...favouritesData };
		delete tmp[url];
		favouritesData = tmp;
		await AsyncStorage.setItem(
			'favourites',
			JSON.stringify(favouritesData)
		);
	},
};

export default favourites;
