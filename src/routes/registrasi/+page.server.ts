import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {
    if(locals){
        return redirect(301 , "/");
    }
}) satisfies PageServerLoad;