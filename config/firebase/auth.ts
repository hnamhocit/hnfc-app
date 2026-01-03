import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import {
	createUserWithEmailAndPassword,
	FacebookAuthProvider,
	getReactNativePersistence,
	GithubAuthProvider,
	GoogleAuthProvider,
	initializeAuth,
	onAuthStateChanged,
	signInWithCredential,
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	updateProfile,
} from 'firebase/auth'

import { app } from './app'

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

// re-export auth APIs (chỉ auth)
export {
	createUserWithEmailAndPassword,
	FacebookAuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithCredential,
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	updateProfile,
}
