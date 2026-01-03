import TabBarIcon from 'components/TabBarIcon'
import { Tabs } from 'expo-router'
import { HouseIcon, UserIcon } from 'phosphor-react-native'
import { useTheme } from 'tamagui'

export default function TabLayout() {
	const theme = useTheme()

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,

				tabBarActiveTintColor: theme.red10.val,
				tabBarInactiveTintColor: theme.color10.val,

				tabBarStyle: {
					backgroundColor: theme.background.val,
					borderTopColor: theme.borderColor.val,
					height: 64,
					paddingTop: 12,
				},
			}}>
			<Tabs.Screen
				name='index'
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							icon={HouseIcon}
							color={color}
							focused={focused}
							name='Home'
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='two'
				options={{
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							icon={UserIcon}
							color={color}
							focused={focused}
							name='User'
						/>
					),
				}}
			/>
		</Tabs>
	)
}
