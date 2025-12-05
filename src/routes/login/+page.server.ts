import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getTeams } from "$lib/db";
import { goto } from "$app/navigation";



export const load: PageServerLoad = async (event) =>{
    if (event.cookies.get('team') === '-1') {
        return { status: 200, body: { message: "You are logged in" } };
    }
    return { status: 401, body: { message: "You are not logged in" } };
}



export const actions: Actions = {
    default: async (event) => {
        const formData = Object.fromEntries(await event.request.formData());
		if (!formData.username || !formData.password) {
            console.log('Missing username or password');
			return fail(400, {
				missing: true
			});
		}
		const { username, password } = formData as { username: string; password: string };

        const teams = await getTeams();

        // find the team that matches the login info
        const matched = teams.find(
            (t) => String(t.number) === username && t.password === password
        );
        


        if (username === 'admin' && password === 'admin') {
            console.log('Logged in');
            event.cookies.set('team', '-1', {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                expires: new Date(8.64e15)
            });
            event.cookies.set('admin', 'true', {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                expires: new Date(8.64e15)
            });
            redirect(303, '/edit');
            return {
                status: 200,
                body: { message: "You are now logged in" },
                redirect: '/edit'
            };
        }
        else if (matched){
            console.log('Logged in:', matched.number);
            event.cookies.set('team', String(matched.number), {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                expires: new Date(8.64e15)
            });
            event.cookies.set('admin', 'false', {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                expires: new Date(8.64e15)
            });
            redirect(303, '/view');
            return {
                status: 200,
                body: { message: "You are now logged in" },
                redirect: '/edit'
            };
        }
        return {
            status: 401,
            body: { message: "Invalid username or password" }
        };
    }
}