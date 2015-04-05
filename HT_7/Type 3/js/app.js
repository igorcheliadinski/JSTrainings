var App = {
	start: function () {
		var self = this;
		this.questions = mediator.trigger('getJSON', 'data/questions.json');
		mediator.trigger('questionsLoaded', document.body, this.questions);

		document.getElementsByTagName('button')[0].onclick = function() {
			var answers = mediator.trigger('getAnswers'),
					myResult,
					resultsArray,
					resultsPoints = [],
					resultsMessages = [];

			if(mediator.trigger('checkForm', answers, self.questions.length)) {
				myResult = mediator.trigger('getTotalCount', answers);
				resultsArray = mediator.trigger('getJSON', 'data/results.json');
				for (var i in resultsArray) {
					resultsMessages.push(resultsArray[i].status);
					resultsPoints.push(resultsArray[i].to);
				}
				myResult = mediator.trigger('getMyResult', myResult, resultsPoints, resultsMessages);
				mediator.trigger('showResult', myResult);
			} else {
				mediator.trigger('alert');
			}
		}
	}
};

window.onload = function () {
	App.start();
}