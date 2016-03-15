
if (Meteor.isClient) {

  Meteor.autorun(function () { 
    if (Meteor.userId() == null) {
      Router.go('/');
    }
  });

  Template.home.events({
    "submit #cadastroUsuario": function (event,template) {

        event.preventDefault();
        email = template.find('#email').value;
        senha = template.find('#senha').value;
      
        Accounts.createUser({
            email: email,
            password: senha
        },function(error){
          if (error)
            Materialize.toast("Usuário "+email+" já possui cadastro, tente fazer o Login.", 4000);         
          else
            Router.go('inicio');
        });
     },

     "submit #loginUsuario": function(event,template){
        event.preventDefault();
        email = template.find('#emailLogin').value;
        senha = template.find('#senhaLogin').value;
        Meteor.loginWithPassword(email,senha,function(error){
          if (error)
            Materialize.toast("Usuário "+email+" não possui cadastro.", 4000);         
          else
            Router.go('inicio');
        });

     }
  });

  Template.home.onRendered(function(){
    Meteor.logout();
    Accounts.onLogin(function(){
      Router.go('inicio');
    })
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
