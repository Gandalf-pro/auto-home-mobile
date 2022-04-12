/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import SettingsTab from '../screens/SettingsScreen';
import {
	DevicesTabParamsList,
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import DevicesScreen from '../screens/Devices/DevicesScreen';
import FeaturesScreen from '../screens/Devices/FeaturesScreen';
import RoomsScreen from '../screens/Devices/RoomsScreen';

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="Modal" component={ModalScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

const DeviceStack = createNativeStackNavigator<DevicesTabParamsList>();
function DevicesTabStackComponent() {
	return (
		<DeviceStack.Navigator initialRouteName='RoomsScreen'>
			<DeviceStack.Screen
				name="DevicesScreen"
				component={DevicesScreen}
				options={{ title: 'Devices' }}
			/>
			<DeviceStack.Screen
				name="FeaturesScreen"
				component={FeaturesScreen}
				options={{ title: 'Features' }}
			/>
			<DeviceStack.Screen
				name="RoomsScreen"
				component={RoomsScreen}
				options={{ title: 'Rooms' }}
			/>
		</DeviceStack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="TabOne"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
			}}
		>
			<BottomTab.Screen
				name="TabOne"
				component={TabOneScreen}
				options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
					title: 'Home',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="home" color={color} />
					),
					// headerRight: () => (
					// 	<Pressable
					// 		onPress={() => navigation.navigate('Modal')}
					// 		style={({ pressed }) => ({
					// 			opacity: pressed ? 0.5 : 1,
					// 		})}
					// 	>
					// 		<FontAwesome
					// 			name="info-circle"
					// 			size={25}
					// 			color={Colors[colorScheme].text}
					// 			style={{ marginRight: 15 }}
					// 		/>
					// 	</Pressable>
					// ),
				})}
			/>
			<BottomTab.Screen
				name="DevicesTab"
				component={DevicesTabStackComponent}
				options={{
					headerShown: false,
					title: 'Devices',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="phone" color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="SettingTab"
				component={SettingsTab}
				options={{
					title: 'Settings',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="gear" color={color} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
