var App = {
	Questions: {
		init: function () {
			App.Mediator.trigger('getQuestions');
			App.Mediator.trigger('initForm');
			document.getElementsByTagName('button')[0].onclick = function () {
				App.Mediator.trigger('checkFormIsValid');
			};
		}
	},
	Results: {
		init: function () {
			App.Mediator.trigger('getResults');
		}
	},
	Mediator: {
		on: function (eventName, handler) {
			if (!this._eventHandlers)
				this._eventHandlers = [];
			if (!this._eventHandlers[eventName])
				this._eventHandlers[eventName] = [];
			this._eventHandlers[eventName].push(handler);
		},
		off: function (eventName, handler) {
			var handlers = this._eventHandlers[eventName];
			if (!handlers)
				return;
			for(var i = 0; i < handlers.length; i++) {
				if (handlers[i] == handler)
					handlers.splice(i--, 1);
			}
		},
		trigger: function (eventName) {
			var handlers;
			if (!this._eventHandlers[eventName])
				return;
			handlers = this._eventHandlers[eventName];
			for (var i = 0; i < handlers.length; i++) {
				handlers[i].apply(this, [].slice.call(arguments, 1));
			}
		}
	},
	EventBus: function () {

		this.Mediator.on('getQuestions', function () {
			var xhr = new XMLHttpRequest(),
					self = this,
					response;
			xhr.open('GET', 'data/questions.json', false);
			xhr.onreadystatechange = function () {
				if (xhr.readyState != 4) {
					return;
				}
				App.Questions.questions = JSON.parse(xhr.responseText);
			}
			xhr.send(null);
		});

		this.Mediator.on('initForm', function () {
			var body = document.body,
					ol = document.createElement('ol'),
					questions = App.Questions.questions,
					liQuestion,
					questionTextNode,
					input,
					typeAttribute,
					label,
					continueButton;
			for(var i in questions) {
				liQuestion = document.createElement('li');
				questionTextNode = document.createTextNode(questions[i].question);
				liQuestion.appendChild(questionTextNode);

				for(var j in questions[i].answers) {
					input = document.createElement('input');
					input.setAttribute('type', 'radio');
					input.setAttribute('name', 'answer' + i);
					input.setAttribute('value', questions[i].points[j]);
					label = document.createElement('label');
					label.appendChild(input);
					label.appendChild(document.createTextNode(' ' + questions[i].answers[j]));
					liQuestion.appendChild(label);
					liQuestion.insertBefore(document.createElement('br'), label);
				}
				ol.appendChild(liQuestion);
			}
			body.appendChild(ol);
			continueButton = document.createElement('button');
			continueButton.innerHTML = "Get Results!";
			body.appendChild(continueButton);
		});

		this.Mediator.on('checkFormIsValid', function () {
			var questions = document.getElementsByTagName('li'),
					inputs,
					i;
			localStorage.result = 0;
			for(i = 0; i < questions.length; i++) {
				inputs = questions[i].getElementsByTagName('input');
				if (!inputs[0].checked && !inputs[1].checked && !inputs[2].checked) {
					alert('Not all questions answered!');
					return false;
				} else {
					inputs[0].checked && (localStorage.result = Number(localStorage.result) + Number(inputs[0].value));
					inputs[1].checked && (localStorage.result = Number(localStorage.result) + Number(inputs[1].value));
					inputs[2].checked && (localStorage.result = Number(localStorage.result) + Number(inputs[2].value));
				}
			}
			App.Mediator.trigger('getTotalCount');
		});

		this.Mediator.on('getResults', function () {
			var xhr = new XMLHttpRequest(),
					response;
			xhr.open('GET', 'data/results.json', false);
			xhr.onreadystatechange = function () {
				if (xhr.readyState != 4) {
					return;
				}
				App.Results.results = JSON.parse(xhr.responseText);
			}
			xhr.send(null);
		});

		this.Mediator.on('getTotalCount', function() {
			var totalCount = Number(localStorage.result);
			if (localStorage.result <= App.Results.results[0].to) {
				message = App.Results.results[0].status;
			} else if (localStorage.result <= App.Results.results[1].to) {
				message = App.Results.results[1].status;
			} else {
				message = App.Results.results[2].status;
			}
			alert(totalCount + ': ' + message);
		});
	},
	Start: function () {
		this.EventBus();
		this.Questions.init();
		this.Results.init();
	}
};
App.Start();