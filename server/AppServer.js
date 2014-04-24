var Future = Meteor.require('fibers/future');
/**
 * The main server file, general server side code should go here.
 * 
 * @namespace Server
 */
Server = {
	/**
	 * Start the application.
	 * 
	 * @function
	 * @memberof Server
	 * @instance
	 */
	startup: function()  {
		// Code to run on server at startup.
	}
};

Meteor.startup(function (err, res) {
	Server.startup();
});
/**
 * Set permissions on the users collection.
 * 
 * @memberof Meteor.users
 * @private
 */
Meteor.users.allow({
	// A user can update their own record.
	update: function(userId, doc)  {
		return userId == this.userId;
	}
});