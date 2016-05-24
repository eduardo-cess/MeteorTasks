var require = meteorInstall({"lib":{"routes.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/routes.js                                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Router.route("/", { template: "home" });                                                                             // 1
                                                                                                                     //
Router.route("inicio", { template: "inicio" });                                                                      // 3
                                                                                                                     //
//Router.route("/app/projeto", {template: "projeto"});                                                               //
                                                                                                                     //
Router.route('projeto', function () {                                                                                // 7
  this.render('projeto');                                                                                            // 8
});                                                                                                                  //
                                                                                                                     //
Router.configure({ layoutTemplate: "layout" });                                                                      // 11
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"controller":{"inicio.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// controller/inicio.js                                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     //
                                                                                                                     //
Groups = new Mongo.Collection("taskgroups");                                                                         // 3
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 6
  Meteor.subscribe("taskgroups");                                                                                    // 7
                                                                                                                     //
  Template.inicio.helpers({                                                                                          // 9
    groups: function () {                                                                                            // 10
      function groups() {                                                                                            // 10
        return Groups.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } });                                 // 11
      }                                                                                                              //
                                                                                                                     //
      return groups;                                                                                                 //
    }(),                                                                                                             //
    user: function () {                                                                                              // 13
      function user() {                                                                                              // 13
        return Users.find({ _id: Meteor.userId() });                                                                 // 14
      }                                                                                                              //
                                                                                                                     //
      return user;                                                                                                   //
    }()                                                                                                              //
  });                                                                                                                //
                                                                                                                     //
  Template.inicio.onRendered(function () {                                                                           // 18
    $('.modal-trigger').leanModal({                                                                                  // 19
      dismissible: true, // Modal can be dismissed by clicking outside of the modal                                  // 20
      opacity: 0, // Opacity of modal background                                                                     // 21
      in_duration: 300, // Transition in duration                                                                    // 22
      out_duration: 200 });                                                                                          // 23
    // Transition out duration                                                                                       //
    $('.tooltipped').tooltip({ delay: 50 });                                                                         // 25
  });                                                                                                                //
                                                                                                                     //
  Template.inicio.events({                                                                                           // 28
    'submit #cadastroGrupoTarefas': function () {                                                                    // 29
      function submitCadastroGrupoTarefas(event, template) {                                                         // 29
        event.preventDefault();                                                                                      // 30
                                                                                                                     //
        var groupName = template.find("#nomeGrupo").value;                                                           // 32
                                                                                                                     //
        Meteor.call('insertProject', groupName);                                                                     // 34
                                                                                                                     //
        template.find("#nomeGrupo").value = '';                                                                      // 36
        $('#modal1').closeModal();                                                                                   // 37
      }                                                                                                              //
                                                                                                                     //
      return submitCadastroGrupoTarefas;                                                                             //
    }(),                                                                                                             //
                                                                                                                     //
    'click .deleteProject': function () {                                                                            // 40
      function clickDeleteProject(event, template) {                                                                 // 40
        idProjeto = this._id;                                                                                        // 41
        Meteor.call('removeProject', idProjeto, function (error, result) {                                           // 42
          if (error) MAterialize.toast("Erro ao excluir", 4000);                                                     // 42
        });                                                                                                          //
      }                                                                                                              //
                                                                                                                     //
      return clickDeleteProject;                                                                                     //
    }(),                                                                                                             //
                                                                                                                     //
    'click .openProject': function () {                                                                              // 45
      function clickOpenProject() {                                                                                  // 45
        Session.set('idProjeto', this._id);                                                                          // 46
        Session.set('projectName', this.name);                                                                       // 47
      }                                                                                                              //
                                                                                                                     //
      return clickOpenProject;                                                                                       //
    }()                                                                                                              //
  });                                                                                                                //
}                                                                                                                    //
                                                                                                                     //
if (Meteor.isServer) {                                                                                               // 53
  Meteor.publish("taskgroups", function () {                                                                         // 54
    return Groups.find({ owner: this.userId });                                                                      // 55
  });                                                                                                                //
                                                                                                                     //
  Meteor.startup(function () {                                                                                       // 59
    // code to run on server at startup                                                                              //
  });                                                                                                                //
}                                                                                                                    //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"layout.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// controller/layout.js                                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 1
                                                                                                                     //
	Template.navInicio.events({                                                                                         // 3
		'click .linkinicio': function () {                                                                                 // 4
			function clickLinkinicio() {                                                                                      // 4
				Router.go('/inicio');                                                                                            // 5
			}                                                                                                                 //
                                                                                                                     //
			return clickLinkinicio;                                                                                           //
		}()                                                                                                                //
	});                                                                                                                 //
}                                                                                                                    //
                                                                                                                     //
if (Meteor.isCordova) {                                                                                              // 11
                                                                                                                     //
	Template.footer.onRendered(function () {                                                                            // 13
		$(".page-footer").addClass('hide-on-small-only');                                                                  // 14
	});                                                                                                                 //
}                                                                                                                    //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"projeto.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// controller/projeto.js                                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 1
                                                                                                                     //
	Template.projeto.helpers({                                                                                          // 3
		projeto: function () {                                                                                             // 4
			function projeto() {                                                                                              // 4
				return Session.get('projectName');                                                                               // 5
			}                                                                                                                 //
                                                                                                                     //
			return projeto;                                                                                                   //
		}()                                                                                                                //
	});                                                                                                                 //
}                                                                                                                    //
                                                                                                                     //
if (Meteor.isServer) {                                                                                               // 11
	Meteor.startup(function () {                                                                                        // 12
		// code to run on server at startup                                                                                //
	});                                                                                                                 //
}                                                                                                                    //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// controller/main.js                                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 2
                                                                                                                     //
  Meteor.autorun(function () {                                                                                       // 4
    if (Meteor.userId() == null) {                                                                                   // 5
      Router.go('/');                                                                                                // 6
    }                                                                                                                //
  });                                                                                                                //
                                                                                                                     //
  Template.home.events({                                                                                             // 10
    "submit #cadastroUsuario": function () {                                                                         // 11
      function submitCadastroUsuario(event, template) {                                                              // 11
                                                                                                                     //
        event.preventDefault();                                                                                      // 13
        email = template.find('#email').value;                                                                       // 14
        senha = template.find('#senha').value;                                                                       // 15
                                                                                                                     //
        Accounts.createUser({                                                                                        // 17
          email: email,                                                                                              // 18
          password: senha                                                                                            // 19
        }, function (error) {                                                                                        //
          if (error) Materialize.toast("Usuário " + email + " já possui cadastro, tente fazer o Login.", 4000);else Router.go('inicio');
        });                                                                                                          //
      }                                                                                                              //
                                                                                                                     //
      return submitCadastroUsuario;                                                                                  //
    }(),                                                                                                             //
                                                                                                                     //
    "submit #loginUsuario": function () {                                                                            // 28
      function submitLoginUsuario(event, template) {                                                                 // 28
        event.preventDefault();                                                                                      // 29
        email = template.find('#emailLogin').value;                                                                  // 30
        senha = template.find('#senhaLogin').value;                                                                  // 31
        Meteor.loginWithPassword(email, senha, function (error) {                                                    // 32
          if (error) Materialize.toast("Usuário " + email + " não possui cadastro.", 4000);else Router.go('inicio');
        });                                                                                                          //
      }                                                                                                              //
                                                                                                                     //
      return submitLoginUsuario;                                                                                     //
    }()                                                                                                              //
  });                                                                                                                //
                                                                                                                     //
  Template.home.onRendered(function () {                                                                             // 41
    Meteor.logout();                                                                                                 // 42
    Accounts.onLogin(function () {                                                                                   // 43
      Router.go('inicio');                                                                                           // 44
    });                                                                                                              //
  });                                                                                                                //
}                                                                                                                    //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"methods.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/methods.js                                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
  insertProject: function () {                                                                                       // 2
    function insertProject(groupName) {                                                                              // 2
      Groups.insert({                                                                                                // 3
        name: groupName,                                                                                             // 4
        createdAt: new Date(),                                                                                       // 5
        owner: Meteor.userId()                                                                                       // 6
      });                                                                                                            //
    }                                                                                                                //
                                                                                                                     //
    return insertProject;                                                                                            //
  }(),                                                                                                               //
                                                                                                                     //
  removeProject: function () {                                                                                       // 10
    function removeProject(idProjeto) {                                                                              // 10
      Groups.remove(idProjeto);                                                                                      // 11
    }                                                                                                                //
                                                                                                                     //
    return removeProject;                                                                                            //
  }()                                                                                                                //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./lib/routes.js");
require("./controller/inicio.js");
require("./controller/layout.js");
require("./controller/projeto.js");
require("./server/methods.js");
require("./controller/main.js");
//# sourceMappingURL=app.js.map
