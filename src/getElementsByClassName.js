// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

/*
	Problem: return an array of all html element has have the given class name
	Solution:
		*document.body, element.childNodes, and element.classList
	A: element has class
	B: search element's child nodes
*/

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
	var choiceEls = [];
	var body = document.body;

	var searchEl = function(element){
		var elements = element.childNodes;


		for(var i = 0; i < elements.length; i++){
			if(_.contains(elements[i].classList, className)) { 
				choiceEls.push(elements[i]); 
			}
			searchEl(elements[i]);
		}
	}

	if(_.contains(body.classList, className)){ 
		choiceEls.push(body); 
	}
	searchEl(body);

	return choiceEls;
};

