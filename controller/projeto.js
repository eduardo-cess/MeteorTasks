if (Meteor.isClient) {

	// Template.projeto.helpers({
	// 	idProjeto: function(){
	// 		return Session.get('idProjeto');
	// 	}
	// });

}

if (Meteor.isServer) {
	Meteor.startup(function () {
    // code to run on server at startup
  	});
}