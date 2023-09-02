export const KNOWLEDGE_GROUP = Object.freeze({
	DC: 'DC',
	CN: Object.freeze({
		CSN: 'CSN',
		N: 'N',
		TN: 'TN'
	})
})

export const TOTAL_CREDIT_REQUIRED = 138

export class Course {
	/**
	 * @param {Object} obj
	 * @param {string} obj.name
	 * @param {string} obj.code
	 * @param {KNOWLEDGE_GROUP} obj.group
	 * @param {number} obj.credit
	 * @param {boolean} obj.required
	 */
	constructor({ name, code, group, credit, required }) {
		/**
		 * @public
		 * @type string	
		 */
		this.name = name
		/**
		 * @public
		 * @type string	
		 */
		this.code = code
		/**
		 * @public
		 * @type KNOWLEDGE_GROUP	
		 */
		this.group = group
		/**
		 * @public
		 * @type number	
		 */
		this.credit = credit
		/**
		 * @public
		 * @type boolean	
		 */
		this.required = required
		/**
		 * @public
		 * @type number	
		 */
		this.score = 0
	}
}

export class Group {
	/**
	* @param {Course[]} courses
	* @param {string} name 
	* @param {number} [select=0]
	*/
	constructor(name, courses, select = 0) {
		this.name = name;
		this.courses = courses;
		this.select = select;
	}
}
