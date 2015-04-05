var jsonModule = (function () {
	var getJSON = function (path) {
		var json,
				xmlhttp = new XMLHttpRequest(),
				self = this;

		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				json = JSON.parse(xmlhttp.responseText);
			}
		}
		xmlhttp.open('get', path, false);
		xmlhttp.send();
		return json;
	};
	return {
		getJSON: getJSON
	};
})();
mediator.subscribe('getJSON', jsonModule.getJSON);