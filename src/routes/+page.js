import yaml  from 'yaml';
import sampleCourses from '$lib/data/sample.yaml?raw'
import cunhanCourses from '$lib/data/cunhan.yaml?raw'
import cunhan2Courses from '$lib/data/cunhan2.yaml?raw'
import allCourses from '$lib/data/courses.yaml?raw'
import { Course, CourseGroup } from '$lib/types/course';
import { dev } from '$app/environment';

export const prerender = true;
/**
* @param {any} courses 
* @param {any} allCoursesData 
*/
function mapCourses(courses, allCoursesData) {
	return courses.map(/** @param {any} d */d => {
		if (d.select) {
			return new CourseGroup(d, allCoursesData);
		} else {
			return new Course(d, allCoursesData);
		}
	})
}

export async function load() {
	let sample
	const allCoursesData = yaml.parse(allCourses)
	if (dev) {
		sample = yaml.parse(sampleCourses)
		sample.courses = mapCourses(sample.courses, allCoursesData)
	}
	const cunhan = yaml.parse(cunhanCourses)
	cunhan.courses = mapCourses(cunhan.courses, allCoursesData)

	const cunhan2 = yaml.parse(cunhan2Courses)
	cunhan2.courses = mapCourses(cunhan2.courses, allCoursesData)


	return {
		sample,
		cunhan,
		cunhan2,
	}
}
