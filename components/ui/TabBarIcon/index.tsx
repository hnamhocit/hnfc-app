import { ElementType } from 'react'
import { Text, View } from 'tamagui'

interface TabBarIconProps {
	icon: ElementType
	color: string
	focused: boolean
	name: string
}

export default function TabBarIcon({
	icon: Icon,
	color,
	focused,
	name,
}: TabBarIconProps) {
	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: 48,
				minWidth: 48,
				borderRadius: 12,
			}}>
			<Icon
				size={24}
				color={color}
				weight={focused ? 'fill' : 'regular'}
			/>

			{focused && (
				<Text style={{ fontSize: 11, color, fontWeight: '600' }}>
					{name}
				</Text>
			)}
		</View>
	)
}
