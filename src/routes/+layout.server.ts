export const load = async ({ cookies }) => {
    return { team: cookies.get('team'), admin: cookies.get('admin') };
};