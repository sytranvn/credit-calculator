<script>
	import { dev } from "$app/environment";
	import CourseRow from "$lib/components/CourseRow.svelte";
	import { Db } from "$lib/utils/db.js";
	import { avg, graduate } from "$lib/utils/score.js";
	import { matchASCII } from "$lib/utils/searching.js";
	import { onMount } from "svelte";
	import { initialize } from "$lib/utils/firebase.js";
	import Result from "$lib/components/Result.svelte";
	import Search from "$lib/components/Search.svelte";

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
		/** @param {any} c */ (c) => (c.select ? c.courses : [c]),
	);
	$: average = avg(
		flatCourses?.filter(
			/** @param {Course} c */ (c) => c.score && c.score >= 5,
		),
	);
	$: result = graduate(courses, data[degree].credit);
	$: displayCourses = getDisplayCourses(flatCourses, search);

	onMount(async () => {
		db = Db.instance;
		initialize();
		try {
			degree = (await db.getOne("info", "current")).value;
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
						c.credit === cred,
				)
				.map((c) => c.code),
		);
		return codes;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta
		name="description"
		content="Ứng dụng tính điểm học phần trường Đại học Khoa Học Tự Nhiên hệ Đào tạo từ xa"
	/>
</svelte:head>

<section>
	<h1>Chào mừng bạn đến với ứng dụng tính điểm học phần</h1>
	<Search bind:degree bind:search on:change:degree={syncScores} />
	<Result {result} credit={data[degree].credit} {average} />

	<table class="table table-hover">
		<thead>
			<tr>
				<th>Mã học phần</th>
				<th>Tên</th>
				<th>Tín chỉ</th>
				<th>Loại</th>
				<th>Điểm </th>
				<th />
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
									c.code,
								),
						)}
					>
						<th
							scope="rowgroup"
							colspan="6"
						>
							Hoàn thành {course.courses.reduce(
								/**
								 * @param {number} cr
								 * @param {Course} c
								 */
								(cr, c) =>
									c.score >=
									5
										? cr +
											c.credit
										: cr,
								0,
							)}/{course.select}
							tín chỉ từ các học phần sau:
						</th></tr
					>
					{#each course.courses as optCourse, index}
						<CourseRow
							last={index + 1 ===
								course.courses
									.length}
							hidden={!displayCourses.has(
								optCourse.code,
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
							course.code,
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

	.hidden {
		display: none;
	}
</style>
