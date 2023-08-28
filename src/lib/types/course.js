const KNOWLEDGE_GROUP = Object.freeze({
	DC: 'DC',
	CN: Object.freeze({
		CSN: 'CSN',
		N: 'N',
		TN: 'TN'
	})
})

class Course {
	/**
	 * @type string	
	 */
	code = ''
	/**
	 * @type string
	 */
	name = ''
	/**
	 * @type number
	 */
	credit = 1
	/**
	 * @type number
	 */
	score = 0
	/**
	* @type KNOWLEDGE_GROUP?
	*/
	group = null
	/**
	 * @type boolean
	 */
	required = false
}


const TOTAL_CREDIT_REQUIRED = 138
