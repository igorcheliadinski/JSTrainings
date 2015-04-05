var mediator = (function () {
	var subscribe = function (eventName, fn) {
				if (!mediator.handlers[eventName]) {
					mediator.handlers[eventName] = [];
				}
				mediator.handlers[eventName].push({context: this, callback: fn});
			},
			trigger = function (eventName) {
				var args;
				if (!mediator.handlers[eventName]) {
					return false;
				}
				args = Array.prototype.slice.call(arguments, 1);
				for (var i = 0, l = mediator.handlers[eventName].length; i < l; i ++) {
					var subscription = mediator.handlers[eventName][i];
					return subscription.callback.apply(subscription.context, args);
				}
			}
	return {
		handlers: {},
		subscribe: subscribe,
		trigger: trigger
	}
})();