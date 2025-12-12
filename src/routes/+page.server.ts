import { redirect } from '@sveltejs/kit'
export const load = (async ({ cookies }) => {
    redirect(303, 'view')
})