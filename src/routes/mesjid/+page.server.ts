import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { pb } from '$lib';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await request.formData();
        const namaMesjid = form.get('nama_mesjid') as string;
        const fotoMesjid = form.get('foto_mesjid') as File;
        const lokasiMesjid = form.get('lokasi_mesjid') as string;

        const data = new FormData();
        data.append('nama_mesjid', namaMesjid);
        data.append('foto_mesjid', fotoMesjid);
        data.append('lokasi_mesjid', lokasiMesjid);

        const result = await pb.collection('mesjid').create(data);

        if (result) {
            return redirect(301, '/');
        }
    }
};
