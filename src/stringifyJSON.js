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

var stringifyJSON = function(value) {
	var jsonString = "";

	var getString = function(val){ 
		var content = [];

		if(equivType(val, 'boolean', 'number') || equivVal(val, null)){
			return val;
		} 

		else if(equivType(val, 'string')){
			return '"' + val + '"';
		}

		else if (Array.isArray(val)){
			val.forEach(function(el){
				content.push(getString(el));
			});
			content = content.join(",");
			return "[" + content + "]";
		}

		else if (equivType(val, 'object')){
			for(var key in val){
				if(!equivType(val[key], 'function') && !equivVal(val[key], undefined)){
				content.push(getString(key) + ':' + getString(val[key]));
				}
			}
			content = content.join(",");
			return "{" + content + "}";
		} 
		else { return val; }
	}

	jsonString += getString(value);
	return jsonString;
};


var equivType = function(value) {
	for(var i = 1; i < arguments.length; i++){
		if(typeof value === arguments[i]){
			return true;
		}
	}
	return false;
}

var equivVal = function(value) {
	for(var i = 1; i < arguments.length; i++){
		if(value === arguments[i]){
			return true;
		}
	}
	return false;
}

