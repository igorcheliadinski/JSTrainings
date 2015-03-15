'use strict';

// List
function List () {};
List.prototype.setValues = function(args) {
	this.values = Array.prototype.slice.call(args);
}
List.prototype.getValues = function() {
	return this.values;
}
List.prototype.getValue = function(index) {
	return values[index + 1];
}
List.prototype.getIndex = function(value) {
	return this.values.indexOf(value) + 1;
}
List.prototype.setValue = function(index, value) {
	this.values[index + 1] = value;
	return this.values;
}
List.prototype.add = function(value) {
	this.values.push(value);
	return this.values;
}
List.prototype.toString = function() {
	return this.values;
}

// List -> Queue
Queue.prototype = new List();
function Queue () {
	this.setValues(arguments);
	this.peek = function() {
		return this.values.shift();
	}
}

// List -> Stack
Stack.prototype = new List();
function Stack () {
	this.setValues(arguments);
	this.peek = function() {
		return this.values.pop();
	}
}

function Tree(node) {
	if (node) {

	};
}

var queue = new Queue(1,2,3,4,5);
var stack = new Stack(1,2,3,4,5,6);