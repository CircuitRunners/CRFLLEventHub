import type { PageServerLoad } from "../$types";

const load: PageServerLoad = async (event) => {
    event.cookies.delete('team', {path: '/'});
    event.cookies.delete('admin', {path: '/'});
    return { status: 303, redirect: '/login' };
}