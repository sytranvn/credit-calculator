<script>
	import CourseRow from "$lib/components/CourseRow.svelte";
	import { CourseGroup } from "$lib/types/course.js";
	import { getIndexedDB, upsert as upsert } from "$lib/utils/db.js";
	import { avg, graduate } from "$lib/utils/score.js";

	export let data;
	$: average = avg(
		data.courses.flatMap((c) => (c.select ? c.courses : [c]))
	);
	async function saveScores() {
		console.info("Saving scores");
		const db = await getIndexedDB();
		const transaction = db.transaction(["scores"], "readwrite");
		transaction.oncomplete = () => console.log("Done");
		const scoresStore = transaction.objectStore("scores");
		data.courses.forEach((c) => {
			if (c instanceof CourseGroup) {
				c.courses.forEach((cc) => {
					upsert(scoresStore, {
						code: cc.code,
						score: cc.score,
					});
				});
			} else {
				upsert(scoresStore, {
					code: c.code,
					score: c.score,
				});
			}
		});
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Credit calculator app" />
</svelte:head>

<section>
	<h1>Chào mừng bạn đến với ứng dụng tín số tín chỉ</h1>
	<select name="school">
		<option value="KHTN">KHTN</option>
	</select>
	<select name="specialization">
		<option value="CNTT">CNTT</option>
	</select>
	<table>
		<thead>
			<tr>
				<th>Mã học phần</th>
				<th>Tên tên học phần</th>
				<th>Số tín chỉ</th>
				<th>Loại học phần</th>
				<th>Điểm </th>
			</tr>
		</thead>
		<tbody>
			{#each data.courses as course}
				{#if course.select}
					<tr>
						<th
							scope="rowgroup"
							colspan="4"
						>
							Chọn {course.select} tín
							chỉ từ các học phần sau:
						</th></tr
					>
					{#each course.courses as optCourse}
						<CourseRow
							bind:course={optCourse}
						/>
					{/each}
				{:else}
					<CourseRow
						bind:course
						on:change={saveScores}
					/>
				{/if}
			{/each}
		</tbody>
		<tfoot>
			<td colspan="4">Total:</td>
			<td>{average.toFixed(2)}</td>
		</tfoot>
	</table>
	{#if graduate(data.courses)}
		<h2>Congratulation!!!!</h2>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
	th[scope="rowgroup"] {
		text-align: left;
	}
</style>
