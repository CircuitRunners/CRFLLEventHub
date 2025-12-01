import { redirect } from '@sveltejs/kit'
export const load = (async ({ cookies }) => {
    let user = cookies.get('team')
    if(user === null) {
        return redirect(302, '/login')
    } else if (user === '-1') {
        return redirect(302, '/edit')  
    }
})