/**
 * Base router for the application. Borrows from a method developed by 
 * <a href="http://lostechies.com/derickbailey/2012/01/02/reducing-backbone-routers-to-nothing-more-than-configuration/" target="_blank">Derick Bailey</a>.
 * 
 * @namespace BaseRouter
 */
BaseRouter = Backbone.Router.extend({
	/**
	 * A Backbone Model that is used to load the appropriate view based on url.
	 * 
	 * @memberof BaseRouter
	 * @instance
	 * @type {Backbone.Model}
	 */
	factory: null,
	/**
	 * @function
	 * @memberof BaseRouter
	 * @instance
	 * 
	 * @param {Object} options - An object containing a factory property. All routes are
	 * 	routed through the factory to be rendered. Routes should be set in the factory
	 * 	object but can be set on the router instead if preferred.
	 */
	constructor: function(options){
		Backbone.Router.prototype.constructor.call(this, options);
		
		this.factory = options.factory;
		
		var _routes = this.factory.routes || this.routes;
		if (_routes){
			this._processRoutes(_routes);
		}
	},
	/**
	 * An internal function used to process the router's routes through the factory.
	 * 
	 * @function
	 * @memberof BaseRouter
	 * @instance
	 * @private
	 * 
	 * @param {Object} appRoutes - A hash map of routes. See http://backbonejs.org/#Router-constructor
	 * 	for more information.
	 */
	_processRoutes: function(appRoutes){
		var method, methodName;
		var route, routesLength;
		var routes = [];
		var router = this;
		for(route in appRoutes){
			routes.unshift([route, appRoutes[route]]);
		}
		routesLength = routes.length;
		for (var i = 0; i < routesLength; i++){
			route = routes[i][0];
			methodName = routes[i][1];
			method = this.factory[methodName];
			router.route(route, methodName, method);
		}
	}
});