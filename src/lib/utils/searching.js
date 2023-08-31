/**
* @param {string} str 
*/
function stringToASCII(str) {
    return str.replace(/[àáảãạâầấẩẫậăằắẳẵặ]/g, 'a')
      .replace(/[èéẻẽẹêềếểễệ]/g, 'e')
      .replace(/[đ]/g, 'd')
      .replace(/[ìíỉĩị]/g, 'i')
      .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
      .replace(/[ùúủũụưừứửữự]/g, 'u')
      .replace(/[ỳýỷỹỵ]/g, 'y')
}

/**
* @param {string} origStr 
* @param {string} searchStr 
*/
export function matchASCII(origStr, searchStr) {
	const origStrASCII = stringToASCII(origStr);
	const searchStrASCII = stringToASCII(searchStr);
	return origStrASCII.includes(searchStrASCII);
}
