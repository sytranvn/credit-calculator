// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import yaml from 'yaml';
import rawCourses from '$lib/data/daihoc.yaml?raw'
import { Course, CourseGroup } from '$lib/types/course';

export const prerender = true;

export function load() {
	const data = yaml.parse(rawCourses)
	const courses = data.map(d => {
		if (d.select) {
			return new CourseGroup(d);
		} else {
			return new Course(d);
		}
	})
	return {
		courses: courses
	}
}
