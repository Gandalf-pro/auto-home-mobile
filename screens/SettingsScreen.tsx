import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Input } from '@react-native-elements/themed';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function SettingsScreen({
	navigation,
}: RootTabScreenProps<'SettingTab'>) {
	const [ipAddress, setIpAddress] = useState('');
	const defaultIpHook = useAsyncStorage('defaultIp');

	// Set the ip field with existing default ip
	useEffect(() => {
		defaultIpHook.getItem().then((val) => {
			setIpAddress(val ?? '');
		});
	}, []);

	const setDefaultIp = () => {
		console.log('Setting ip:', ipAddress);
		defaultIpHook.setItem(ipAddress);
	};

	return (
		<View style={styles.container}>
			<Input
				label="Server ip:"
				placeholder="Server ip"
				value={ipAddress}
				onChangeText={setIpAddress}
				textContentType="URL"
				onSubmitEditing={setDefaultIp}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexGrow: 1,
		flexDirection: 'column',
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
	textInput: {
		color: 'white',
		backgroundColor: 'white',
		width: '70%',
	},
});
