<script>
	import { createEventDispatcher } from "svelte";

	/**
	 * @type{import('$lib/types/course').Course}
	 */
	export let course;
	const dispatch = createEventDispatcher();
	function change() {
		dispatch("change", { value: course });
	}
</script>

<tr>
	<td>{course.code}</td>
	<td>{course.name}</td>
	<td>{course.credit}</td>
	{#if course.required}
		<td>BB</td>
	{:else}
		<td>TC</td>
	{/if}
	<td>
		<input
			type="number"
			bind:value={course.score}
			min="0"
			max="10"
			on:change={change}
		/>
	</td>
</tr>

<style>
</style>
