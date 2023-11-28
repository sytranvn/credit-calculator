<script>
	import { Chart } from "chart.js/auto";
	/** @type {import("chart.js").ChartData} */
	export let data;
	/** @type {import("chart.js").ChartOptions} */
	export let options;
	/** @type {HTMLCanvasElement} */
	let canvasElement;
	/** @type {any} */
	/** @type {Chart} */
	let chart;
	/** @param {any} _ */
	const render = (_) => {
		if (chart) chart.destroy();
		/** @type {import("chart.js").ChartConfiguration} */
		const config = {
			type: "bar",
			data,
			options,
		};
		if (canvasElement) chart = new Chart(canvasElement, config);
	};
	$: render(data);
</script>

<canvas bind:this={canvasElement} />
