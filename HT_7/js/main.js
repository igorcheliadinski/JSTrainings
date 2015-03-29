function getXmlHttp () {
	try {
		return new ActiveXObject('Msxml2.XMLHTTP');
	} catch (e) {
		try {
			return new ActiveXObject('Microsoft.XMLHTTP');
		} catch (ee) {}
	}
	if (typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	}
}

var App = {
	// Questions module
	Questions: {
		// Questions
		questions: [],
		// Get questions from server
		getQuestions: function() {
			var xhr = new getXmlHttp(),
					self = this,
					response;
			xhr.open('GET', 'data/questions.json', false);
			xhr.onreadystatechange = function () {
				if (xhr.readyState != 4) {
					return;
				}
				response = JSON.parse(xhr.responseText);
				for (var question in response) {
					self.questions.push(response[question]);
				}
			}
			xhr.send(null);
		},
		initForm: function() {
			var question = this.questions.shift(),
					answersContainers = document.querySelectorAll('menu span');

			if (this.questions.length <= 0) {
				document.getElementById('continue').style.display = 'none';
				document.getElementById('result').style.display = 'block';
			}
			document.getElementsByTagName('h2')[0].innerHTML = question.question;
			for (var i = 0; i < answersContainers.length; i++) {
				answersContainers[i].innerHTML = question.answers[i];
				answersContainers[i].previousSibling.value = question.points[i];
			}
		},
		initNextButton: function() {
			var self = this;
			document.getElementById('continue').addEventListener('click', function () {
				var answers = document.getElementsByName('answer');
				for(var i in answers) {
					if (answers[i].checked) {
						localStorage.result = Number(localStorage.result) + Number(answers[i].value);
					}
				}
				answers[0].checked = "true";
				self.initForm();
			});
		}
	},
	// Results module
	Results: {
		results: [],
		getResults: function() {
			var xhr = new getXmlHttp(),
					self = this,
					response;
			xhr.open('GET', 'data/results.json', false);
			xhr.onreadystatechange = function () {
				if (xhr.readyState != 4) {
					return;
				}
				response = JSON.parse(xhr.responseText);
				for (var result in response) {
					self.results.push(response[result]);
				}
			}
			xhr.send(null);
		},
		showResults: function() {
			var result = Number(localStorage.result),
					message;

			if (localStorage.result <= this.results[0].to) {
				message = this.results[0].status;
			} else if (localStorage.result <= this.results[1].to) {
				message = this.results[1].status;
			} else {
				message = this.results[2].status;
			}

			alert(localStorage.result + ': ' + message);
		},
		initResultsButton: function() {
			var self = this;
			document.getElementById('result').addEventListener('click', function() {
				self.showResults();
			});
		}
	},
	// Application start
	start: function() {
		localStorage.result = 0;
		this.Questions.getQuestions();
		this.Results.getResults();
		this.Questions.initForm();
		this.Questions.initNextButton();
		this.Results.initResultsButton();
	}
};

App.start();