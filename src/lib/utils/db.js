import { version } from "$app/environment";

export function getIndexedDB({ upgrade = schema } = {}) {
	const request = indexedDB.open('creditdb', +version);
	if (upgrade)
		request.onupgradeneeded = upgrade;
	return new Promise((resolve, reject) => {
		const unlisten = () => {
			request.removeEventListener('success', success)
			request.removeEventListener('error', error)
		}
		const success = function(event) {
			console.log("s")
			resolve(event?.target?.result)
			unlisten()
		}

		const error = function() {
			reject("Cannot connect")
			unlisten()
		}

		request.addEventListener('success', success)
		request.addEventListener('error', error)
	})
}

export function schema(event) {
	const db = event.target.result

	db.onerror = (_) => {
		console.error("Error loading db")
	};

	// Create an objectStore for this database
	const _objectStore = db.createObjectStore('scores', { keyPath: 'code' });

	// Define what data items the objectStore will contain
	// objectStore.createIndex('hours', 'hours', { unique: false });
	// objectStore.createIndex('minutes', 'minutes', { unique: false });
	// objectStore.createIndex('day', 'day', { unique: false });
	// objectStore.createIndex('month', 'month', { unique: false });
	// objectStore.createIndex('year', 'year', { unique: false });
}

export function upsert(store, val) {
		store.put(val).onsuccess = () => console.log("updated")
}
