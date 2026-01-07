import type { Timestamp } from '@react-native-firebase/firestore'
import {
	Avatar,
	Button,
	Paragraph,
	Separator,
	SizableText,
	View,
	XStack,
	YStack,
} from 'tamagui'

import { IUser } from 'interfaces'
import { authService } from 'services'
import { useUserStore } from 'stores'

function formatTimestamp(ts?: Timestamp | null) {
	if (!ts) return '—'

	try {
		const d = ts.toDate()
		return new Intl.DateTimeFormat('vi-VN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		}).format(d)
	} catch {
		return '—'
	}
}

function FieldRow({ label, value }: { label: string; value: React.ReactNode }) {
	return (
		<XStack
			justifyContent='space-between'
			alignItems='center'
			gap='$3'>
			<SizableText
				size='$3'
				color='$gray10'>
				{label}
			</SizableText>

			<SizableText
				size='$3'
				maxWidth='70%'
				textAlign='right'>
				{value}
			</SizableText>
		</XStack>
	)
}

export default function ProfileScreen() {
	const { user } = useUserStore() as { user?: IUser | null }

	const displayName = user?.displayName?.trim() || 'Anonymous'
	const email = user?.email || '—'
	const photoURL = user?.photoURL || undefined

	return (
		<View padding='$4'>
			<YStack gap='$4'>
				<XStack
					alignItems='center'
					gap='$4'>
					<Avatar
						circular
						size='$6'>
						<Avatar.Image
							accessibilityLabel='User avatar'
							src={photoURL}
						/>

						<Avatar.Fallback backgroundColor='$gray5'>
							<SizableText size='$5'>
								{displayName.slice(0, 1).toUpperCase()}
							</SizableText>
						</Avatar.Fallback>
					</Avatar>

					<YStack
						flex={1}
						gap='$1'>
						<SizableText
							size='$6'
							fontWeight='700'>
							{displayName}
						</SizableText>
						<Paragraph color='$gray10'>{email}</Paragraph>
					</YStack>
				</XStack>

				<Separator marginVertical='$4' />

				<YStack gap='$3'>
					<FieldRow
						label='User ID'
						value={user?.id || '—'}
					/>

					<FieldRow
						label='Created at'
						value={formatTimestamp(user?.createdAt)}
					/>

					<FieldRow
						label='Updated at'
						value={formatTimestamp(user?.updatedAt)}
					/>
				</YStack>

				<Button
					theme='dark_red'
					onPress={authService.logout}
					disabled={!user}>
					Logout
				</Button>
			</YStack>
		</View>
	)
}
