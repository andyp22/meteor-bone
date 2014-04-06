/*
 * View logic for the home page.
 */
ViewHome = Backbone.View.extend({
	
	template: null,
	
	initialize: function()  {
		Template.home.events = {
			// Prevent the page reloading for links.
			"click a.internal": function(e)  {
				App.router.clickReplace(e);
			}
		};
		
		this.template = function () {
			var data = new Object();
			return UI.renderWithData(Template.home, data);
		};
	},
	render: function()  {
		this.$el.html(UI.insert(this.template(), this.el));
		return this;
	}
});