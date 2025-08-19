'use server'

import { z } from 'zod'

const UpdateSchema = z.object({
  displayName: z.string().min(1).max(64),
  bio: z.string().max(280).optional(),
})

export async function updateProfileAction(formData: FormData) {
  const payload = Object.fromEntries(formData.entries())
  const parsed = UpdateSchema.safeParse(payload)
  if (!parsed.success) {
    throw new Error('Invalid input')
  }

  // Require auth from cookies/headers (example)
  // const session = await getSession()
  // if (!session) throw new Error('Unauthorized')

  // ...perform the update...
  return { ok: true }
}
