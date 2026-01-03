import { zodResolver } from '@hookform/resolvers/zod'
import { useToastController } from '@tamagui/toast'
import { Link } from 'expo-router'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input, Label, Text, YStack } from 'tamagui'

import { FirebaseError } from 'firebase/app'
import { LoginInput, loginSchema } from 'schemas'
import { authService } from 'services'
import { mapFirebaseError } from 'utils'
import PasswordInput from '../PasswordInput'

interface SignInFormProps {
	disabled: boolean
	setDisabled: Dispatch<SetStateAction<boolean>>
}

export default function SignInForm({ disabled, setDisabled }: SignInFormProps) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onBlur',
		reValidateMode: 'onChange',
	})
	const toast = useToastController()

	const onSubmit = async (data: LoginInput) => {
		setDisabled(true)

		try {
			await authService.login(data)
			reset()
		} catch (err) {
			if (err instanceof FirebaseError) {
				const message = mapFirebaseError(err)

				toast.show(message, {
					variant: 'error',
				})

				return
			}
			toast.show('Login failed', {
				message: err.message,
				theme: 'danger',
				type: 'error',
			})
		} finally {
			setDisabled(false)
		}
	}

	return (
		<YStack gap='$4'>
			{/* Email */}
			<Controller
				control={control}
				name='email'
				render={({ field }) => (
					<YStack gap='$2'>
						<Label>Email</Label>
						<Input
							borderColor='rgba(255,255,255,0.12)'
							backgroundColor='rgba(0,0,0,0.25)'
							borderRadius={0}
							autoCapitalize='none'
							keyboardType='email-address'
							value={field.value}
							onChangeText={field.onChange}
							editable={!disabled}
						/>
						{errors.email?.message && (
							<Text color='rgba(255,120,120,0.95)'>
								{errors.email.message}
							</Text>
						)}
					</YStack>
				)}
			/>

			{/* Password */}
			<Controller
				control={control}
				name='password'
				render={({ field }) => (
					<PasswordInput
						label='Password'
						placeholder='Enter your password'
						value={field.value}
						onChange={field.onChange}
						error={errors.password?.message}
					/>
				)}
			/>

			<Link
				href='/forgot-password'
				asChild>
				<Text
					color='#6A35D9'
					style={{ textAlign: 'right' }}>
					Forgot Password?
				</Text>
			</Link>

			{/* Submit */}
			<Button
				onPress={handleSubmit(onSubmit)}
				disabled={disabled}
				backgroundColor='#6A35D9'
				color='#FFFFFF'
				pressStyle={{ backgroundColor: '#5A2BC2' }}
				shadowColor='rgba(106,53,217,0.65)'
				shadowOpacity={1}
				shadowRadius={14}
				shadowOffset={{ width: 0, height: 8 }}
				elevation={10}>
				Sign In
			</Button>
		</YStack>
	)
}
