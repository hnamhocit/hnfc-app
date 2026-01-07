import { Timestamp } from '@react-native-firebase/firestore'

export interface IDocument {
	id: string
	createdAt: Timestamp
	updatedAt: Timestamp
}
