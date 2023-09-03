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
	constructor({ code, required }, allCourses) {
		const course = allCourses[code]
		if (!course) throw new Error(`Course ${code} not exist`)
		/**
		 * @public
		 * @type string	
		 */
		this.name = course.name
		/**
		 * @public
		 * @type string	
		 */
		this.code = code
		/**
		 * @public
		 * @type KNOWLEDGE_GROUP	
		 */
		this.group = course.group
		/**
		 * @public
		 * @type number	
		 */
		this.credit = course.credit
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

export class CourseGroup {
	select = 0
	/**
	 * @type Course[]
	 */
	courses = []

	/**
	* @param {Object} obj
	* @param {number} obj.select
	* @param {Object[]} obj.courses
	*/
	constructor({select, courses}, allCourses) {
		this.select = select;
		this.courses = courses.map(c => new Course(c, allCourses))
	}
}
