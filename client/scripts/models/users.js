/**
 * Client-side methods which change the Meteor.users object.
 */
/**
 * Method to get the current user's email that won't ever throw an undefined error!
 * 
 * @memberof Meteor.users
 */
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