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
	writeBatch,
} from 'config'
import { ICard } from 'interfaces'
import { CardValues } from 'schemas'
import { createInitialFsrsState, getIdOrThrow } from 'utils'

const COL = 'cards'

export const cardService = {
	async createMany(cards: ICard[]) {
		if (!cards.length) return

		const batch = writeBatch(db)

		for (const card of cards) {
			const ref = doc(db, COL, card.id)
			batch.set(ref, card)
		}

		await batch.commit()
	},

	async listByDeck(deckId: string): Promise<ICard[]> {
		const uid = getIdOrThrow()

		const q = query(
			collection(db, 'cards'),
			where('ownerId', '==', uid),
			where('deckId', '==', deckId),
			orderBy('createdAt', 'desc'),
		)

		const snap = await getDocs(q)
		return snap.docs.map((d) => d.data() as ICard)
	},

	async getById(id: string): Promise<ICard> {
		const uid = getIdOrThrow()
		const ref = doc(db, COL, id)
		const snap = await getDoc(ref)

		if (!snap.exists()) {
			throw new Error('Card not found')
		}

		const card = snap.data() as ICard
		if (card.ownerId !== uid) {
			throw new Error('Unauthorized')
		}

		return card
	},

	async create(input: CardValues): Promise<void> {
		const uid = getIdOrThrow()
		const now = Timestamp.now()

		const id = createId()
		const data: ICard = {
			id,
			ownerId: uid,
			deckId: input.deckId,
			front: input.front,
			back: input.back,
			srs: createInitialFsrsState(),
			createdAt: now,
			updatedAt: now,
		}

		const ref = doc(db, COL, data.id)
		await setDoc(ref, data)
	},

	async update(cardId: string, input: CardValues): Promise<void> {
		const ref = doc(db, COL, cardId)
		await updateDoc(ref, {
			deckId: input.deckId,
			front: input.front,
			back: input.back,
			updatedAt: Timestamp.now(),
		})
	},

	async remove(cardId: string): Promise<void> {
		const ref = doc(db, COL, cardId)
		await deleteDoc(ref)
	},

	async listDue(): Promise<ICard[]> {
		const uid = getIdOrThrow()
		const now = Timestamp.now()

		const q = query(
			collection(db, 'cards'),
			where('ownerId', '==', uid),
			where('srs.dueAt', '<=', now),
			orderBy('srs.dueAt', 'asc'),
		)

		const snap = await getDocs(q)
		return snap.docs.map((doc) => doc.data() as ICard)
	},
}
