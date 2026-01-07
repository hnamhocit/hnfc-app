import { getAuth } from '@react-native-firebase/auth'
import { getFirestore } from '@react-native-firebase/firestore'

const db = getFirestore()
const auth = getAuth()

export { auth, db }
