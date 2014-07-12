/*
	Meteor package stubs
	
	Being used until Velocity auto-stubber is added.
*/

var context = (typeof global === 'undefined') ? window : global;

// BrowserPolicy package stubs
if (context && "undefined" === typeof context.BrowserPolicy) {
	
	var BrowserPolicy = {},
		emptyFn = function () {};
	
	BrowserPolicy.content = {
		allowOriginForAll: emptyFn,
		disallowInlineScripts: emptyFn
	};
	
	BrowserPolicy.framing = {
		allowAll: emptyFn,
		restrictToOrigin: emptyFn
	};
	
	context.BrowserPolicy = BrowserPolicy;
}
