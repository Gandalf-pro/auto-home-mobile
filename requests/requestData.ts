import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DataInterface {
	[key: string]: any;
}
export interface FeatureJsonInterface {
	name: string;
	type: string;
	availableLogics: string[];
	availableActions: string[];
	data: DataInterface;
}
export interface DeviceJsonInterface {
	room: string;
	name: string;
	features: FeatureJsonInterface[];
}

export interface HomeData {
	[roomName: string]: {
		[deviceName: string]: DeviceJsonInterface;
	};
}

export default async function requestData(): Promise<HomeData> {
	let ip = await AsyncStorage.getItem('defaultIp');
	let res = await axios.get(`http:\/\/` + ip + ':25852/data');
	console.log('Requesting data:', res.status);
	return res.data?.data;
}
