import hk from '$lib/data/diem-hk2-2223-dttx.json'
import { courses } from '$lib/data'
export async function load() {
	const hkdata = hk.map(mon => {
		/** @type {number[]} */
		const freq = [0,0,0,0,0,0,0,0,0,0,0]
		mon.diem.forEach(d => freq[Math.floor(+d)] += 1)
		return {
			mon: mon.mon,
			ten: courses[mon.mon]?.name,
			data: freq
		}
	})
return {
		hkdata
	}
}
