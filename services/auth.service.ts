import {
	createUserWithEmailAndPassword,
	FacebookAuthProvider,
	GoogleAuthProvider,
	signInWithCredential,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { auth } from 'config'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'

import { LoginInput, RegisterInput } from 'schemas'
import { upsertUser } from 'utils'

export const authService = {
	login: async function (data: LoginInput) {
		const { user } = await signInWithEmailAndPassword(
			auth,
			data.email,
			data.password,
		)

		await upsertUser(user)

		return user
	},

	register: async function (data: RegisterInput) {
		const { user } = await createUserWithEmailAndPassword(
			auth,
			data.email,
			data.password,
		)

		await updateProfile(user, { displayName: data.displayName })

		await upsertUser(user)

		return user
	},

	async loginWithGoogle() {
		await GoogleSignin.hasPlayServices({
			showPlayServicesUpdateDialog: true,
		})
		const signInResult = await GoogleSignin.signIn()

		let idToken = signInResult.data?.idToken
		if (!idToken) {
			throw new Error('No ID token found')
		}

		const googleCredential = GoogleAuthProvider.credential(idToken)

		const { user } = await signInWithCredential(auth, googleCredential)
		await upsertUser(user)
	},

	async loginWithFacebook() {
		const result = await LoginManager.logInWithPermissions([
			'public_profile',
			'email',
		])

		if (result.isCancelled) {
			throw 'User cancelled the login process'
		}

		const data = await AccessToken.getCurrentAccessToken()

		if (!data) {
			throw 'Something went wrong obtaining access token'
		}

		const facebookCredential = FacebookAuthProvider.credential(
			data.accessToken,
		)

		const { user } = await signInWithCredential(auth, facebookCredential)
		await upsertUser(user)
	},

	logout: async function () {
		await signOut(auth)
	},
}
