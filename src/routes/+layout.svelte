<script lang="ts">
	import '../app.css';
	export let data;
	const user = data.locals.user;
</script>

<svelte:head>
	<title>Kurban</title>
</svelte:head>

<div
	class="bg-blue-800 text-white p-4 rounded-full mb-4 shadow-md w-11/12 mx-auto fixed top-3 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between"
>
	<!-- Menu Links -->
	<div class="flex space-x-6">
		<a href="/" class="hover:underline text-white">Beranda</a>
		<a href="/" class="hover:underline text-white">Tentang Kami</a>
		<a href="/mesjid" class="hover:underline text-white">Pendaftaran Mesjid</a>
	</div>

	<!-- User Profile -->
	{#if user}
		<div class="flex items-center space-x-3">
			<div class="w-10 h-10">
				<img
					src="http://127.0.0.1:8090/api/files/{user.collectionId}/{user.id}/{user.foto}"
					alt="User Profile"
					class="w-full h-full rounded-full border-2 border-white object-cover"
				/>
			</div>
			<!-- Email hanya muncul di layar yang lebih besar dari "sm" -->
			<p class="text-white font-medium hidden sm:block">{user.email}</p>
		</div>
	{/if}
</div>

<div class="mt-20">
	<slot />
</div>
