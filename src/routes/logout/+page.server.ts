import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async (event) => {
    console.log("logging out")
    event.cookies.delete('team', {path: '/'});
    event.cookies.delete('admin', {path: '/'});
    redirect(303, '/login');
}