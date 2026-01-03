import { Eye, EyeOff } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Button, Input, Label, Text, XStack, YStack } from 'tamagui'

interface PasswordInputProps {
	label: string
	value: string
	onChange: (v: string) => void
	placeholder?: string
	error?: string
}

export default function PasswordInput({
	label,
	value,
	onChange,
	error,
}: PasswordInputProps) {
	const [hidden, setHidden] = useState(true)

	return (
		<YStack gap='$2'>
			<Label>{label}</Label>

			<XStack
				alignItems='center'
				borderWidth={1}
				borderColor='rgba(255,255,255,0.12)'
				borderRadius='$xl'
				backgroundColor='rgba(0,0,0,0.25)'
				paddingRight='$2'>
				<Input
					flex={1}
					borderWidth={0} // quan trọng
					backgroundColor='transparent'
					secureTextEntry={hidden}
					value={value}
					onChangeText={onChange}
					type={hidden ? 'password' : 'text'}
				/>

				<Button
					chromeless
					onPress={() => setHidden((v) => !v)}
					padding='$2'>
					{hidden ? <Eye size={18} /> : <EyeOff size={18} />}
				</Button>
			</XStack>

			{error && <Text color='rgba(255,120,120,0.95)'>{error}</Text>}
		</YStack>
	)
}
