import { createId } from '@paralleldrive/cuid2'

import {
	collection,
	db,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	setDoc,
	Timestamp,
	updateDoc,
	where,
} from 'config'
import type { ICard, IDeck, IDeckStats, IDeckWithStats } from 'interfaces'
import type { DeckInput } from 'schemas'
import { deckSchema } from 'schemas'
import { chunk, getIdOrThrow } from 'utils'

const COL = 'decks' as const

export const deckService = {
	async create(input: DeckInput): Promise<string> {
		const uid = getIdOrThrow()
		const parsed = deckSchema.parse(input)

		const data: IDeck = {
			id: createId(),
			...parsed,
			ownerId: uid,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		}
		const ref = doc(db, COL, data.id)
		await setDoc(ref, data)

		return ref.id
	},

	async getById(deckId: string): Promise<IDeck> {
		const ref = doc(db, COL, deckId)
		const snap = await getDoc(ref)
		if (!snap.exists()) throw new Error('Deck not found')
		return snap.data() as IDeck
	},

	async update(deckId: string, input: DeckInput): Promise<void> {
		const parsed = deckSchema.parse(input)

		const ref = doc(db, COL, deckId)
		await updateDoc(ref, {
			...parsed,
			updatedAt: Timestamp.now(),
		})
	},

	async put(deckId: string, patch: Partial<DeckInput>): Promise<void> {
		const parsed = deckSchema.partial().parse(patch)

		const ref = doc(db, COL, deckId)
		await updateDoc(ref, {
			...parsed,
			updatedAt: Timestamp.now(),
		})
	},

	async remove(deckId: string) {
		const ref = doc(db, COL, deckId)
		await deleteDoc(ref)
	},

	async findMany() {
		const id = getIdOrThrow()
		const q = query(
			collection(db, 'decks'),
			where('ownerId', '==', id),
			orderBy('createdAt', 'desc'),
		)

		const snap = await getDocs(q)
		return snap.docs.map((doc) => doc.data() as IDeck)
	},

	async getDecksWithStats(decks: IDeck[]): Promise<IDeckWithStats[]> {
		if (!decks.length) return []

		const deckIds = decks.map((d) => d.id)
		const now = Timestamp.now()
		const id = getIdOrThrow()

		const statsByDeckId: Record<string, IDeckStats> = Object.fromEntries(
			deckIds.map((id) => [
				id,
				{ totalCards: 0, dueCards: 0, progress: 0 },
			]),
		)

		// batch query cards by deckId (Firestore "in" max 10)
		for (const ids of chunk(deckIds, 10)) {
			const q = query(
				collection(db, 'cards'),
				where('ownerId', '==', id),
				where('deckId', 'in', ids),
			)
			const snap = await getDocs(q)

			snap.forEach((doc) => {
				const c = doc.data() as ICard
				const st = statsByDeckId[c.deckId]
				if (!st) return

				st.totalCards += 1

				const dueAt =
					typeof c.srs?.dueAt === 'string'
						? Timestamp.fromDate(new Date(c.srs.dueAt))
						: (c.srs?.dueAt as any)

				if (dueAt && dueAt.toMillis() <= now.toMillis())
					st.dueCards += 1
				if (c.srs?.state === 'review') st.progress += 1
			})
		}

		// finalize progress as percentage + merge
		return decks.map((d) => {
			const st = statsByDeckId[d.id] ?? {
				totalCards: 0,
				dueCards: 0,
				progress: 0,
			}

			const progressPct = st.totalCards
				? Math.round((st.progress / st.totalCards) * 100)
				: 0

			return {
				...d,
				totalCards: st.totalCards,
				dueCards: st.dueCards,
				progress: progressPct,
			} satisfies IDeckWithStats
		})
	},
}
