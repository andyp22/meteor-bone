/*
 * The main entry point for the client side of the app.
 */

// Create the main app object
App = {};

// Method to get the current user's email that won't ever throw an undefined error!
Meteor.users.getActiveEmail = function() {
	var email = "";
    if(Meteor.userId())  {
    	if(Meteor.user())  {
    		if(Meteor.user().emails)  {
                if(Meteor.user().emails[0])  {
                    if(Meteor.user().emails[0].address)  {
                        email = Meteor.user().emails[0].address;
                    }
                }
            }
        }
	}
    return email;
};
    

Meteor.startup(function()  {
	$(function()  {
		// Create the backbone router
        App.router = new Router();
        Backbone.history.start({pushState: true});
	});
});

