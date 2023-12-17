<script>
	import { createEventDispatcher } from "svelte";

	const statusMap = { "": "", inprogress: "warning", passed: "success" };
	/**
	 * @type{import('$lib/types/course').Course}
	 */
	export let course;
	export let last = false;
	export let hidden = false;
	/** @type {"" | "inprogress" | "passed"} */
	export let status = "";
	$: statusCls = statusMap[status];
	$: error = course.score && (course.score < 0 || course.score > 10);
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
			class:error
			type="number"
			bind:value={course.score}
			min="0"
			max="10"
			on:input={change}
		/>
	</td>
	<td>
		<span class={statusCls}>{status}</span>
	</td>
</tr>

<style>
	.last {
		border-bottom: solid 5px var(--bs-border-color-translucent);
	}
	.hidden {
		display: none;
	}
	.error {
		border: 1px solid red;
	}
</style>
