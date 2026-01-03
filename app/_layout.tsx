import '../tamagui-web.css'

import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { Provider } from 'components/Provider'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAndroidImmersive } from 'hooks/useAndroidImmersive'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
	initialRouteName: '(tabs)',
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		// Inter (body)
		InterRegular: require('../assets/fonts/Inter_24pt-Regular.ttf'),
		InterMedium: require('../assets/fonts/Inter_24pt-Medium.ttf'),
		InterSemiBold: require('../assets/fonts/Inter_24pt-SemiBold.ttf'),
		InterBold: require('../assets/fonts/Inter_24pt-Bold.ttf'),

		JakartaSemiBold: require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
		JakartaBold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
	})

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync()
		}
	}, [loaded, error])

	useAndroidImmersive()

	if (!loaded && !error) {
		return null
	}

	return (
		<Providers>
			<RootLayoutNav />
		</Providers>
	)
}

const Providers = ({ children }: { children: React.ReactNode }) => {
	return <Provider>{children}</Provider>
}

function RootLayoutNav() {
	const colorScheme = useColorScheme()

	return (
		<ThemeProvider
			value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<StatusBar
				hidden
				translucent
			/>

			<Stack>
				<Stack.Screen
					name='(tabs)'
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</ThemeProvider>
	)
}
