<script>
	import Math from "$lib/components/Math.svelte";
	import "katex/dist/katex.min.css";
	import formula from "./formula.tex?raw";
	import credit from "./credit.tex?raw";
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-center">
	<h1>Công thức</h1>
</div>
<div class="grid mt-3 mb-3 m-auto">
	<p>
		<Math source={formula} />
	</p>
	<p>
		<Math source="A" /> là điểm trung bình chung <br />
		<Math source="a_i" /> là điểm của học phần thứ <Math
			source="i"
		/>;
		<Math source="a_i \geq 5" /><br />
		<Math source="N" /> là tổng số học phần <br />
		<Math source="n_i " /> là số tín chỉ của học phần thứ <Math
			source="i"
		/> <br />
	</p>
</div>
