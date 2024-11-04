<script lang="ts">
    let nama_mesjid = '';
    let lokasi_mesjid = '';
    let foto_mesjid: File | null = null;
  
    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        foto_mesjid = target.files[0];
      }
    };
</script>
  
<div class="mt-16 flex items-center justify-center min-h-screen">
    <div class="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Daftar Mesjid</h2>
        <form method="post" enctype="multipart/form-data" class="space-y-6">
            <div>
                <label class="block text-sm font-medium text-gray-700">Nama Mesjid</label>
                <input 
                    type="text" 
                    name="nama_mesjid" 
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    placeholder="Masukkan nama mesjid" 
                    bind:value={nama_mesjid}
                    required
                />
            </div>
    
            <div>
                <label class="block text-sm font-medium text-gray-700">Foto Mesjid</label>
                <input 
                    type="file" 
                    name="foto_mesjid" 
                    class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
                    on:change={handleFileChange}
                    required
                />
            </div>
    
            <div>
                <label class="block text-sm font-medium text-gray-700">Lokasi Mesjid</label>
                <input 
                    type="text" 
                    name="lokasi_mesjid" 
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    placeholder="Masukkan lokasi mesjid" 
                    bind:value={lokasi_mesjid}
                    required
                />
            </div>
    
            <div class="text-center">
                <button 
                    type="submit" 
                    class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Daftar Mesjid
                </button>
            </div>
            <div class="text-center mt-4">
                <a href="/" class="text-indigo-600 hover:underline">Kembali</a>
            </div>
        </form>
    </div>
</div>

