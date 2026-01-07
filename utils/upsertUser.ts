import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import {
	doc,
	getDoc,
	setDoc,
	Timestamp,
	updateDoc,
} from '@react-native-firebase/firestore'
import { db } from 'config'

import { IUser } from 'interfaces'

export async function upsertUser(
	user: FirebaseAuthTypes.User,
	extra?: Partial<IUser>,
) {
	if (!user?.uid) throw new Error('Missing user.uid')

	const ref = doc(db, 'users', user.uid)
	const snap = await getDoc(ref)
	const now = Timestamp.now()

	if (snap.exists()) {
		await updateDoc(ref, {
			updatedAt: now,
			...extra,
		})

		return false
	}

	const payload: IUser = {
		id: user.uid,
		displayName: user.displayName ?? extra?.displayName ?? '',
		photoURL: user.photoURL ?? null,
		email: user.email ?? '',
		createdAt: now,
		updatedAt: now,
		...extra,
	}

	await setDoc(ref, payload, { merge: false })
	return true
}
