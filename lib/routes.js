Router.route("/",{template: "home"});

Router.route("inicio", {template: "inicio"});

//Router.route("/app/projeto", {template: "projeto"});

Router.route('projeto', function () {
  this.render('projeto');
});

Router.configure({layoutTemplate: "layout"});