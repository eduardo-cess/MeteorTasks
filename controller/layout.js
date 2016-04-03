if (Meteor.isClient) {

	Template.navInicio.events({
		'click .linkinicio': function () {
			Router.go('/inicio');
		}
	});

}

if (Meteor.isCordova) {

	Template.footer.onRendered(function(){
		$(".page-footer").addClass('hide-on-small-only');
	});


}