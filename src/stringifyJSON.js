// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

/*
Problem: stringify passed in objects, arrays, strings, or booleans
Solution:
	* wrap json string with 's, e.g. [] --> '[]'
	* wrap strings in "'s, e.g. foo --> '"foo"'

	1. is value string?

	A: value isString
	B: wrap value in '" + value + "'
	C: call stringifyJSON on value's elements

	IF A --> B
	IF ~A --> C
	IF C & A --> B
	IF C & ~A --> C


*/ 

//NOTE: will cleanup if time	

var stringifyJSON = function(value) {
	var jsonString = "";

	var getString = function(val){ 
		var content = [];

		if(typeof val === 'boolean' || typeof val === 'number' || val === null){
			return val;
		}

		//if string
		else if(typeof val === 'string'){
			return '"' + val + '"';
		}

		//else if array
		else if (Array.isArray(val)){
			val.forEach(function(el){
				content.push(getString(el));
			});
			content = content.join(",");
			return "[" + content + "]";
		}
		//else if object
		else if (typeof val === 'object'){
			for(var key in val){
				if(typeof val[key] != 'function' && val[key] !== undefined){
				content.push(getString(key) + ':' + getString(val[key]));
				}
			}
			content = content.join(",");
			return "{" + content + "}";
		}

		//else if bool OR num
		//TODO: else { return val; } ?
		else if(typeof val === 'boolean' || typeof val === 'number' ){
			return val;
		}
	}

	jsonString += getString(value);

	// jsonString =  "'" + jsonString + "'";
	return jsonString;
};
