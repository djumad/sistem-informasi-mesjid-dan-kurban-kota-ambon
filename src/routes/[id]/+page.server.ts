import { pb } from '$lib';
import type { PageServerLoad } from '../$types';

export const load = (async ({ params }) => {
    const id = params.id as string;


    const getUser = await pb.collection('mesjid').getOne(id);

    const anggota = await pb.collection('anggota_kurban').getFullList();

    const anggotaMesjid = anggota.filter((anggota) => anggota.mesjid_id === id);

    return { getUser, anggotaMesjid };
}) satisfies PageServerLoad;
