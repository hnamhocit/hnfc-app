import '../tamagui-web.css'

import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAndroidImmersive } from 'hooks/useAndroidImmersive'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Authenticate from 'components/shared/Authenticate'
import CurrentToast from 'components/shared/CurrentToast'
import { Provider } from 'components/shared/Provider'

GoogleSignin.configure({
	webClientId:
		'540391501176-ftqppc23in0d0vvca8tjcipr59haq9p5.apps.googleusercontent.com',
})

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
	return (
		<Provider>
			<Authenticate>{children}</Authenticate>
		</Provider>
	)
}

function RootLayoutNav() {
	return (
		<SafeAreaProvider>
			<ThemeProvider value={DarkTheme}>
				<StatusBar
					hidden
					translucent
				/>

				<CurrentToast />
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				/>
			</ThemeProvider>
		</SafeAreaProvider>
	)
}
