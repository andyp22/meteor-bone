/**
 * The main route handler. Place the router's routes hash map here as well 
 * as any functions those routes should resolve to.
 * 
 * @namespace RouteFactory
 */
RouteFactory = Backbone.Model.extend({
	/**
	 * A hash map of routes. See {@link http://backbonejs.org/#Router-routes|Router routes}
	 * for more information.
	 * 
	 * @memberof RouteFactory
	 * @instance
	 * @type {Object}
	 */
	routes: {
        ""			: "home",		// Home page
        "account"	: "account",	// User account page
        "*path"		: "home"		// For any path not listed here go home.
    },
	/**
	 * Render the home page view.
	 * 
	 * @function
	 * @memberof RouteFactory
	 * @instance
	 */
	home: function()  {
        App.router.routePath(ViewHome);
	},
	/**
	 * Render the user account page view.
	 * 
	 * @function
	 * @memberof RouteFactory
	 * @instance
	 */
    account: function()  {
    	App.router.routePath(
        	ViewUserAccount,
        	null,
        	function()  {
				return Meteor.userId() ? false : true;
			},
        	null
        );
	}
});