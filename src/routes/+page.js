import yaml from 'yaml';
import sampleCourses from '$lib/data/sample.yaml?raw'
import rawCourses from '$lib/data/dttx.yaml?raw'
import { Group, Course } from '$lib/types/course';
import { dev } from '$app/environment';

export const prerender = true;

export async function load() {
	const data = yaml.parse(dev ? sampleCourses : rawCourses)
	const message = dev ? 'Welcome' : 'Chào mừng bạn đến với ứng dụng tín điểm học phần'
	const groups = data.map(d => {
		const courses = d.courses.map(c => {

		if (c.select) {
			const gcourses = c.courses.map(c => new Course(c))
			return new Group(`Tích lũy ${c.select} tín chỉ từ các học phầ sau`,
				gcourses,
				c.select);
		} else {
			return new Course(c);
		}
		})
		return new Group(d.groupname, courses)
	})
	return {
		message,
		groups
	}
}
