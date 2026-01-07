'use client'

import { onAuthStateChanged } from '@react-native-firebase/auth'
import { doc, onSnapshot } from '@react-native-firebase/firestore'
import { usePathname, useRouter } from 'expo-router'
import { ReactNode, useEffect, useRef } from 'react'

import Loading from 'components/ui/Loading'
import { auth, db } from 'config'
import { IUser } from 'interfaces'
import { useUserStore } from 'stores'

interface AuthenticateProps {
	children: ReactNode
}

const Authenticate = ({ children }: AuthenticateProps) => {
	const { user, isLoading, setUser, setIsLoading } = useUserStore()
	const router = useRouter()
	const pathname = usePathname()
	const unsubscribeProfileRef = useRef<null | (() => void)>(null)

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
			unsubscribeProfileRef.current?.()
			unsubscribeProfileRef.current = null

			if (!user) {
				setUser(null)
				setIsLoading(false)
				return
			}

			const userRef = doc(db, 'users', user.uid)

			unsubscribeProfileRef.current = onSnapshot(
				userRef,
				(snapshot) => {
					if (snapshot.exists()) {
						setUser(snapshot.data() as IUser)
					}

					setIsLoading(false)
				},
				(error) => {
					console.error('[User snapshot]', error)
					setUser(null)
				},
			)
		})

		return () => {
			unsubscribeAuth()
			unsubscribeProfileRef.current?.()
		}
	}, [setIsLoading, setUser])

	useEffect(() => {
		if (isLoading) return

		if (!user && pathname !== '/enter') {
			router.replace('/enter')
			return
		}

		if (user && pathname === '/enter') {
			router.replace('/')
		}
	}, [isLoading, user, pathname, router])

	if (isLoading) {
		return <Loading />
	}

	return children
}

export default Authenticate
