import { redirect } from '@sveltejs/kit'
export const load = (async ({ cookies }) => {
    let user = cookies.get('loggedIn')
    if(user === 'true') {
        return redirect(302, '/edit')
    } else {
        return redirect(302, '/login')  
    }
})