<script lang="ts">
	let email = '';
	let password = '';

	export let data;
	const user = data.locals?.user;
	if (user) {
		console.log(user);
	}
    export let form;
    const formError = form?.errors;
</script>

<div class="mt-16 flex items-center justify-center min-h-screen">
	{#if !user}
		<div class="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
			<h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
            {#if formError }
                <p>{formError}</p>
            {/if}
			<form method="post" action="?/login" class="space-y-6">
				<div>
					<label class="block text-sm font-medium text-gray-700">Email</label>
					<input
						type="email"
						name="email"
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						placeholder="Masukkan email"
						bind:value={email}
						required
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700">Password</label>
					<input
						type="password"
						name="password"
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						placeholder="Masukkan password"
						bind:value={password}
						required
					/>
				</div>

				<div class="text-center">
					<button
						type="submit"
						class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Login
					</button>
				</div>
				<div class="text-center mt-4">
					<a href="/registrasi" class="text-indigo-600 hover:underline"
						>Belum punya akun? Daftar di sini</a
					>
				</div>
			</form>
		</div>
	{:else}
		<div class="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
			<div>
					<img
						src="http://127.0.0.1:8090/api/files/{user.collectionId}/{user.id}/{user.foto}"
						alt=""
					/>
				</div>

				<div class="text-center">
					<p class="block text-sm font-medium text-gray-700">{user.email}</p>
				</div>

				<div class="text-center">
					<p class="block text-sm font-medium text-gray-700">{user.nama}</p>
				</div>
                <form action="?/logout" method="post">
                    <button type="submit">Logout</button>
                </form>
		</div>
	{/if}
</div>
