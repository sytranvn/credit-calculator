<script>
	import Header from "./Header.svelte";
	import "./styles.css";
	import { browser } from "$app/environment";
	import { fade } from "svelte/transition";
	let hidden = true;
	if (browser) {
		window.addEventListener("scroll", toggleBackToTop);
		function toggleBackToTop() {
			if (getScroll() > 200) {
				hidden = false;
			} else hidden = true;
		}
	}
	function getScroll() {
		return (
			document.body.scrollTop ||
			(document.documentElement &&
				document.documentElement.scrollTop) ||
			0
		);
	}
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	{#if !hidden}
		<button
			id="back-to-top"
			on:click={() =>
				window.scrollTo({ top: 0, behavior: "smooth" })}
			aria-label="back to top"
			transition:fade={{ delay: 100, duration: 300 }}
		>
			<svg viewBox="0 0 24 24"
				><path
					d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
				/></svg
			>
		</button>
	{/if}
	<footer>
		<p>
			© MIT -
			<a href="/terms-of-services">Terms of Services</a>
		</p>
		<p>
			Powered by
			<a href="https://kit.svelte.dev">kit.svelte.dev</a> and
			<a href="https://getbootstrap.com">Bootstrap</a>
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
	#back-to-top {
		--size: 40px;
		-webkit-text-size-adjust: 100%;
		word-wrap: break-word;
		text-rendering: optimizeLegibility;
		-webkit-box-direction: normal;
		box-sizing: border-box;
		border: 0;
		font: inherit;
		font-size: 100%;
		margin: 0;
		padding: 0;
		background: #000;
		border-radius: 50%;
		bottom: 20px;
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
		color: #fff;
		cursor: pointer;
		display: block;
		height: var(--size);
		width: var(--size);
		opacity: 1;
		outline: 0;
		position: fixed;
		right: 20px;
		-webkit-tap-highlight-color: transparent;
		transition: bottom 0.2s, opacity 0.2s;
		user-select: none;
		z-index: 100;
	}
	#back-to-top path {
		fill: currentColor;
	}
</style>
