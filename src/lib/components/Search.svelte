<script>
	import { dev } from "$app/environment";
	import { createEventDispatcher } from "svelte";

	export let degree = "";
	export let search = "";

	const dispatch = createEventDispatcher();
	function changeSearch() {
		dispatch("change", { value: search });
	}
	function changeDegree() {
		dispatch("change", { value: degree });
	}
</script>

<div class="mb-3 mt-3">
	<div class="input-group">
		<select
			class="input-group-text"
			bind:value={degree}
			on:change={changeDegree}
			name="specialization"
		>
			{#if dev}
				<option value="sample">Sample</option>
			{/if}
			<option value="cunhan">Cử nhân</option>
			<option value="cunhan2">Cử nhân 2</option>
		</select>
		<input
			class="form-control"
			type="text"
			bind:value={search}
			on:input={changeSearch}
			placeholder="search"
		/>
	</div>
</div>
