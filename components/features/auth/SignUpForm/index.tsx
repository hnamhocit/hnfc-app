import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input, Label, Text, YStack } from 'tamagui'

import { RegisterInput, registerSchema } from 'schemas'
import { authService } from 'services'
import PasswordInput from '../PasswordInput'

interface SignUpFormProps {
	disabled: boolean
	setDisabled: Dispatch<SetStateAction<boolean>>
}

export default function SignUpForm({ disabled, setDisabled }: SignUpFormProps) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema), // ✅ schema quyết định message
		defaultValues: {
			displayName: '',
			email: '',
			password: '',
		},
		mode: 'onBlur',
		reValidateMode: 'onChange',
	})

	const onSubmit = async (data: RegisterInput) => {
		setDisabled(true)

		try {
			await authService.register(data)
			reset()
		} catch (err) {
			console.error('Register failed:', err)
		} finally {
			setDisabled(false)
		}
	}

	return (
		<YStack gap='$4'>
			{/* Name */}
			<Controller
				control={control}
				name='displayName'
				render={({ field }) => (
					<YStack gap='$2'>
						<Label>Name</Label>
						<Input
							borderColor='rgba(255,255,255,0.12)'
							backgroundColor='rgba(0,0,0,0.25)'
							borderRadius={0}
							value={field.value}
							onChangeText={field.onChange}
							editable={!disabled}
						/>
						{errors.displayName?.message && (
							<Text color='rgba(255,120,120,0.95)'>
								{errors.displayName.message}
							</Text>
						)}
					</YStack>
				)}
			/>

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
						placeholder='Create a password'
						value={field.value}
						onChange={field.onChange}
						error={errors.password?.message}
					/>
				)}
			/>

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
				Create Account
			</Button>
		</YStack>
	)
}
