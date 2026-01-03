import { Button, Text, YStack } from 'tamagui'

export default function TabOneScreen() {
	return (
		<YStack
			flex={1}
			items='center'
			gap='$8'
			px='$5'
			pt='$5'
			bg='$background'>
			<Text
				fontFamily='$heading'
				fontWeight='$7'>
				Plus Jarkata Sans
			</Text>

			<Text>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit.
			</Text>

			<Button>Hello world</Button>
		</YStack>
	)
}
