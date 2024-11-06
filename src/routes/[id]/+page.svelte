<script lang="ts">
    export let data;
    const mesjid = data.getMesjid;
    const kelompok = data.kelompokWithAnggota;
    const totalSetoranSemuaKelompok = data.totalSetoranSemuaKelompok;
    const anggotaKelompok = kelompok.map(data => {
        return data.anggota.anggotaKelompok;
    });

    console.log(anggotaKelompok);
    let isOpen = false;
    let showHistoryModal = false;
    let selectedSetoran: any = null;
    let selectedAnggota: any = null;

    function openModal(setoran : any) {
        selectedSetoran = setoran;
        isOpen = true;
    }

    function closeModal() {
        isOpen = false;
        selectedSetoran = null;
    }

    function openHistoryModal(anggota : any) {
        selectedAnggota = anggota;
        showHistoryModal = true;
    }

    function closeHistoryModal() {
        showHistoryModal = false;
        selectedAnggota = null;
    }
</script>

<div class="max-w-7xl mx-auto p-4"> 
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

    <h3 class="text-xl font-semibold mb-4">Anggota Penyelengara Kurban:</h3>
    {#if kelompok.length > 0}
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {#each kelompok as kel}
                <li class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="p-4">
                        <p class="text-lg font-medium">Nama Kelompok: {kel.nama_kelompok}</p>
                        <p>Kategori Hewan Kurban: <span class="font-bold">{kel.kategori}</span></p>
                        {#if kel.status === "ketua_kelompok" }
                            <p>Status: <span class="font-bold">Ketua Kelompok</span></p>
                        {/if}
                        {#if kel.anggota}
                            <div class="mt-4">
                                <p>Nama: {kel.anggota.nama_lengkap}</p>
                                <p>Total Setoran: <span class="font-bold">Rp.{kel.anggota.totalSetoranAnggota.toLocaleString()}</span></p>

                                <button class="mt-2 px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700" on:click={() => openHistoryModal(kel.anggota)}>
                                    Lihat History Setoran
                                </button>
                            </div>
                        {/if}
                        
                        <p class="mt-4 text-blue-600">Total Setoran Kelompok: Rp {kel.jumlah_uang_setoran.toLocaleString()}</p>
                    </div>
                    <form action="?/gabungKelompok" method="post">
                        <button class="bg-blue-600 p-2 m-2 rounded-md text-white">Bergabung {kel.nama_kelompok}</button>
                    </form>
                </li>
            {/each}
        </ul>
        <div class="mt-6 text-2xl font-bold">
            Total Setoran Semua Kelompok: Rp {totalSetoranSemuaKelompok.toLocaleString()}
        </div>
    {:else}
        <p class="text-gray-500">Tidak ada anggota yang terdaftar.</p>
    {/if}

    {#if isOpen}
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
                <h2 class="text-xl font-bold mb-4">Rincian Setoran</h2>
                {#if selectedSetoran}
                    <p>Jumlah Setoran: Rp {selectedSetoran.jumlah_setoran.toLocaleString()}</p>
                    <p>Tanggal: {new Date(selectedSetoran.created).toLocaleDateString()}</p>
                    <p>Status: {selectedSetoran.disetujui ? 'Disetujui' : 'Pending'}</p>
                {/if}
                <button class="mt-4 px-4 py-2 bg-red-500 text-white rounded" on:click={closeModal}>Tutup</button>
            </div>
        </div>
        {/if}

    {#if showHistoryModal}
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
                <h2 class="text-xl font-bold mb-4">History Setoran Anggota: {selectedAnggota?.nama_lengkap}</h2>
                {#if selectedAnggota}
                    <ul>
                        {#each selectedAnggota.setoran as s}
                            <li class="border-b py-2">
                                <p>Jumlah Setoran: Rp {s.jumlah_setoran.toLocaleString()}</p>
                                <p>Tanggal: {new Date(s.created).toLocaleDateString()}</p>
                                <p>Status: {s.disetujui ? 'tervalidasi' : 'Pending'}</p>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <p>Tidak ada history setoran.</p>
                {/if}
                <button class="mt-4 px-4 py-2 bg-red-500 text-white rounded" on:click={closeHistoryModal}>Tutup</button>
            </div>
        </div>
    {/if}
</div>
