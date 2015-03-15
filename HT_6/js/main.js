var changeButton = document.querySelector('input[type="button"]'),
		stringInput = document.querySelector('#inputtedText'),
		stringOutput = document.querySelector('#outputtedText');

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};
changeButton.onclick = function () {
	var text = stringInput.value;
	for (var i = 0; i < text.length; i++) {
		if (/[,.!?]/.test(text[i]) && (i !== text.length - 1)) {
			if (text[i + 1] !== ' ') {
				text = text.insert(i + 1, ' ');
			};
		};
	};
	stringOutput.value = text.split(' ').map(function (value, index, arr) {
		var newStr = '';
		if (/[,.!?]/.test(value[value.length - 1])) {
			for (var i = value.length - 2; i >= 0; i--) {
				newStr += value[i];
			}
			newStr += value[value.length - 1];
			return newStr;
		} else {
			for (var i = value.length - 1; i >= 0; i--) {
				newStr += value[i];
			}
			return newStr;
		}
	}).join(' ');
}