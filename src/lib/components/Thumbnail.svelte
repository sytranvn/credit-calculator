<script>
	export let title = "";
	export let value = "";
</script>

<div class="thumbnail">
	{title}
	<div class="value">
		{value}
	</div>
</div>

<style>
	.thumbnail {
		@media only screen and (max-width: 768px) {
			padding: 1rem 0.3rem;
		}
		padding: 2rem 1.25rem;
		border: solid 1px #dee2e6;
		border-radius: 0.25rem;
		min-width: calc(100vw / 6);
		max-width: calc(100vw / 4);
		height: auto;
		font-weight: 600;
		text-align: center;
		background: var(--bs-secondary-bg);
		color: var(--bs-secondary-color);
	}
	.thumbnail .value {
		@media only screen and (max-width: 768px) {
			font-size: 1.6rem;
		}
		font-size: 2rem;
	}
</style>
