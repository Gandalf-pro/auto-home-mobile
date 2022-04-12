import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ExecuteData {
	room: string;
	device: string;
	feature: string;
	data: { [x: string]: any };
}

export async function executeReq({ room, device, feature, data }: ExecuteData) {
	let ip = await AsyncStorage.getItem('defaultIp');
	let res = await axios.post(
		`http:\/\/` + ip + `:25852/execute/${room}/${device}/${feature}`,
		data
	);
	return res.data?.data;
}
