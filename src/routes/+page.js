// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import yaml from 'yaml';
import sample from '$lib/data/sample.yaml?raw'

export const prerender = true;

export function load() {
	return {
		courses: yaml.parse(sample)
	}
}
