var templateservicemod = angular.module('templateservicemod', []);
templateservicemod.service('TemplateService', function() {
  this.title = "Home";
  this.meta = "Google";
  this.metadesc = "Home";

  var d = new Date();
  this.year = d.getFullYear();

  this.init = function() {
    this.headermenu = "views/headermenu.html";
    this.header = "frontend/views/header.html";
    this.menu = "frontend/views/menu.html";
    this.sidemenu = "frontend/views/sidemenu.html";
    this.slider = "frontend/views/slider.html";
    this.content = "frontend/views/content.html";
    this.footermenu = "frontend/views/footermenu.html";
    this.footer = "frontend/views/footer.html";
  };

  this.changecontent = function(page) {
    this.init();
    var data = this;
    data.content = "frontend/views/content/" + page + ".html";
    return data;
  };

  this.init();

});
