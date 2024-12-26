import { version } from "$app/environment";

export class Db {
	/**
	 * @type {Promise<IDBDatabase>}
	 */
	#db
	/**
	 * @static
	 * @type {Db}
	 */
	static #instance

	/**
	 * @private
	 */
	constructor() {
		const db = 'credit-calculator'
		this.#db = this.getIndexedDB(db, +version)
		Db.#instance = this
	}

	static get instance() {
		if (!Db.#instance) {
			return new Db()
		}
		return Db.#instance
	}

	async db() {
		if (!await this.#db) return Promise.reject("Db not connected")
		return await this.#db
	}
	/**
	 * @param {string} db
	 * @param {number} version
	 */
	getIndexedDB(db, version) {
		const request = indexedDB.open(db, version + 3);
		request.onupgradeneeded = this.upgrade;
		return new Promise((resolve, reject) => {
			const unlisten = () => {
				request.removeEventListener('success', success)
				request.removeEventListener('error', error)
			}
			const success =
				/**
				 * @param {*} event 
				 */
				function(event) {
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
	/**
	 * @param {IDBVersionChangeEvent} event 
	 */
	upgrade(event) {
		/** @type {IDBDatabase} */
		const db = event?.target?.result
		return new Promise(async (resolve, reject) => {

			db.onerror = () => {
				console.warn("Error loading db")
				reject(false)
			};
			if (!db.objectStoreNames.contains('scores')) {
				// store an objectStore for this database
				const scoresStore = db.createObjectStore('scores', { keyPath: 'code' });
			} else {
				Db.#instance.getOne('scores', 'MTH0004').then(old => {
					if (old) {
						Db.#instance.delete('scores', 'MTH0004')
						Db.#instance.insert('scores', { ...old, code: 'MTH00004' })
					}
				}).catch(console.error)

			}
			let degree = 'cunhan';
			if (!db.objectStoreNames.contains('degree')) {
				// store an objectStore for this database
				const degreeStore = db.createObjectStore('degree', { keyPath: 'key' });
			}

			if (!db.objectStoreNames.contains('info')) {
				// store an objectStore for this database
				const yearStore = db.createObjectStore('info', { keyPath: 'key' });
				Db.#instance.insert('info', { key: 'current', value: { degree, year: 2022 } })
			}
			return resolve(true)
		})

		if (event.newVersion !== null && event.oldVersion < event.newVersion) {
			db.deleteObjectStore('degree');
		}
	}

	/**
	 * @param {string} obj
	 * @param {string} key 
	 */
	async getOne(obj, key) {
		const db = await Db.instance.db()
		return new Promise((resolve, reject) => {
			const objStore = db.transaction(obj).objectStore(obj)
			const _get = objStore.get(key)
			_get.onsuccess =
				/**
				 * @param {*} event 
				 */
				(event) => resolve(event.target.result);
			_get.onerror =
				/**
				 * @param {*} event 
				 */
				(event) => reject(event)

		})
	}

	/**
	* @param {string} obj
	* @param {any} value
	*/
	async insert(obj, value) {
		const db = await Db.instance.db();
		const objStore = db.transaction([obj], "readwrite").objectStore(obj)
		const add = objStore.add(value)
		return this.promisedRequest(add)
	}

	/**
	* @param {string} obj
	* @param {any} value
	*/
	async update(obj, value) {
		const db = await Db.instance.db();
		const objStore = db.transaction([obj], "readwrite").objectStore(obj)
		const put = objStore.put(value)
		return this.promisedRequest(put)
	}

	/**
	* @param {string} obj
	* @param {string} key
	*/
	async delete(obj, key) {
		const db = await Db.instance.db();
		const objStore = db.transaction([obj], "readwrite").objectStore(obj)
		const del = objStore.delete(key)
		return this.promisedRequest(del)
	}

	/**
	* @param {string} obj
	*/
	async all(obj) {
		const db = await Db.instance.db();
		const objStore = db.transaction(obj).objectStore(obj)
		const all = objStore.getAll()
		return this.promisedRequest(all)
	}

	/**
	* @param {IDBRequest} request 
	*/
	promisedRequest(request) {
		return new Promise((resolve, reject) => {
			// @ts-ignore: next-line
			request.onsuccess = event => resolve(event.target.result)
			request.onerror = event => reject(event)
		})
	}
}


