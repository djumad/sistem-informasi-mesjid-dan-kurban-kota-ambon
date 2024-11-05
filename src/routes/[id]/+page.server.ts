import { pb } from '$lib';
import type { PageServerLoad } from '../$types';

export const load = (async ({ params }) => {
    const id = params.id as string;

    // Ambil data mesjid berdasarkan ID
    const getMesjid = await pb.collection('mesjid').getOne(id);

    // Ambil semua kelompok yang terkait dengan mesjid_id
    const kelompok = await pb.collection('kelompok').getFullList({
        filter: `mesjid_id = "${id}"`
    });

    // Proses kelompok untuk mendapatkan anggota dan setoran yang disetujui
    const kelompokWithAnggota = await Promise.all(
        kelompok.map(async (kel) => {
            const anggota = await pb.collection('anggota_kurban').getOne(kel.anggota_kurban_id);
            
            // Ambil semua setoran anggota yang disetujui (disetujui = true)
            const setoran = await pb.collection('setoran_anggota').getFullList({
                filter: `anggota_id = "${anggota.id}" && disetujui = true`
            });

            // Hitung total jumlah setoran yang disetujui untuk anggota ini
            const totalSetoranAnggota = setoran.reduce((sum, s) => sum + s.jumlah_setoran, 0);

            // Gabungkan data anggota dengan setoran dan total jumlah setoran
            return { 
                ...kel, 
                anggota: { ...anggota, setoran, totalSetoranAnggota }
            };
        })
    );

    // Hitung total setoran per kelompok dan total keseluruhan setoran
    let totalSetoranSemuaKelompok = 0;
    kelompokWithAnggota.forEach((kel) => {
        // Hitung total setoran yang disetujui untuk setiap kelompok
        kel.jumlah_uang_setoran = kel.anggota.totalSetoranAnggota;
        totalSetoranSemuaKelompok += kel.jumlah_uang_setoran;
    });

    return { getMesjid, kelompokWithAnggota, totalSetoranSemuaKelompok };
}) satisfies PageServerLoad;
