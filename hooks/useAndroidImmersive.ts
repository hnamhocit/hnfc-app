import * as NavigationBar from 'expo-navigation-bar'
import { useEffect } from 'react'
import { AppState, Platform } from 'react-native'

export function useAndroidImmersive() {
	useEffect(() => {
		if (Platform.OS !== 'android') return

		const hide = async () => {
			await NavigationBar.setPositionAsync('absolute')
			await NavigationBar.setBehaviorAsync('inset-swipe')
			await NavigationBar.setVisibilityAsync('hidden')
		}

		hide()

		// Khi app quay lại foreground → ẩn lại
		const sub = AppState.addEventListener('change', (state) => {
			if (state === 'active') {
				hide()
			}
		})

		return () => sub.remove()
	}, [])
}
