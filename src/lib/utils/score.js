import { CourseGroup, Course, TOTAL_CREDIT_REQUIRED } from "$lib/types/course"

/**
 * $$
 * A = \frac{\displaystyle\sum_{i = 1}^n{a_i \times n_i}}{\displaystyle\sum_{i=1}^n{n_i}}
 * $$
 * @param {Course[]} courses
 */
export function avg(courses) {
	const result = courses.filter(c => c.score).reduce((result, course) => {
		result.score = result.score + course.score * course.credit
		result.credit = result.credit + course.credit
		return result
	}, { score: 0, credit: 0 })
	if (result.credit === 0) return 0;
	return result.score / result.credit
}

/**
 * Convert 10.0 grading to 4.0 or ABCD grading
 * @param {number} score
 * @param {(4|'A'|'A+'|'G')} type
 * @returns {string|number}
 */
export function rating(score, type) {
	if (type === 4) {
		if (score < 5) return score / 5;
		return ((score - 5) / 5) + 1;
	}
	if (type === 'A') {
		if (score >= 8) return 'A';
		if (score >= 6.5) return 'B';
		if (score >= 5) return 'C';
		if (score >= 4) return 'D';
		return 'F';
	}
	if (type === 'A+') {
		if (score >= 9) return 'A+';
		if (score >= 8) return 'A';
		if (score >= 7) return 'B+';
		if (score >= 6) return 'B';
		if (score >= 5) return 'C';
		return 'F';

	}
	return score
}

/**
 * @param {CourseGroup} group
 */
function graduateCourseGroup(group) {
	const { select, courses } = group
	const credit = courses.filter(course => course.score && course.score > 5).reduce((sum, c) => sum + c.credit, 0)
	return { passed: credit >= select, credit }
}

/**
 * @param {Array<Course|CourseGroup>} courses
 *
 */
export function graduate(courses) {
	let ttCredit = 0
	let allPassed = true;
	let msg = "Congratulation!!";
	for (const course of courses) {
		if (course instanceof CourseGroup) {
			const { credit, passed } = graduateCourseGroup(course)
			if (!passed) {
				allPassed = false;
				msg = "Not enough optional credit"
			}
			ttCredit += credit
		} else {
			if (course.required && course.score && course.score < 5) {
				msg = `Course ${course.name} is required`
			}
			if (course.score && course.score > 5) {
				ttCredit += course.credit
			} else {
				allPassed = false;
				msg = "Not enough credit"
			}
		}
	}
	if (allPassed) {
		allPassed = ttCredit >= TOTAL_CREDIT_REQUIRED;
	}
	return { pass: allPassed, credit: ttCredit, msg }
}
