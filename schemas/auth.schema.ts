import { z } from 'zod'

const password = z
	.string()
	.nonempty('Password is required')
	.regex(
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
		'Min 8 characters long, one uppercase , one lowercase ,one number, and one special character',
	)

export const loginSchema = z.object({
	email: z.email('Invalid email address'),
	password,
})

export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z.object({
	displayName: z.string().min(2).max(35),
	email: z.email(),
	password,
})

export type RegisterInput = z.infer<typeof registerSchema>
