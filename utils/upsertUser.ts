import type { User as FirebaseUser } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'

import { db, doc, getDoc, setDoc } from 'config'
import { IUser } from 'interfaces'

export async function upsertUser(user: FirebaseUser, extra?: Partial<IUser>) {
	if (!user?.uid) throw new Error('Missing user.uid')

	const ref = doc(db, 'users', user.uid)
	const snap = await getDoc(ref)
	const now = Timestamp.now()

	if (snap.exists()) {
		await setDoc(
			ref,
			{
				updatedAt: now,
				...extra,
			},
			{ merge: true },
		)
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
