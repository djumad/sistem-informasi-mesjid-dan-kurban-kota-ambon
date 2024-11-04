<script lang="ts">
    import "../app.css";
</script>


<svelte:head>
    <title>Kurban</title>
</svelte:head>

<div class="bg-blue-800 text-white p-4 rounded-full mb-4  shadow-md w-11/12 mx-auto fixed top-3 left-1/2 transform -translate-x-1/2 z-50">
    <div class="flex justify-center space-x-4">
        <a href="/" class="hover:underline">Beranda</a>
        <a href="/" class="hover:underline">Tentang Kami</a>
        <a href="/mesjid" class="hover:underline">Pendaftaran Mesjid</a>
    </div>
</div>

<div class="mt-16">
    <slot />
</div>