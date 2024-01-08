<script>
	import Histogram from "$lib/components/Histogram.svelte";
	export let data;
	/**
	 * @type {string}
	 */
	let mon;
	/** @type {typeof data.hkdata[number] | undefined } */
	let mondata;
	$: mondata = data.hkdata.find((m) => m.mon === mon);
	/** @type {import("chart.js").ChartData} */
	let chartData;
	$: chartData = {
		labels: mondata?.data.map((_, i) => i) || [],
		datasets: [
			{
				data: mondata?.data || [],
				label: mondata?.ten || "",
			},
		],
	};
</script>

<svelte:head>
	<title>Histogram</title>
	<meta
		name="description"
		content="Phổ điểm môn học học kỳ 2 năm học 2022-2023"
	/>
</svelte:head>

<h1>Phổ điểm môn học học kỳ 2 năm học 2022-2023</h1>
<select class="form-select" bind:value={mon}>
	{#each data.hkdata as mon}
		<option value={mon.mon}>{mon.ten}</option>
	{/each}
</select>

<Histogram data={chartData} options={{}} />
