<script>
	import { createEventDispatcher } from "svelte";

	/**
	 * @type{import('$lib/types/course').Course}
	 */
	export let course;
	export let last = false;
	export let hidden = false;
	const dispatch = createEventDispatcher();
	function change() {
		dispatch("change", { value: course });
	}
</script>

<tr class:last class:hidden>
	<td class:last>{course.code}</td>
	<td class:last>{course.name}</td>
	<td class:last>{course.credit}</td>
	{#if course.required}
		<td class:last>BB</td>
	{:else}
		<td class:last>TC</td>
	{/if}
	<td class:last>
		<input
			type="number"
			bind:value={course.score}
			min="0"
			max="10"
			on:input={change}
		/>
	</td>
</tr>

<style>
	.last {
		border-bottom: solid 1px black;
	}
	.hidden {
		display: none;
	}
</style>
