import { Button, YStack } from 'tamagui'

export default function TabOneScreen() {
	return (
		<YStack
			flex={1}
			gap='$8'
			style={{ paddingBlock: 24, paddingInline: 20 }}
			bg='$background'>
			<Button>Hello world</Button>
		</YStack>
	)
}
