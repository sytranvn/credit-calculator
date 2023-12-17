<script>
	import { rating } from "$lib/utils/score";
	import Thumbnail from "./Thumbnail.svelte";

	export let result = {};
	export let credit = 0;
	export let average = 0;
</script>

<div class="result mb-3 mt-3">
	<Thumbnail
		title="Tín chỉ đã tích lũy"
		value={`${result.credit}/${credit}`}
	/>
	<Thumbnail title="Điểm trung bình" value={average.toFixed(1)} />
	<Thumbnail
		title="Xếp loại"
		value={result.pass ? rating(average, "A+") : "-"}
	/>
</div>

<style>
	.result {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 1rem;
		max-width: 64rem;
	}
</style>
