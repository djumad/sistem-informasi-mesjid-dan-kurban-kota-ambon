import { pb } from '$lib';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const mesjid = await pb.collection('mesjid').getFullList();
    const anggota = await pb.collection('anggota_kurban').getFullList();
    console.log(mesjid);
    console.log(anggota);
    return {mesjid , anggota};
}) satisfies PageServerLoad;