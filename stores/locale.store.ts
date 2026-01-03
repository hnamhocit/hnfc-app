import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ILocale } from 'interfaces'

interface LocaleState {
	locale: ILocale
	setLocale: (locale: ILocale) => void
}

export const useLocaleStore = create<LocaleState>()(
	persist(
		(set) => ({
			locale: 'vi',
			setLocale: (locale) => set({ locale }),
		}),
		{
			name: 'locale',
		},
	),
)
