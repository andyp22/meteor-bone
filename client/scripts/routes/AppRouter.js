/*
 * Main router for the project
 */
Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "account": "account",
        "*path": "home" // For any other path, go home
    },

    // The current view
    view: null,

    // Selector for the div that will contain each page
    page_parent_sel: "#content",

    // Selector for the container of the login component
    page_header_sel: "#header",

    // Constructor
    initialize: function()  {
        // Create a component view that renders in the page template, on every page
        this.viewHeader = new ViewHeader();
        $(this.page_header_sel).replaceWith(this.viewHeader.render().$el);
	},
    // Methods for each route
    home: function()  {
        this.go(ViewHome);
	},
    account: function()  {
        this.go(ViewUserAccount, true);
	},
    // Actually changes the page by creating the view and inserting it
    go: function(viewClass, internal, params) {
        if(!viewClass)  {
            viewClass = ViewHome;
		}
        // Pages that are "internal" can only be viewed by a logged in user
        var self = this;
        Deps.autorun( function() {
            // If a user tries to visit an internal page, redirect to home
            if(internal && !Meteor.userId())  {
                self.go(ViewHome);
                return;
			}
		});
        // If all is well, go to the requested page!
        if( !internal || Meteor.userId())  {
            this.view = new viewClass(params);
            this.render();
		}
	},
    // Render the current view
    render: function()  {
        $(this.page_parent_sel).html(this.view.render().$el);
	},
    // Method to replace an anchor tag event with a Backbone route event
    aReplace: function(e) {
        // Don't let the page reload like normal
        e.preventDefault();

        // Parse out the part of the url the router needs
        var a = document.createElement("a");
        a.href = this.getHref(e.target);
        var route = a.pathname + a.search;

        // Route using the Backbone router without a page refresh
        this.navigate(route, {trigger: true});

        // Scroll to the top of the new page
        window.scrollTo(0,0);
	},
    // Gets the href attribute from an element, or if null, from the element's first parent that has the attribute
    getHref: function(elt)  {
        if(elt.hasAttribute("href")) {
            return elt.href;
        } else  {
            return this.getHref(elt.parentElement);
		}
	}
});