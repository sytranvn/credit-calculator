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
	/**
	 * @type {"sample" | "cunhan" | "cunhan2"}
	 */
	let degree = dev ? "sample" : "cunhan";
	$: courses = data[degree].courses;
	$: flatCourses = courses?.flatMap(
		/** @param {any} c */ (c) => (c.select ? c.courses : [c])
	);
	$: average = avg(
		flatCourses?.filter(
			/** @param {Course} c */ (c) => c.score && c.score >= 5
		)
	);
	$: result = graduate(courses, data[degree].credit);
	$: displayCourses = getDisplayCourses(flatCourses, search);

	onMount(async () => {
		db = Db.instance;
		initialize();
		try {
			degree = (await db.getOne("degree", "current")).value;
		} catch {
			await db.insert("degree", {
				key: "current",
				value: degree,
			});
		}
		await syncScores();
	});
	/**
	 *@param {*} e
	 */
	async function saveScores(e) {
		db.update("scores", {
			code: e.detail.value.code,
			score: e.detail.value.score,
		});
	}
	async function syncScores() {
		await db.update("degree", {
			key: "current",
			value: degree,
		});
		for await (const c of courses) {
			if (!c.select) {
				await getScore(c);
			} else {
				for await (const cc of c.courses) {
					await getScore(cc);
				}
			}
		}
		courses = courses;
	}
	/**
	 * @param {Course} c
	 */
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
		/** @type {boolean | undefined} */
		let required = undefined;
		/** @type {number | undefined} */
		let cred = undefined;
		if (search.toLowerCase() === "bb") required = true;
		if (search.toLowerCase() === "tc") required = false;
		if (!isNaN(+search)) cred = +search;
		if (!search) return new Set(courses.map((c) => c.code));
		const codes = new Set(
			courses
				?.filter(
					(c) =>
						matchASCII(c.name, search) ||
						c.code.includes(search) ||
						c.required === required ||
						c.credit === cred
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
	<h1>Chào mừng bạn đến với ứng dụng tín điểm học phần</h1>
	<div class="mb-3 mt-3">
		<div class="input-group">
			<select
				class="input-group-text"
				bind:value={degree}
				on:change={syncScores}
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
				placeholder="search"
			/>
		</div>
	</div>
	<div class="result mb-3 mt-3">
		<div class="thumbnail">
			Tín chỉ đã tích lũy
			<div class="value">
				{result.credit}
			</div>
		</div>
		<div class="thumbnail">
			Điểm trung bình
			<div class="value">{average.toFixed(1)}</div>
		</div>
		<div class="thumbnail">
			Đủ điều kiện tốt nghiệp
			<div class="value">
				{result.pass ? "Đủ" : "Không"}
			</div>
		</div>
	</div>

	<table class="table table-hover">
		<thead>
			<tr>
				<th>Mã học phần</th>
				<th>Tên tên học phần</th>
				<th>Số tín chỉ</th>
				<th>Loại</th>
				<th>Điểm </th>
			</tr>
		</thead>
		<tbody>
			{#each courses as course, i}
				{#if course.select}
					<tr
						class="table-secondary"
						class:hidden={!course.courses.every(
							/** @param {Course} c */
							(c) =>
								displayCourses.has(
									c.code
								)
						)}
					>
						<th
							scope="rowgroup"
							colspan="5"
						>
							Chọn {course.select}
							tín chỉ từ các học phần sau:
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
						last={i + 1 === courses.length}
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
	</table>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;
		flex: 1 100%;
	}

	h1 {
		width: 100%;
	}
	/*
	th[scope="rowgroup"] {
		text-align: left;
	}
	table {
		border-collapse: collapse;
	}
	tfoot th {
		text-align: left;
	}
*/

	.hidden {
		display: none;
	}
	.thumbnail {
		@media only screen and (max-width: 768px) {
			padding: 1rem 0.3rem;
		}
		padding: 2rem 1.25rem;
		border: solid 1px #dee2e6;
		border-radius: 0.25rem;
		min-width: calc(100vw / 6);
		max-width: calc(100vw / 4);
		height: auto;
		font-weight: 600;
		text-align: center;
		background: var(--bs-secondary-bg);
		color: var(--bs-secondary-color);
	}
	.thumbnail .value {
		@media only screen and (max-width: 768px) {
			font-size: 1.6rem;
		}
		font-size: 2rem;
	}
	.result {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 1rem;
		max-width: 64rem;
	}
</style>
