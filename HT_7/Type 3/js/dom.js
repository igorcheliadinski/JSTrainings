var domModule = (function () {
	var createDOM = function (context, questionsArray) {
				var body = context,
							ol = document.createElement('ol'),
							questions = questionsArray,
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
			},
			showResult = function (resultMessage) {
				alert(resultMessage);
			},
			showWarning = function () {
				alert('Вы ответили не на все вопросы');
			},
			getAnswers = function () {
				var inputs = document.querySelectorAll('input[type="radio"]:checked'),
						answersValues = [];

				for (var i = 0; i < inputs.length; i++) {
					answersValues.push(inputs[i].value);
				}
				return answersValues;
			};
	return {
		createDOM: createDOM,
		showResult: showResult,
		showWarning: showWarning,
		getAnswers: getAnswers
	};
})();
mediator.subscribe('questionsLoaded', domModule.createDOM);
mediator.subscribe('showResult', domModule.showResult);
mediator.subscribe('alert', domModule.showWarning);
mediator.subscribe('getAnswers', domModule.getAnswers);