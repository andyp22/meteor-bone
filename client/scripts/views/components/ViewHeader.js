/*
 * View logic for the header component.
 */
ViewHeader = Backbone.View.extend({
	
	template: null,
	// Attributes for rendering the root element.
	tagName: "div",
	id: "header",
	
	initialize: function()  {
		// Template Events.
		Template.componentHeader.events = {
			// Prevent the page reloading for links.
			"click a": function(e)  {
				App.router.clickReplace(e);
			}
		};
		// Template Helpers.
		Template.componentHeader.name = function(component, options) {
		    if( Meteor.userId() && Meteor.user() && Meteor.user().profile)  {
				return Meteor.user().profile.name;
			}
			return '';
		};
		Template.componentHeader.loggedIn = function(component, options) {
		    return Meteor.userId() || null;
		};
		
		this.template = function () {
			var data = { loggedIn: Meteor.userId() || null, name: '' };
			return UI.renderWithData(Template.componentHeader, data);
		};
	},
	render: function()  {
		this.$el.html(UI.insert(this.template(), this.el));
		return this;
	}
});