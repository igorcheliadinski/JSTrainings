var changeButton = document.querySelector('input[type="button"]'),
		stringInput = document.querySelector('#inputtedText'),
		stringOutput = document.querySelector('#outputtedText');

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};
changeButton.onclick = change;

// function change() {
// 	var text = stringInput.value,
// 			i;
// 	for (i = 0; i < text.length; i++) {
// 		if (/[,.!?]/.test(text[i]) && (i !== text.length - 1)) {
// 			if (text[i + 1] !== ' ') {     
// 				 text = text.insert(i + 1, ' ');
// 			};
// 		};
// 	};
// 	stringOutput.value = text.split(' ').map(function (value, index, arr) {
// 		var newStr = '';
// 		if (/[,.!?]/.test(value[value.length - 1])) {
// 			for (i = value.length - 2; i >= 0; i--) {
// 				newStr += value[i];
// 			}
// 			newStr += value[value.length - 1];
// 			return newStr;
// 		} else {
// 			for (i = value.length - 1; i >= 0; i--) {
// 				newStr += value[i];
// 			}
// 			return newStr;
// 		}
// 	}).join(' ');
// }

function change() {
	var text = stringInput.value,
			splittedText = text.split(' '),
			word,
			words,
			tempArray,
			i;

	stringOutput.value = text.split(' ').map(function (value, index, arr) {
		if (!/[,.!?\]\[%*\(\)\"\'\:]/g.test(value)) {
			return value.split('').reverse().join('');
		} else {
			word = '';
			words = [];
			for (i = 0; i < value.length; i++) {
				if (/[,.!?\]\[%*\(\)\"\'\:]/g.test(value[i])) {
					word = word.split('').reverse().join('');
					word += value[i];
					words.push(word);
					word = '';
				} else {
					tempArray = word.split('');
					tempArray.push(value[i]);
					word = tempArray.join('');
					// word += value[i];
				}
			}
			return words.join('');
		}
	}).join(' ');
}