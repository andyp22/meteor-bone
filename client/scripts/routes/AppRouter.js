/**
 * Main router for the application.
 * 
 * @namespace AppRouter
 */
AppRouter = BaseRouter.extend({
	/**
	 * The current view.
	 * 
	 * @memberof AppRouter
	 * @instance
	 * @type {Backbone.View}
	 */
    view: null,
    /**
	 * Selector for the container of the main content area.
	 * 
	 * @memberof AppRouter
	 * @instance
	 * @type {String}
	 */
    page_content_sel: "#content",
    /**
	 * Selector for the container of the header component.
	 * 
	 * @memberof AppRouter
	 * @instance
	 * @type {String}
	 */
    page_header_sel: "#header",
    /**
     * Initialize the application router.
     * 
	 * @function
	 * @memberof AppRouter
	 * @instance
	 * @private
	 */
    initialize: function()  {
    	// Create a component view that renders in the page template, on every page.
        this.viewHeader = new ViewHeader();
        $(this.page_header_sel).replaceWith(this.viewHeader.render().$el);
	},
	/**
	 * Changes the page by creating the viewClass and inserting it.
	 * 
	 * @function
	 * @memberof AppRouter
	 * @instance
	 * 
	 * @param {Backbone.View} viewClass - The Backbone View to be instantiated.
	 * @param {Object} viewParams - A JSON Object used to initialize the view. (optional)
	 * @param {(Function|Boolean)} accessCallback - A function or boolean value which can be used to deny or grant access to specific views. Return false to allow access. (optional)
	 * @param {Object} accessParams - Passed to the accessCallback function. (optional)
	 */
    routePath: function(viewClass, viewParams, accessCallback, accessParams) {
        if(!viewClass)  {
        	viewClass = Home;
        }
        
        // If a user tries to visit a gated page, redirect to home.
        var self = this;
        Deps.autorun( function()  {
			var none_shall_pass = accessCallback ? ( (typeof(accessCallback) == 'function') ? accessCallback(accessParams): accessCallback): false;
			if(none_shall_pass)  {
				console.log("Access denied, user does not have access.");
			    self.go('home');
			    return;
			}
		});
		
		// Do we have an access callback? If so and it is a function call it, otherwise set appropriately.
        var none_shall_pass = accessCallback ? ( (typeof(accessCallback) == 'function') ? accessCallback(accessParams): accessCallback): false;
		// If all is well, go to the requested page!
        if (!none_shall_pass)  {
        	this.view = new viewClass(viewParams);
            this.render();
        } else {
        	console.log("Access denied, user does not have access.");
        	this.go('home');
        }
	},
	/**
	 * Route using the Backbone router without a page refresh.
	 * 
	 * @function
	 * @memberof AppRouter
	 * @instance
	 * @param {String} route - The path, url, or route which should be loaded.
	 */
    go: function(route) {
    	// Navigate to the indicated route.
    	this.navigate(route, {trigger: true});
    	// Scroll to the top of the new page.
        window.scrollTo(0,0);
	},
    /**
	 * Render the current view.
	 * 
	 * @function
	 * @memberof AppRouter
	 * @instance
	 */
    render: function()  {
        $(this.page_content_sel).html(this.view.render().$el);
	},
    /**
	 * Replace an anchor tag event with a Backbone route event.
	 * 
	 * @function
	 * @memberof AppRouter
	 * @instance
	 * 
	 * @param {Event} e - Anchor tag click event.
	 */
    clickReplace: function(e) {
        // Don't let the page reload like normal.
        e.preventDefault();

        // Parse out the part of the url the router needs.
        var a = document.createElement("a");
        a.href = this.getHref(e.target);
        var route = a.pathname + a.search;

        // Route using the Backbone router without a page refresh.
        this.go(route);
	},
    /**
	 * Gets the href attribute from an element, or if null, from the element's first parent that has the attribute.
	 * 
	 * @function
	 * @memberof AppRouter
	 * @instance
	 * 
	 * @param {Object} elt - An anchor element in a jQuery wrapper.
	 */
    getHref: function(elt) {
    	if (elt.hasAttribute("href"))  {
    		return elt.href;
    	} else if(elt.parentElement)  {
    		return this.getHref(elt.parentElement);
    	} else {
    		return "";
    	}
    }
});