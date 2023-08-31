import yaml from 'yaml';
import sampleCourses from '$lib/data/sample.yaml?raw'
import rawCourses from '$lib/data/daihoc.yaml?raw'
import { Course, CourseGroup } from '$lib/types/course';
import { PUBLIC_DATA } from '$env/static/public'

export const prerender = true;

export async function load() {
	const sample = PUBLIC_DATA === 'sample'
	const data = yaml.parse(sample ? sampleCourses : rawCourses)
	const message =  sample ? 'Welcome' : 'Chào mừng bạn đến với ứng dụng tín số tín chỉ'
	const courses = data.map(d => {
		if (d.select) {
			return new CourseGroup(d);
		} else {
			return new Course(d);
		}
	})
	return {
		message,
		courses: courses
	}
}
