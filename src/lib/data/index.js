import coursesYml from '$lib/data/courses.yaml?raw'
import sampleYml from '$lib/data/sample.yaml?raw'
import cunhanYml from '$lib/data/cunhan.yaml?raw'
import cunhan2Yml from '$lib/data/cunhan2.yaml?raw'
import yaml from 'yaml'
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

export const courses = yaml.parse(coursesYml)
export const sample = mapCourses(yaml.parse(sampleYml), courses)
export const cunhan = mapCourses(yaml.parse(cunhanYml), courses)

export const cunhan2 = mapCourses(yaml.parse(cunhan2Yml), courses)

