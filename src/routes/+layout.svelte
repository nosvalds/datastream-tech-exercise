<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import datastreamIcon from '$lib/assets/datastream-main.svg';
	import socialIcons from '$lib/assets/icons.social.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="flex items-center bg-[#152d42]">
	<a href="/"><img src={datastreamIcon} alt="Datastream Icon" class="m-4 h-10 invert" /></a>
	<h1 class="mt-3 text-2xl font-bold text-white">Data Analyzer</h1>
</header>

{@render children?.()}

<footer class="flex justify-between bg-[#152d42]">
	<p class="ml-4 p-2 text-white">© 2025</p>
	<a class="mr-4 p-2" href="https://github.com/nosvalds/datastream-tech-exercise" target="_blank">
		<img alt="GitHub" height="24" src={socialIcons + '#github'} width="24" class="invert" />
	</a>
</footer>
