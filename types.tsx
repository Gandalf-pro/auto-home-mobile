/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined;
	Modal: undefined;
	NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
	TabOne: undefined;
	DevicesTab: NavigatorScreenParams<DevicesTabParamsList> | undefined;
	SettingTab: undefined;
};

export type DevicesTabParamsList = {
	RoomsScreen: undefined;
	DevicesScreen: undefined;
	FeaturesScreen: undefined;
};

// export type DevicesTabScreenProps<Screen extends keyof DevicesTabParamsList> = 
// CompositeScreenProps<
// 		BottomTabScreenProps<RootTabParamList, Screen>,
// 		NativeStackScreenProps<RootStackParamList>
//   >;

export type DevicesTabScreenProps<Screen extends keyof DevicesTabParamsList> =
	NativeStackScreenProps<DevicesTabParamsList, Screen>;
  
export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, Screen>,
		NativeStackScreenProps<RootStackParamList>
	>;
