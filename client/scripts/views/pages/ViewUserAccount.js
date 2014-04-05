/*
 * View logic for the User Account page.
 */
ViewUserAccount = Backbone.View.extend({
	
	template: null,
	
	initialize: function()  {
		var email = Meteor.users.getActiveEmail();
		var name = '';
		
		if(Meteor.user() && Meteor.user().profile)  {
			name = Meteor.user().profile.name;
		}
		
		this.template = function () {
			var data = { user_id: Meteor.userId(), email: email, name: name };
			return UI.renderWithData(Template.account, data);
		};
	},
	render: function()  {
		this.$el.html(UI.insert(this.template(), this.el));
        return this;
	}
});