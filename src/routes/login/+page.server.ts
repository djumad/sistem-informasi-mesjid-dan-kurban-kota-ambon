import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { z } from "zod";
import { pb } from '$lib';

const formLogin = z.object({
    email: z.string().min(10, "Minimal harus 10 karakter").email("Harus bertipe email"),
    password: z.string().min(8, "Minimal 8 karakter")
});

export const load = (async ({locals}) => {
    if(locals){
        return {locals};
    }
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        const result = formLogin.safeParse({ email, password });

        if (!result.success) {
            return {
                status: 400,
                errors: result.error.flatten().fieldErrors
            };
        }
        try {
            await pb.collection('anggota_kurban').authWithPassword(email as string, password as string);

        } catch (error) {

            return {
                status: 401,
            };
        }
        cookies.set('token', pb.authStore.token , {
            path : "/",
            httpOnly : true,
            secure : true
        });
        return redirect(302 , '/login');
    },
    logout : async({cookies , locals})=>{
        cookies.delete('token' , {path : '/'});
        return redirect(302 , '/login');
    }
};
