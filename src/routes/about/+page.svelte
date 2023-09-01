<script>
	import Math from "$lib/components/Math.svelte";
	import "katex/dist/katex.min.css";
	import formula from "./formula.tex?raw";
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>About this app</h1>

	<p>
		Score formula:
		<Math source={formula} />
	</p>
	<p>
		This is a <a href="https://kit.svelte.dev">SvelteKit</a> app. You
		can make your own by typing the following into your command line
		and following the prompts:
	</p>

	<pre>npm create svelte@latest</pre>
</div>
