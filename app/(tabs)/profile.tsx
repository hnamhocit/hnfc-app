import { authService } from 'services'
import { useUserStore } from 'stores'
import { Button, View } from 'tamagui'

export default function ProfileScreen() {
	const { user } = useUserStore()

	return (
		<View
			style={{
				paddingBlock: 24,
				paddingInline: 20,
			}}>
			<Button
				onPress={authService.logout}
				theme='dark_red'>
				Logout
			</Button>
		</View>
	)
}
