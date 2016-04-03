

Groups = new Mongo.Collection("taskgroups");


if (Meteor.isClient) {
  Meteor.subscribe("taskgroups");

  Template.inicio.helpers({
    groups: function () {
      return Groups.find({owner: Meteor.userId()},{sort: {createdAt: -1}});
    },
    user: function(){
      return Users.find({_id: Meteor.userId()});
    }
  });

  Template.inicio.onRendered(function(){
    $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: 0, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
    });
    $('.tooltipped').tooltip({delay: 50});
  });

  Template.inicio.events({
  'submit #cadastroGrupoTarefas': function (event, template) {
    event.preventDefault();

    var groupName = template.find("#nomeGrupo").value;

    Meteor.call('insertProject', groupName);

    template.find("#nomeGrupo").value = '';
    $('#modal1').closeModal();
  },

  'click .deleteProject': function(event, template){
    idProjeto = this._id;
    Meteor.call('removeProject',idProjeto, function (error, result) {if (error) MAterialize.toast("Erro ao excluir",4000)});
  },

  'click .openProject': function(){
    Session.set('idProjeto', this._id);
    Session.set('projectName', this.name);
  }
});

}

if (Meteor.isServer) {
  Meteor.publish("taskgroups", function(){
    return Groups.find({owner: this.userId});
  });


  Meteor.startup(function () {
    // code to run on server at startup
  });
}

