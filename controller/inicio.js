

Groups = new Mongo.Collection("taskgroups");


if (Meteor.isClient) {
  Template.inicio.helpers({
    groups: function () {
      return Groups.find({owner: Meteor.userId()},{sort: {createdAt: -1}});
    }
  });

  Template.inicio.events({
  'submit #cadastroGrupoTarefas': function (event, template) {
   
    event.preventDefault();

    var groupName = template.find("#nomeGrupo").value;
    Groups.insert({
        name: groupName,
        createdAt: new Date(),
        owner: Meteor.userId(),          
      });
    template.find("#nomeGrupo").value = '';
  },

  'click .delete': function(event, template){
    Groups.remove(this._id);
  },

  'click .open': function(){
    Router.route('projeto/:_id',function(){
      this.render('projeto');
    });
    Session.set('idProjeto', this._id);
    Session.set('projectName', this.name);
  }
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
