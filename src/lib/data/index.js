import coursesYml from '$lib/data/courses.json'
import sampleYml from '$lib/data/sample.json'
import cunhanYml from '$lib/data/cunhan.json'
import cunhan2Yml from '$lib/data/cunhan2.json'
import { Course, CourseGroup } from '$lib/types/course'

/**
* @param {any} coursesData 
* @param {any} allCoursesData 
*/
function mapCourses(coursesData, allCoursesData) {

	const mappedCourses = coursesData.courses.map(/** @param {any} d */d => {
		if (d.select) {
			return new CourseGroup(d, allCoursesData);
		} else {
			return new Course(d, allCoursesData);
		}
	})
	return {
		...coursesData,
		courses: mappedCourses
	}
}

export const courses = coursesYml
export const sample = mapCourses(sampleYml, courses)
export const cunhan = mapCourses(cunhanYml, courses)
export const cunhan2 = mapCourses(cunhan2Yml, courses)

