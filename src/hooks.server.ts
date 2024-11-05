import { pb } from "$lib";
import type { Handle } from "@sveltejs/kit";

export const handle : Handle = async({resolve , event})=>{
    const token = event.cookies.get("token");
    if(token){
        event.locals.user = {
            email : pb.authStore.model.email,
            nama : pb.authStore.model.nama_lengkap,
            foto : pb.authStore.model.foto,
            collectionId : pb.authStore.model.collectionId,
            id : pb.authStore.model.id
        }
    }
    return resolve(event);
}