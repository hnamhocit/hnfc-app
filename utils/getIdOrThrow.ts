import { useUserStore } from 'stores'

export function getIdOrThrow() {
	const uid = useUserStore.getState().user?.id
	if (!uid) throw new Error('Unauthenticated')
	return uid
}
