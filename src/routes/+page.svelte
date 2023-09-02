<script>
	import { dev } from "$app/environment";
	import CourseRow from "$lib/components/CourseRow.svelte";
	import { Db } from "$lib/utils/db.js";
	import { avg, graduate } from "$lib/utils/score.js";
	import { matchASCII } from "$lib/utils/searching.js";
	import { onMount } from "svelte";
	import { initialize } from "$lib/utils/firebase.js";

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
		if (!dev) {
			initialize();
		}
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
		if (!search) return new Set(courses.map((c) => c.code));
		const codes = new Set(
			courses
				?.filter(
					(c) =>
						matchASCII(c.name, search) ||
						c.code.includes(search)
				)
				.map((c) => c.code)
		);
		return codes;
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
				{#if dev}
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
					<tr
						class:hidden={!course.courses.every(
							(c) =>
								displayCourses.has(
									c.code
								)
						)}
					>
						<th
							scope="rowgroup"
							colspan="4"
						>
							{#if dev}
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
							hidden={!displayCourses.has(
								optCourse.code
							)}
							bind:course={optCourse}
							on:change={saveScores}
						/>
					{/each}
				{:else}
					<CourseRow
						last={i + 1 ===
							data.courses.length}
						bind:course
						hidden={!displayCourses.has(
							course.code
						)}
						on:change={saveScores}
					/>
				{/if}
			{/each}
			{#if !displayCourses.size}
				<tr>
					<td colspan="5"
						>Không tìm thấy học phần</td
					>
				</tr>
			{/if}
		</tbody>
		<tfoot>
			<th>Total:</th>
			<th>{result.msg}</th>
			<th>{result.credit}</th>
			<th />
			<th>{average.toFixed(2)}</th>
		</tfoot>
	</table>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;
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
	tfoot th {
		text-align: left;
	}

	input {
		border-collapse: collapse;
		/* color-scheme: dark; */
		--sk-text-1: black;
		--sk-back-2: white;
		--sk-back-3: grey;

		box-sizing: inherit;
		-webkit-tap-highlight-color: hsla(var(--sk-theme-1-hsl), 0.1);
		margin: 0;
		transition-property: background, background-color,
			background-image, border;
		border: none;
		border-bottom: 1px solid var(--sk-back-3);
		background: var(--sk-back-2);
		color: var(--sk-text-1);
		flex-shrink: 0;
		padding: 1rem 1rem 0.5rem 1rem;
		font-family: inherit;
		font-size: 1rem;
		pointer-events: all;
		margin-bottom: 1rem;
	}
	.hidden {
		display: none;
	}
</style>
