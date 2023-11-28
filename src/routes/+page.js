import { dev } from '$app/environment';
import { cunhan, cunhan2, sample as devonly } from '$lib/data';

export const prerender = true;
export async function load() {
	let sample
	if (dev) {
		sample = devonly;
	}
	return {
		sample,
		cunhan,
		cunhan2,
	}
}
