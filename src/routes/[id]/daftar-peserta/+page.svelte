<script lang="ts">
    export let data;
    const url = data.url;

    let nama_anggota = '';
    let foto_anggota: File | null = null;
    let nomor_wa = '';
    let email = '';

    const handleFileChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            foto_anggota = target.files[0];
        }
    };
</script>


<div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4 text-center">Daftar Peserta</h2>
    <form method="post"  enctype="multipart/form-data" class="space-y-4">
        <div>
            <label for="nama_anggota" class="block text-sm font-medium text-gray-700">Nama Anggota</label>
            <input
                type="text"
                name="nama_anggota"
                id="nama_anggota"
                required
                bind:value={nama_anggota}
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Masukkan nama anggota"
            />
        </div>

        <div>
            <label for="foto_anggota" class="block text-sm font-medium text-gray-700">Foto Anggota</label>
            <input
                type="file"
                name="foto_anggota"
                id="foto_anggota"
                required
                on:change={handleFileChange}
                class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
        </div>

        <div>
            <label for="nomor_wa" class="block text-sm font-medium text-gray-700">Nomor WA</label>
            <input
                type="tel"
                name="nomor_wa"
                id="nomor_wa"
                required
                bind:value={nomor_wa}
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Masukkan nomor WA"
            />
        </div>

        <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                required
                bind:value={email}
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Masukkan email"
            />
        </div>

        <div class="text-center">
            <button
                type="submit"
                class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Daftar Peserta
            </button>
        </div>
    </form>

    <div class="text-center mt-4">
        <a href={`/${url}`} class="text-indigo-600 hover:underline">Kembali</a>
    </div>
</div>
