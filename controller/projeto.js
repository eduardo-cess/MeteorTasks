if (Meteor.isClient) {

	// Template.projeto.helpers({
	// 	idProjeto: function(){
	// 		return Session.get('idProjeto');
	// 	}
	// });
	alert(window.location.href);

}

if (Meteor.isServer) {
	Meteor.startup(function () {
    // code to run on server at startup
  	});
}