if (!(typeof MochaWeb === 'undefined')){
	MochaWeb.testOnly(function(){
		
		describe("User", function(){
			Accounts.createUser({
				username: "john.doe",
				email: "john.doe@test.com",
				password: "password",
				profile: {
					name: "John Doe"
				}
			});
			
			it("should have john.doe as username", function(){
				chai.assert.equal(Meteor.user().username,'john.doe');
			});
			
			it("should have John Doe as profile name", function(){
				chai.assert.equal(Meteor.user().profile.name,'John Doe');
			});
			
			it("should have john.doe@test.com as email address", function(){
				chai.assert.equal(Meteor.users.getActiveEmail(),'john.doe@test.com');
			});
		});
		
	});
}
