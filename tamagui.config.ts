import { defaultConfig } from '@tamagui/config/v4'
import { createFont, createTamagui } from 'tamagui'

const bodyFont = createFont({
	family: 'InterRegular',
	size: { 1: 12, 2: 14, 3: 16, 4: 18, 5: 20, 6: 24, 7: 28 },
	lineHeight: { 1: 16, 2: 20, 3: 24, 4: 26, 5: 28, 6: 32, 7: 36 },
	weight: { 4: '400', 5: '500', 6: '600', 7: '700' },
	face: {
		400: { normal: 'InterRegular' },
		500: { normal: 'InterMedium' },
		600: { normal: 'InterSemiBold' },
		700: { normal: 'InterBold' },
	},
})

const headingFont = createFont({
	family: 'JakartaMedium',
	size: { 1: 14, 2: 16, 3: 18, 4: 20, 5: 24, 6: 28, 7: 32 },
	lineHeight: { 1: 18, 2: 22, 3: 24, 4: 28, 5: 32, 6: 36, 7: 40 },
	weight: { 6: '600', 7: '700' },
	face: {
		600: { normal: 'JakartaSemiBold' },
		700: { normal: 'JakartaBold' },
	},
})

export const config = createTamagui({
	...defaultConfig,
	fonts: {
		body: bodyFont,
		heading: headingFont,
	},
})

export default config

export type Conf = typeof config

declare module 'tamagui' {
	interface TamaguiCustomConfig extends Conf {}
}
