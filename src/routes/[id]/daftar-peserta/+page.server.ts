import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { pb } from '$lib';

export const load = (async ({params}) => {
    const url = params.id;
    return {url};
}) satisfies PageServerLoad;


export const actions: Actions = {
    default : async({request , params})=>{

        const url = params.id as string;
        const form = await request.formData();
        const namaAnggota = form.get('nama_anggota') as string;
        const fotoEmail = form.get('foto_anggota') as File;
        const email = form.get('email') as string;
        const nomorWa = form.get('nomor_wa') as string;

        const data = new FormData();
        data.append('nama_anggota' , namaAnggota);
        data.append('foto_anggota' , fotoEmail);
        data.append('email' , email);
        data.append('nomor_wa' , nomorWa);
        data.append('mesjid_id' , url);

        const result = await pb.collection('anggota_kurban').create(data);
        const response = "Mohon tunggu konfirmasinya pak!";
        if(result){
            return {
                message : response,
            }
        }
    }    
};