import { Spinner, View } from 'tamagui'

export default function Loading() {
	return (
		<View
			flex={1}
			justifyContent='center'
			alignItems='center'>
			<Spinner size='large' />
		</View>
	)
}
