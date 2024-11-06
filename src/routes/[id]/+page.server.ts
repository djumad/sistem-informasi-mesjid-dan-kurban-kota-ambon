import { pb } from '$lib';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load = (async ({ params }) => {
    const id = params.id as string;

    // Ambil data mesjid berdasarkan ID
    const getMesjid = await pb.collection('mesjid').getOne(id, { autoCancel: false });

    // Ambil semua kelompok yang terkait dengan mesjid_id
    const kelompok = await pb.collection('kelompok').getFullList({
        filter: `mesjid_id = "${id}"`,
        autoCancel: false
    });

    const anggota = await pb.collection('anggota_kelompok').getFullList({ autoCancel: false });
    console.log(anggota);
    console.log(kelompok);

    const kelompokWithAnggota = await Promise.all(
        kelompok.map(async (kel) => {
            const anggota = await pb.collection('anggota_kurban').getOne(kel.anggota_kurban_id, { autoCancel: false });
            const setoran = await pb.collection('setoran_anggota').getFullList({
                filter: `anggota_id = "${anggota.id}" && disetujui = true`,
                autoCancel: false
            });

            const anggotaKelompok = await pb.collection('anggota_kelompok').getFullList({
                filter : `kelompok_id = "${kel.id}" && disetujui = true`,
                autoCancel: false
            });
            const dataAnggota = anggotaKelompok.map(data => data.id);
            console.log(dataAnggota);

            const totalSetoranAnggota = setoran.reduce((sum, s) => sum + s.jumlah_setoran, 0);

            return { 
                ...kel, 
                anggota: { ...anggota, setoran, totalSetoranAnggota, anggotaKelompok }
            };  
        })
    );
    console.log(kelompokWithAnggota);

    // Hitung total setoran per kelompok dan total keseluruhan setoran
    const totalSetoranSemuaKelompok = kelompokWithAnggota.reduce((total, kel) => {
        kel.jumlah_uang_setoran = kel.anggota.totalSetoranAnggota;
        return total + kel.jumlah_uang_setoran;
    }, 0);

    return { getMesjid, kelompokWithAnggota, totalSetoranSemuaKelompok };
}) satisfies PageServerLoad;

export const actions: Actions = {
    // gabungKelompok : async({request , locals})=>{
    //     if(!locals){
    //         throw redirect(302 , '/login');
    //     }
    //     const data = new FormData();
        
    //     data.append('')  

    //     await pb.collection('kelompok').create(data);

    // }
};
