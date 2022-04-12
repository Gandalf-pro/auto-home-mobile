/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
	Text as DefaultText,
	View as DefaultView,
	ScrollView as DefaultScrollView,
	TextInput as DefaultTextInput,
	StyleSheet,
	StyleProp,
	ViewStyle,
} from 'react-native';

import {
	Picker as DefaultPicker,
	PickerProps as DefaultPickerProps,
} from '@react-native-picker/picker';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
	const theme = useColorScheme();
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Colors[theme][colorName];
	}
}

type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type InputProps = ThemeProps &
	DefaultTextInput['props'] & {
		label?: string;
		containerStyle?: StyleProp<ViewStyle>;
	};
export type PickerProps = ThemeProps &
	DefaultPickerProps & {
		label?: string;
		containerStyle?: StyleProp<ViewStyle>;
	};

export function Text(props: TextProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'background'
	);

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
export function ScrollView(props: ScrollViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'background'
	);

	return (
		<DefaultScrollView
			style={[{ backgroundColor }, style]}
			{...otherProps}
		/>
	);
}

export function Input(props: InputProps) {
	const {
		style,
		lightColor,
		darkColor,
		label,
		containerStyle,
		...otherProps
	} = props;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'input'
	);

	const txt = (
		<DefaultTextInput
			style={[
				{
					color,
					backgroundColor,
					paddingHorizontal: 6,
				},
				styles.inputHeight,
				style,
			]}
			{...otherProps}
		/>
	);

	if (label) {
		return (
			<DefaultView style={[styles.labelContainer, containerStyle]}>
				<Text style={styles.label}>{label}</Text>
				{txt}
			</DefaultView>
		);
	}

	return txt;
}

export function Picker(props: PickerProps) {
	const {
		style,
		lightColor,
		darkColor,
		label,
		containerStyle,
		...otherProps
	} = props;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'input'
	);

	const picker = (
		<DefaultPicker
			style={[
				{
					color,
					backgroundColor,
					paddingVertical: 0,
					paddingHorizontal: 6,
				},
				styles.inputHeight,
				style,
			]}
			{...otherProps}
		/>
	);

	if (label) {
		return (
			<DefaultView style={[styles.labelContainer, containerStyle]}>
				<Text style={styles.label}>{label}</Text>
				{picker}
			</DefaultView>
		);
	}

	return picker;
}

const styles = StyleSheet.create({
	labelContainer: {
		flex: 1,
	},
	label: {
		marginBottom: 4,
	},
	inputHeight: {
		height: 54,
	},
	haha: {
		color: 'white',
		backgroundColor: 'black',
		paddingVertical: 0,
		paddingHorizontal: 6,
		borderWidth: 0,
		height: 26,
	},
});
