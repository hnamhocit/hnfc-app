import * as WebBrowser from 'expo-web-browser'
import { Button, Image, XStack } from 'tamagui'

import { IMAGES } from 'assets/images'
import { authService } from 'services'

WebBrowser.maybeCompleteAuthSession()

type ProviderKey = 'google' | 'facebook'

interface ProvidersProps {
	disabled: boolean
	setDisabled: (v: boolean) => void
}

export default function Providers({ disabled, setDisabled }: ProvidersProps) {
	const onPress = async (p: ProviderKey) => {
		setDisabled(true)

		try {
			switch (p) {
				case 'google':
					return await authService.loginWithGoogle()
				case 'facebook':
					return await authService.loginWithFacebook()
			}
		} catch (error) {
			console.log('Error during social login:', error)
		}
	}

	return (
		<XStack gap='$4'>
			{(['google', 'facebook'] as const).map((p) => (
				<Button
					key={p}
					disabled={disabled}
					style={{ flex: 1 }}
					variant='outlined'
					onPress={() => onPress(p)}>
					<Image
						source={IMAGES.providers[p]}
						style={{ width: 20, height: 20 }}
					/>
				</Button>
			))}
		</XStack>
	)
}
