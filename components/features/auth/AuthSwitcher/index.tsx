import { Dispatch, SetStateAction, useState } from 'react'
import { Button, Separator, SizableText, XStack, YStack } from 'tamagui'
import SignInForm from '../SignInForm'
import SignUpForm from '../SignUpForm'

type Mode = 'login' | 'register'

interface AuthSwitcherProps {
	disabled: boolean
	setDisabled: Dispatch<SetStateAction<boolean>>
}

export default function AuthSwitcher({
	disabled,
	setDisabled,
}: AuthSwitcherProps) {
	const [mode, setMode] = useState<Mode>('login')

	return (
		<YStack gap='$4'>
			{/* Segmented header */}
			<XStack
				width='100%'
				backgroundColor='rgba(0,0,0,0.40)'
				borderRadius='$xl'
				overflow='hidden'
				borderWidth={1}
				borderColor='rgba(255,255,255,0.12)'
				height={48}>
				<Button
					unstyled
					flex={1}
					disabled={disabled}
					onPress={() => setMode('login')}
					backgroundColor={
						mode === 'login'
							? 'rgba(255,255,255,0.9)'
							: 'transparent'
					}
					pressStyle={{ opacity: 0.9 }}
					alignItems='center'
					justifyContent='center'>
					<SizableText
						numberOfLines={1}
						fontFamily='$heading'
						fontWeight='700'
						color={
							mode === 'login'
								? '#6A35D9'
								: 'rgba(255,255,255,0.7)'
						}>
						Sign In
					</SizableText>
				</Button>

				<Separator
					vertical
					borderColor='rgba(255,255,255,0.12)'
				/>

				<Button
					unstyled
					flex={1}
					disabled={disabled}
					onPress={() => setMode('register')}
					backgroundColor={
						mode === 'register'
							? 'rgba(255,255,255,0.9)'
							: 'transparent'
					}
					pressStyle={{ opacity: 0.9 }}
					alignItems='center'
					justifyContent='center'>
					<SizableText
						numberOfLines={1}
						fontFamily='$heading'
						fontWeight='700'
						color={
							mode === 'register'
								? '#6A35D9'
								: 'rgba(255,255,255,0.7)'
						}>
						Create Account
					</SizableText>
				</Button>
			</XStack>

			{/* Conditional rendering */}
			{mode === 'login' ? (
				<SignInForm
					disabled={disabled}
					setDisabled={setDisabled}
				/>
			) : (
				<SignUpForm
					disabled={disabled}
					setDisabled={setDisabled}
				/>
			)}
		</YStack>
	)
}
