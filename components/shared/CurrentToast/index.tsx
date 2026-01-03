import { CheckCircle, XCircle } from '@tamagui/lucide-icons'
import { Toast, useToastState } from '@tamagui/toast'
import { XStack, YStack } from 'tamagui'

export default function CurrentToast() {
	const t = useToastState()
	if (!t || t.isHandledNatively) return null

	// Lấy variant bạn truyền ở toast.show(...)
	const variant = (t as any).variant as 'error' | 'success' | undefined
	const isError = variant === 'error'

	return (
		<Toast
			key={t.id}
			duration={t.duration}
			viewportName={t.viewportName}
			animation='quick'
			enterStyle={{
				opacity: 0,
				scale: 0.96,
				transform: [{ translateY: 12 }],
			}}
			exitStyle={{
				opacity: 0,
				scale: 0.96,
				transform: [{ translateY: 12 }],
			}}
			opacity={1}
			scale={1}
			transform={[{ translateY: 0 }]}
			maxWidth='90%'
			alignSelf='center'
			backgroundColor={
				isError ? 'rgba(255, 59, 48, 0.9)' : 'rgba(52, 199, 89, 0.9)'
			}
			borderRadius='$4'
			shadowColor='black'
			shadowOpacity={0.25}
			shadowRadius={10}
			elevation={6}>
			<XStack
				gap='$2'
				alignItems='center'>
				{isError ? (
					<XCircle
						color='white'
						size={18}
					/>
				) : (
					<CheckCircle
						color='white'
						size={18}
					/>
				)}

				<YStack>
					<Toast.Title color='white'>{t.title}</Toast.Title>
					{!!t.message && (
						<Toast.Description
							color='white'
							opacity={0.9}>
							{t.message}
						</Toast.Description>
					)}
				</YStack>
			</XStack>
		</Toast>
	)
}
