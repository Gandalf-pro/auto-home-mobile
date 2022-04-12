import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@react-native-elements/themed';

const queryClient = new QueryClient();

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<QueryClientProvider client={queryClient}>
				<SafeAreaProvider>
					<Navigation colorScheme={colorScheme} />
					<StatusBar />
				</SafeAreaProvider>
			</QueryClientProvider>
		);
	}
}
