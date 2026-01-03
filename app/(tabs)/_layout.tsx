import TabBarIcon from 'components/ui/TabBarIcon'
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
				tabBarInactiveTintColor: theme.mutedForeground?.val,

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
				name='profile'
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
