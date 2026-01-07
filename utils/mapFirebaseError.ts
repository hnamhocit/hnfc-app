import { ReactNativeFirebase } from '@react-native-firebase/app'

const COMMON_ERRORS: Record<string, string> = {
	'auth/network-request-failed':
		'Network error. Please check your connection.',
	'auth/too-many-requests': 'Too many attempts. Please try again later.',
	'auth/operation-not-allowed': 'This sign-in method is not enabled.',
	'auth/internal-error': 'Internal error. Please try again.',
}

const EMAIL_ERRORS: Record<string, string> = {
	'auth/invalid-email': 'The email address is not valid.',
	'auth/user-not-found': 'No account found with this email.',
	'auth/wrong-password': 'Incorrect password.',
	'auth/invalid-credential': 'Invalid email or password.',
	'auth/user-disabled': 'This account has been disabled.',
	'auth/email-already-in-use': 'This email is already registered.',
	'auth/weak-password': 'Password should be at least 6 characters.',
	'auth/account-exists-with-different-credential':
		'An account already exists with the same email but a different sign-in method.',
}

const OAUTH_ERRORS: Record<string, string> = {
	'auth/account-exists-with-different-credential':
		'An account already exists with the same email but a different sign-in method.',
	'auth/popup-closed-by-user': 'Sign-in was cancelled.',
	'auth/cancelled-popup-request': 'Sign-in was cancelled.',
	'auth/credential-already-in-use':
		'This credential is already linked to another account.',
	'auth/invalid-credential': 'Invalid or expired sign-in credential.',
}

const ERROR_MAP = {
	...COMMON_ERRORS,
	...EMAIL_ERRORS,
	...OAUTH_ERRORS,
}

export function isRNFBError(
	e: unknown,
): e is ReactNativeFirebase.NativeFirebaseError {
	return (
		typeof e === 'object' &&
		e !== null &&
		'code' in e &&
		typeof (e as any).code === 'string' &&
		'message' in e &&
		typeof (e as any).message === 'string'
	)
}

export function mapFirebaseError(error: unknown): string {
	if (!isRNFBError(error)) {
		return 'Something went wrong. Please try again.'
	}

	return ERROR_MAP[error.code] ?? 'Authentication failed. Please try again.'
}
