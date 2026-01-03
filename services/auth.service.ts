import {
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'config'
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

	logout: async function () {
		await signOut(auth)
	},
}
