<script>
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { browser } from "$app/environment";
	/**
	 *
	 * @type {string}
	 */
	let selectedTheme;
	let showActiveTheme = () => {};
	if (browser) {
		const getStoredTheme = () =>
			window.localStorage.getItem("theme");

		/**
		 * @param {string} theme
		 */
		const setStoredTheme = (theme) =>
			window.localStorage.setItem("theme", theme);

		const getPreferredTheme = () => {
			const storedTheme = getStoredTheme();
			if (storedTheme) {
				return storedTheme;
			}

			return window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";
		};

		/**
		 * @param {string} theme
		 */
		const setTheme = (theme) => {
			if (
				theme === "auto" &&
				window.matchMedia(
					"(prefers-color-scheme: dark)",
				).matches
			) {
				document.documentElement.setAttribute(
					"data-bs-theme",
					"dark",
				);
			} else {
				document.documentElement.setAttribute(
					"data-bs-theme",
					theme,
				);
			}
			setStoredTheme(theme);
		};
		selectedTheme = getPreferredTheme();
		setTheme(selectedTheme);
		showActiveTheme = () => {
			if (selectedTheme === "dark") {
				selectedTheme = "light";
			} else {
				selectedTheme = "dark";
			}
			setTheme(selectedTheme);
		};
	}
</script>

<header class="text-center">
	<div class="corner">
		<a href="https://github.com/sytranvn/credit-calculator">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="bi bi-github {selectedTheme}"
				viewBox="0 0 16 16"
			>
				<path
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8"
				/>
			</svg>
		</a>
	</div>

	<nav>
		<ul>
			<li
				aria-current={$page.url.pathname === "/"
					? "page"
					: undefined}
			>
				<a href={`${base}/`}>Home</a>
			</li>
			<li
				aria-current={$page.url.pathname.includes(
					`${base}/about`,
				)
					? "page"
					: undefined}
			>
				<a href={`${base}/about`}>Công thức </a>
			</li>
			<li
				aria-current={$page.url.pathname.includes(
					`${base}/histogram`,
				)
					? "page"
					: undefined}
			>
				<a href={`${base}/histogram`}>Phổ điểm</a>
			</li>
		</ul>
	</nav>

	<button class="btn btn-sm" on:click={showActiveTheme}>
		{#if selectedTheme === "dark"}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-brightness-low-fill sun"
				viewBox="0 0 16 16"
			>
				<path
					d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8.5 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707m7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707M3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-moon-stars-fill moon"
				viewBox="0 0 16 16"
			>
				<path
					d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278"
				/>
				<path
					d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"
				/>
			</svg>
		{/if}
	</button>
</header>

<style>
	@import "bootstrap/scss/bootstrap.scss";
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	nav {
		display: flex;
		justify-content: center;
		background: var(--bs-secondary-bg);
		color: var(--bs-secondary-color);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}
	ul {
		--nav-tri-width: 0.5em;
		--nav-tri-height: 1.75em;
		&::before {
			border-bottom: var(--nav-tri-height) solid
				var(--bs-body-bg);
			border-left: var(--nav-tri-width) solid
				var(--bs-body-bg);
			content: " ";
			border-top: var(--nav-tri-height) solid transparent;
			border-right: var(--nav-tri-width) solid transparent;
		}
		&::after {
			border-top: var(--nav-tri-height) solid transparent;
			border-left: var(--nav-tri-width) solid transparent;
			content: " ";
			border-bottom: var(--nav-tri-height) solid
				var(--bs-body-bg);
			border-right: var(--nav-tri-width) solid
				var(--bs-body-bg);
		}
	}
	li[aria-current="page"]::before {
		--size: 6px;
		content: "";
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--bs-orange);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
	.sun {
		color: var(--bs-yellow);
	}
	.moon {
		color: var(--bs-dark);
	}
</style>
