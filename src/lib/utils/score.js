import { CourseGroup, Course } from "$lib/types/course"

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
 * @returns {string}
 */
export function rating(score, type) {
	if (type === 4) {
		if (score < 5) return String(score / 5);
		return String(((score - 5) / 5) + 1);
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
	return String(score)
}

/**
 * @param {CourseGroup} group
 */
function graduateCourseGroup(group) {
	const { select, courses } = group
	const credit = courses.filter(course => course.score && course.score >= 5).reduce((sum, c) => sum + c.credit, 0)
	return { passed: credit >= select, credit }
}

/**
 * @param {Array<Course|CourseGroup>} courses
 * @param {number} credit 
 *
 */
export function graduate(courses, credit) {
	let ttCredit = 0
	let allPassed = true;
	let msg; 
	for (const course of courses) {
		if (course instanceof Course) {
			if (course.required && (!course.score || course.score < 5)) {
				msg = msg || `Học phần ${course.name} là môn bắt buộc`
			}
			if (course.score && course.score >= 5) {
				ttCredit += course.credit
			}
		} else {
			const { credit, passed } = graduateCourseGroup(course)
			if (!passed) {
				allPassed = false;
				msg = msg || `Bạn chưa tích lũy đủ tín chỉ môn tự chọn`
			}
			ttCredit += credit
		}
	}
	if (ttCredit >= credit) msg = `Bạn chưa tích lũy đủ ${credit} tín chỉ`
	allPassed = allPassed && ttCredit >= credit;

	if (allPassed) msg = "Congratulation!!";
	return { pass: allPassed, credit: ttCredit, msg }
}
