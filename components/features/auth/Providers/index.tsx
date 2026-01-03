import * as AuthSession from 'expo-auth-session'
import * as Facebook from 'expo-auth-session/providers/facebook'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { useEffect } from 'react'
import { Button, Image, XStack } from 'tamagui'

import { IMAGES } from 'assets/images'
import {
	auth,
	FacebookAuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithCredential,
} from 'config'
import { upsertUser } from 'utils'

WebBrowser.maybeCompleteAuthSession()

type ProviderKey = 'google' | 'facebook' | 'github'

interface ProvidersProps {
	disabled: boolean
	setDisabled: (v: boolean) => void
}

// ====== FILL THESE LATER ======
const GOOGLE_IDS = {
	expoClientId: 'YOUR_EXPO_CLIENT_ID',
	iosClientId: 'YOUR_IOS_CLIENT_ID',
	androidClientId: 'YOUR_ANDROID_CLIENT_ID',
	webClientId: 'YOUR_WEB_CLIENT_ID',
}

const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID'

// GitHub OAuth App
const GITHUB_CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID'
// Endpoint bạn tự làm để exchange code -> access_token (khuyến nghị)
// Ví dụ: https://api.yourdomain.com/auth/github/exchange
const GITHUB_EXCHANGE_URL = 'YOUR_GITHUB_EXCHANGE_URL'
// =============================

async function exchangeGithubCodeForToken(code: string, redirectUri: string) {
	// Bạn tự implement phía server: nhận code + redirectUri -> trả { accessToken }
	// Tối thiểu: { accessToken: "..." }
	const res = await fetch(GITHUB_EXCHANGE_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ code, redirectUri }),
	})

	if (!res.ok) {
		const text = await res.text()
		throw new Error(`GitHub exchange failed: ${text}`)
	}

	const json = await res.json()
	if (!json?.accessToken)
		throw new Error('GitHub exchange missing accessToken')
	return String(json.accessToken)
}

export default function Providers({ disabled, setDisabled }: ProvidersProps) {
	// -------- Google --------
	const [googleRequest, googleResponse, googlePromptAsync] =
		Google.useAuthRequest({
			...GOOGLE_IDS,
			// scopes: ['profile', 'email'], // optional
		})

	useEffect(() => {
		;(async () => {
			if (googleResponse?.type !== 'success') return
			try {
				setDisabled(true)

				const idToken = googleResponse.authentication?.idToken
				const accessToken = googleResponse.authentication?.accessToken

				// Nếu idToken null (tuỳ config), dùng accessToken vẫn được
				const credential = GoogleAuthProvider.credential(
					idToken ?? undefined,
					accessToken,
				)
				const { user } = await signInWithCredential(auth, credential)
				await upsertUser(user)
			} catch (e) {
				console.error('Sign in with google failed:', e)
			} finally {
				setDisabled(false)
			}
		})()
	}, [googleResponse])

	// -------- Facebook --------
	const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
		clientId: FACEBOOK_APP_ID,
		// scopes: ['public_profile', 'email'], // optional
	})

	useEffect(() => {
		;(async () => {
			if (fbResponse?.type !== 'success') return
			try {
				setDisabled(true)

				const accessToken = fbResponse.authentication?.accessToken
				if (!accessToken)
					throw new Error('Facebook missing accessToken')

				const credential = FacebookAuthProvider.credential(accessToken)
				const { user } = await signInWithCredential(auth, credential)
				await upsertUser(user)
			} catch (e) {
				console.error('Sign in with facebook failed:', e)
			} finally {
				setDisabled(false)
			}
		})()
	}, [fbResponse])

	// -------- GitHub (AuthSession custom) --------
	const signInWithGithub = async () => {
		// Redirect URI phải match với exchange logic và GitHub OAuth app callback nếu bạn validate
		const redirectUri = AuthSession.makeRedirectUri({ useProxy: true })
		// Nếu bạn build EAS/production, có thể phải cấu hình scheme và set useProxy=false.

		const authUrl =
			`https://github.com/login/oauth/authorize` +
			`?client_id=${encodeURIComponent(GITHUB_CLIENT_ID)}` +
			`&redirect_uri=${encodeURIComponent(redirectUri)}` +
			`&scope=${encodeURIComponent('read:user user:email')}`

		try {
			setDisabled(true)

			const result = await AuthSession.startAsync({ authUrl })

			if (result.type !== 'success') {
				// cancelled / dismissed
				return
			}

			const code = (result.params as any)?.code
			if (!code) {
				const err = (result.params as any)?.error
				throw new Error(
					err ? `GitHub error: ${err}` : 'GitHub missing code',
				)
			}

			const accessToken = await exchangeGithubCodeForToken(
				String(code),
				redirectUri,
			)

			const credential = GithubAuthProvider.credential(accessToken)
			const { user } = await signInWithCredential(auth, credential)
			await upsertUser(user)
		} catch (e) {
			console.error('Sign in with github failed:', e)
		} finally {
			setDisabled(false)
		}
	}

	// -------- Unified click handler --------
	const onPress = (p: ProviderKey) => {
		if (p === 'google') return googlePromptAsync()
		if (p === 'facebook') return fbPromptAsync()
		return signInWithGithub()
	}

	return (
		<XStack gap='$4'>
			{(['google', 'facebook', 'github'] as const).map((p) => (
				<Button
					key={p}
					disabled={
						disabled ||
						(p === 'google' && !googleRequest) ||
						(p === 'facebook' && !fbRequest)
					}
					style={{ flex: 1 }}
					variant='outlined'
					onPress={() => onPress(p)}>
					<Image
						source={IMAGES.providers[p]}
						style={{ width: 20, height: 20 }}
					/>
				</Button>
			))}
		</XStack>
	)
}
