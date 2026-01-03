import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	limit,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	startAfter,
	Timestamp,
	updateDoc,
	where,
	writeBatch,
	type DocumentData,
	type QueryConstraint,
	type QueryDocumentSnapshot,
} from 'firebase/firestore'

import { app } from './app'

export const db = getFirestore(app)

// re-export firestore APIs (chỉ firestore)
export {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	startAfter,
	Timestamp,
	updateDoc,
	where,
	writeBatch,
	type DocumentData,
	type QueryConstraint,
	type QueryDocumentSnapshot,
}
