var questionsModule = (function () {
	var formIsValid = function (answers, questionsCount) {
				return answers.length === questionsCount;
			},
			getTotalCount = function (answers) {
				var result = 0;
				if (!answers)
					return false;
				for(var answer in answers) {
					result += Number(answers[answer]);
				}
				return result;
			}
	return {
		formIsValid: formIsValid,
		getTotalCount: getTotalCount
	};
})();
mediator.subscribe('checkForm', questionsModule.formIsValid);
mediator.subscribe('getTotalCount', questionsModule.getTotalCount);