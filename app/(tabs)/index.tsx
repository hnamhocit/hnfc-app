import { Link } from 'expo-router'
import { useUserStore } from 'stores'
import { Button, Text, YStack } from 'tamagui'

export default function TabOneScreen() {
	const { user } = useUserStore()

	return (
		<YStack
			flex={1}
			gap='$8'
			style={{ paddingBlock: 24, paddingInline: 20 }}
			bg='$background'>
			<Text>{JSON.stringify(user, null, 2)}</Text>

			<Link href='/enter'>Enter</Link>

			<Button>Hello world</Button>
		</YStack>
	)
}
