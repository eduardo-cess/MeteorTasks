if (Meteor.isClient) {

	Template.projeto.helpers({
		projeto: function(){
			return Session.get('projectName');
		}
	});

}

if (Meteor.isServer) {
	Meteor.startup(function () {
    // code to run on server at startup
  	});
}