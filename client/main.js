import angular from 'angular';
import angularMeteor from 'angular-meteor';
import admin from '../imports/components/comp/admin';
import client from '../imports/components/comp/client';
import '../imports/startup/accounts-config.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import commonService from './commonService';
import uiRouter from 'angular-ui-router';

angular.module('dynamic_user_assistance', [
  angularMeteor,
  uiRouter,
  admin.name,
  client.name
]).service("commonService", commonService);

angular.module('dynamic_user_assistance').controller('dynamic_user_assistance', ['$scope','$state','$rootScope',
    function ($scope,$state,$rootScope) {
    $rootScope.$state = $state;
	  }]);

    function config($locationProvider, $urlRouterProvider) { 
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/client');
    }

    angular.module("dynamic_user_assistance").config(config);  
    
	
function onReady() {
  angular.bootstrap(document, ['dynamic_user_assistance']);
  $('[data-toggle="tooltip"]').tooltip();
  $('#defaultPop').tooltip('show') ;
  $('.toast').toast({autohide:true,delay:2000,animation:true});
  //$('[data-toggle="popover"]').popover();
  $('#dcc1').popover({placement:"top",html: true, 
	sanitize: false}); 
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
