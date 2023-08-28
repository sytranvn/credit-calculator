/**
 * $$
 * A = \frac{\displaystyle\sum_{i = 1}^n{a_i \times n_i}}{\displaystyle\sum_{i=1}^n{n_i}}
 * $$
 * import Course from 'lib/types/course'
 * @param {Course[]} courses
 */
function avg(courses) {
	const result = courses.reduce((result, course) => {
		result.score = result.score + course.score * course.credit
		result.credit = result.credit + course.credit
		return result
	}, { score: 0, credit: 0})
	return result.score / result.credit
}

/**
 * Convert 10.0 grading to 4.0 or ABCD grading
 * @param {number} score
 * @param {(4|'A'|'A+')} type
 * @returns {string|number}
 */
function rating(score, type) {
	if (type === 4) {
		if (score < 5) return score /5;
		return ((score - 5) / 5) + 1;
	}
	if (type === 'A') {
		if (score >=8) return 'A';
		if (score >=6.5) return 'B';
		if (score >=5) return 'C';
		if (score >=4) return 'D';
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
