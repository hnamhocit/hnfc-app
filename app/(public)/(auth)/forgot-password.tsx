import { LinearGradient } from 'expo-linear-gradient'
import { Link, router } from 'expo-router'
import { useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Input, SizableText, Text, XStack, YStack } from 'tamagui'

export default function ForgotPasswordScreen() {
	const insets = useSafeAreaInsets()
	const [email, setEmail] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const isValidEmail = useMemo(() => {
		// đủ dùng cho UI validation
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
	}, [email])

	const onSubmit = async () => {
		const value = email.trim()
		if (!value) {
			setError('Please enter your email.')
			return
		}
		if (!isValidEmail) {
			setError('Please enter a valid email address.')
			return
		}

		setError(null)
		setSubmitting(true)

		try {
			// TODO: call API send reset link
			// await authApi.forgotPassword({ email: value })

			// demo: simulate
			await new Promise((r) => setTimeout(r, 600))

			// điều hướng sang trang "check your email" nếu bạn có
			// router.push('/check-email')
			router.back()
		} catch (e) {
			setError('Something went wrong. Please try again.')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<LinearGradient
			colors={['#2A0F52', '#1F0C3E', '#16092E']} // tím đậm sáng, không bết
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={{
				flex: 1,
			}}>
			<YStack
				flex={1}
				paddingHorizontal='$5'
				paddingTop='$6'
				gap='$5'>
				{/* Header */}
				<YStack gap='$2'>
					<SizableText
						size='$9'
						fontWeight='800'
						color='white'>
						Forgot password
					</SizableText>
					<Text color='rgba(255,255,255,0.75)'>
						Enter your email and we’ll send you a reset link.
					</Text>
				</YStack>

				{/* Card */}
				<YStack
					backgroundColor='rgba(255,255,255,0.06)'
					borderColor='rgba(255,255,255,0.10)'
					borderWidth={1}
					borderRadius='$2xl'
					padding='$5'
					gap='$4'>
					<YStack gap='$2'>
						<Text color='rgba(255,255,255,0.85)'>Email</Text>
						<Input
							value={email}
							onChangeText={(t) => {
								setEmail(t)
								if (error) setError(null)
							}}
							placeholder='name@company.com'
							placeholderTextColor='rgba(255,255,255,0.35)'
							autoCapitalize='none'
							keyboardType='email-address'
							backgroundColor='rgba(0,0,0,0.25)'
							borderColor='rgba(255,255,255,0.12)'
							color='white'
							borderRadius='$xl'
						/>
						{error ? (
							<Text color='rgba(255,120,120,0.95)'>{error}</Text>
						) : null}
					</YStack>

					{/* Primary button (tím + shadow) */}
					<Button
						onPress={onSubmit}
						disabled={submitting}
						backgroundColor='#6A35D9'
						color='#FFFFFF'
						borderRadius='$xl'
						pressStyle={{ backgroundColor: '#5A2BC2' }}
						hoverStyle={{ backgroundColor: '#7B4AF0' }}
						focusStyle={{ backgroundColor: '#7B4AF0' }}
						shadowColor='rgba(106,53,217,0.70)'
						shadowOpacity={1}
						shadowRadius={16}
						shadowOffset={{ width: 0, height: 10 }}
						elevation={12}>
						{submitting ? 'Sending…' : 'Send reset link'}
					</Button>

					{/* Secondary actions */}
					<XStack
						justifyContent='space-between'
						alignItems='center'>
						<Button
							chromeless
							onPress={() => router.back()}
							color='rgba(255,255,255,0.8)'
							pressStyle={{ opacity: 0.7 }}>
							Back
						</Button>

						<Link
							href='/login'
							asChild>
							<Button
								chromeless
								color='rgba(255,255,255,0.8)'
								pressStyle={{ opacity: 0.7 }}>
								Go to login
							</Button>
						</Link>
					</XStack>
				</YStack>

				{/* Footer spacing */}
				<YStack flex={1} />
			</YStack>
		</LinearGradient>
	)
}
