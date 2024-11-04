<script lang="ts">
    export let data;
    const mesjid = data.mesjid.filter((item: any) => item.status === true);
    const anggota = data.anggota;

    const getAnggotaByMesjid = (mesjidId: string) => {
        return anggota.filter(anggota => anggota.mesjid_id === mesjidId && anggota.izin === true);
    };

</script>
<div class="max-w-6xl mx-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each mesjid as item}
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="http://127.0.0.1:8090/api/files/{item.collectionId}/{item.id}/{item.foto_mesjid}" alt="Foto Mesjid" class="w-full h-48 object-cover">
                
                <div class="p-4">
                    <h3 class="text-xl font-semibold mb-2">{item.nama_mesjid}</h3>
                    <p class="text-gray-700 mb-2">{item.lokasi_mesjid}</p>
                    <p class="text-gray-600 mb-4">Jumlah anggota yang disetujui: {getAnggotaByMesjid(item.id).length}</p>
                    
                    <a href="/{item.id}" class="inline-block px-4 py-2 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700 transition">
                        Detail Mesjid
                    </a>
                </div>
            </div>
        {/each}
    </div>
</div>
