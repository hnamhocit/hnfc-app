import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { H2, Text, YStack } from 'tamagui'

import AuthSwitcher from 'components/features/auth/AuthSwitcher'
import Providers from 'components/features/auth/Providers'

const Enter = () => {
	const [disabled, setDisabled] = useState(false)

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}>
			<LinearGradient
				colors={['#2A0F52', '#1F0C3E', '#16092E']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={{ flex: 1 }}>
				<View style={styles.wrapper}>
					<View style={styles.formContainer}>
						<YStack gap='$2'>
							<H2
								fontFamily='$heading'
								fontWeight='$7'
								fontSize='$4'>
								Welcome Back
							</H2>

							<Text>
								Enter your details to access your decks.
							</Text>
						</YStack>

						<Providers
							disabled={disabled}
							setDisabled={setDisabled}
						/>

						<AuthSwitcher
							disabled={disabled}
							setDisabled={setDisabled}
						/>

						<Text textAlign='center'>
							By continuing, you agree to our{' '}
							<Link
								href='legal/terms'
								style={{
									color: '#6A35D9',
									textDecorationLine: 'underline',
								}}>
								Terms of Service
							</Link>{' '}
							and{' '}
							<Link
								href='legal/privacy'
								style={{
									color: '#6A35D9',
									textDecorationLine: 'underline',
								}}>
								Privacy Policy.
							</Link>
						</Text>
					</View>
				</View>
			</LinearGradient>
		</KeyboardAvoidingView>
	)
}

export default Enter

const styles = StyleSheet.create({
	wrapper: {
		paddingBlock: 24,
		paddingInline: 20,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	formContainer: {
		width: '100%',
		gap: 28,
	},
})
