Meteor.methods({
  insertProject: function (groupName) {
    Groups.insert({
        name: groupName,
        createdAt: new Date(),
        owner: Meteor.userId(),          
      });
  },

  removeProject: function(idProjeto){
  	Groups.remove(idProjeto);
  }
});