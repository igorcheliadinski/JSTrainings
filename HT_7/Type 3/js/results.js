var resultsModule = (function () {
	var getResult = function (yourResult, resultsPoints, resultsMessages) {

		for(var i in resultsPoints) {
			if (yourResult <= Number(resultsPoints[i])) {
				return yourResult + " " + resultsMessages[i];
			}
		}
	};
	return {
		getResult: getResult
	};
})();
mediator.subscribe('getMyResult', resultsModule.getResult);