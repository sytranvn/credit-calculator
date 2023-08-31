<script>
	import { PUBLIC_DATA } from "$env/static/public";
	import CourseRow from "$lib/components/CourseRow.svelte";
	import { Db } from "$lib/utils/db.js";
	import { avg, graduate } from "$lib/utils/score.js";
	import { matchASCII } from "$lib/utils/searching.js";
	import { onMount } from "svelte";

	const sample = PUBLIC_DATA === "sample";
	export let data;
	/** @type Db */
	let db;
	let search = "";
	$: flatCourses = data.courses.flatMap((c) =>
		c.select ? c.courses : [c]
	);
	$: average = avg(flatCourses);
	$: result = graduate(data.courses);
	$: displayCourses = getDisplayCourses(flatCourses, search);

	onMount(async () => {
		db = Db.instance;
		for await (const c of data.courses) {
			if (!c.select) {
				await getScore(c);
			} else {
				for await (const cc of c.courses) {
					await getScore(cc);
				}
			}
		}
		data.courses = data.courses;
	});
	async function saveScores(e) {
		db.update("scores", {
			code: e.detail.value.code,
			score: e.detail.value.score,
		});
	}
	async function getScore(c) {
		const score = await Db.instance.getOne("scores", c.code);
		c.score = score?.score;
	}

	/**
	 * @typedef {import('$lib/types/course.js').Course} Course
	 * @param {Course[]} courses
	 * @param {string} search
	 */
	function getDisplayCourses(courses, search) {
		if (!search) return;
		const reg = new RegExp(search);
		return courses
			?.filter(
				(c) =>
					matchASCII(c.name, search) ||
					c.code.includes(search)
			)
			.reduce((included, c) => {
				included[c.code] = true;
				return included;
			}, {});
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Credit calculator app" />
</svelte:head>

<section>
	<h1>{data.message}</h1>
	<!--
	<select name="school">
		<option value="KHTN">KHTN</option>
	</select>
	<select name="specialization">
		<option value="CNTT">CNTT</option>
	</select>
	-->
	<input type="text" bind:value={search} placeholder="search" />
	<table>
		<thead>
			<tr>
				{#if sample}
					<th>Code</th>
					<th>Name</th>
					<th>Cre</th>
					<th>Required</th>
					<th>Score</th>
				{:else}
					<th>Mã học phần</th>
					<th>Tên tên học phần</th>
					<th>Số tín chỉ</th>
					<th>Loại học phần</th>
					<th>Điểm </th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each data.courses as course, i}
				{#if course.select}
					<tr>
						<th
							scope="rowgroup"
							colspan="4"
						>
							{#if sample}
								Select {course.select}
								of following
							{:else}
								Chọn {course.select}
								tín chỉ từ các học
								phần sau:
							{/if}
						</th></tr
					>
					{#each course.courses as optCourse, index}
						<CourseRow
							last={index + 1 ===
								course.courses
									.length}
							hidden={displayCourses &&
								!displayCourses[
									optCourse
										.code
								]}
							bind:course={optCourse}
							on:change={saveScores}
						/>
					{/each}
				{:else}
					<CourseRow
						last={i + 1 ===
							data.courses.length}
						bind:course
						hidden={displayCourses &&
							!displayCourses[
								course.code
							]}
						on:change={saveScores}
					/>
				{/if}
			{/each}
		</tbody>
		<tfoot>
			<th colspan="2">Total:</th>
			<th colspan="2">{result.credit}</th>
			<th>{average.toFixed(2)}</th>
		</tfoot>
	</table>
	<h2>{result.msg}</h2>
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
	table {
		border-collapse: collapse;
	}
	tfoot > :first-child {
		text-align: left;
	}
</style>
