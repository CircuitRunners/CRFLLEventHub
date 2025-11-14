import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = (async ({ cookies }) => {
    let user = cookies.get('loggedIn')
    if(user === 'true') {
        return { user: user }
    } else {
        return redirect(302, '/login')  
    }
})