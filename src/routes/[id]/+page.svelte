<script lang="ts">
    export let data;
    const mesjid = data.getUser;

    const anggotaMesjid = data.anggotaMesjid.filter((anggota: any) => anggota.izin === true); 
</script>

<div class="max-w-4xl mx-auto p-4">
    
    <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <img 
            src="http://127.0.0.1:8090/api/files/{mesjid.collectionId}/{mesjid.id}/{mesjid.foto_mesjid}" 
            alt="Foto Mesjid {mesjid.nama_mesjid}" 
            class="w-full h-64 object-cover"
        />
        <div class="p-6">
            <h2 class="text-2xl font-bold mb-2">{mesjid.nama_mesjid}</h2>
            <p class="text-gray-700">Lokasi: {mesjid.lokasi_mesjid}</p>
        </div>
    </div>
    <div class="flex justify-between mb-4">
        <a href="/{mesjid.id}/daftar-peserta" class="inline-block px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition">
            Daftar Peserta Mesjid
        </a>
    </div>
    <h3 class="text-xl font-semibold mb-4">Anggota Penyelengara Kurban:</h3>
    {#if anggotaMesjid.length > 0}
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each anggotaMesjid as anggota}
                <li class="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                        src="http://127.0.0.1:8090/api/files/{anggota.collectionId}/{anggota.id}/{anggota.foto_anggota}" 
                        alt="Foto Anggota {anggota.nama_anggota}" 
                        class="w-full h-40 object-cover"
                    />
                    <div class="p-4">
                        <p class="text-lg font-medium">{anggota.nama_anggota}</p>
                    </div>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-gray-500">Tidak ada anggota yang terdaftar.</p>
    {/if}
</div>
