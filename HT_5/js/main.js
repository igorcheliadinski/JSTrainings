// List
function List () {
	this.values = "Values";
	this.push = function(value) {
		this.values.push(value);
		console.log(value + " has been added	List: " + this.values);
	},
	this.pop = function() {
		return this.values.pop();
	}
}
var list = new List();

// Queue
var queue = Object.create(list);
queue.values = [];
queue.pop = function () {
	return this.values.shift();
}

// Stack
var stack = Object.create(list);
stack.values = [];

// Tree
function Tree () {
	this.id = 0;
	this.addNode = function(value) {
		if (!this.root) {
			this.root = new Node(value, this.id);
		} else {
			
		}
		this.id += 1;
	};
};

// Node
function Node (value) {
	this.id = arguments[1];
	this.value = value;
	this.children = [];
};

// Realisation
// queue.push(1);
// queue.push(2);
// queue.push(4);
// queue.push(6);
// queue.push(10);

// stack.push(1);
// stack.push(2);
// stack.push(4);
// stack.push(6);
// stack.push(10);

