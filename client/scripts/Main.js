/**
 * The main entry point for the client side of the application.
 * 
 * @namespace App
 */
App = {
	/**
	 * Backbone Router used to control application page changes.
	 * 
	 * @memberof App
	 * @instance
	 * @type {Backbone.Router}
	 */
	router: null,
	/**
	 * Meteor subscriptions which must be ready to start the application.
	 * 
	 * @memberof App
	 * @instance
	 * @type {Array}
	 */
	subscriptions: new Array(),
	/**
	 * Internal property which stores application ready state.
	 * 
	 * @memberof App
	 * @private
	 * @instance
	 * @type {Boolean}
	 */
	_ready: false,
	/**
	 * Initialize the application.
	 * 
	 * @memberof App
	 * @instance
	 * @private 
	 */
	initialize: function()  {
		// Create the backbone router.
		this.router = new AppRouter({ factory: new RouteFactory() });
		
		// Set up any subscriptions needed before the application can start.
		/*this.subscriptions.push(Meteor.subscribe('subscription_name')); //<- */
		/*this.subscriptions.push(Meteor.subscribe('another_subscription_name')); //<- */
		
		// Do some more stuff...
		
	},
	/**
	 * A helper to let the application know when all subscriptions are ready to use.
	 * 
	 * @function
	 * @memberof App
	 * @instance
	 * @returns {Boolean}
	 */
	isReady: function()  {
		return this._ready;
	},
	/**
	 * Start the application.
	 * 
	 * @function
	 * @memberof App
	 * @instance
	 */
	startup:  function()  {
		// Initialize the application.
		this.initialize();
		
		// If there are any subscriptions check for subscription ready state reactively.
		if(App.subscriptions.length)  {
			Deps.autorun(function (c) {
				App.subscriptions.every(function(handle) {
					if( handle.ready() && !App.isReady() )  {
						c.stop();
						App._ready = true;
						// Start the application history.
						Backbone.history.start({ pushState: true });
					}
				});
			});
		} else  {
			// Otherwise the application is ready.
			App._ready = true;
			// Start the application history.
			Backbone.history.start({ pushState: true });
		}
		
	}
};

Meteor.startup(function()  {
	$(function()  {
        App.startup();
	});
});