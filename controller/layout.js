if (Meteor.isClient) {

	Template.navInicio.events({
		'click .linkinicio': function () {
			Router.go('/inicio');
		}
	});

}

if (Meteor.isServer) {
	Meteor.startup(function () {
    // code to run on server at startup
  	});
}