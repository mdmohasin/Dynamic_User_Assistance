import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './client.html';
import uiRouter from 'angular-ui-router';
class ClientCtrl {

  constructor($scope, commonService) {	  
   $scope.viewModel(this);
   this.subscribe('content');	
 }
}
 
/*create a module*/
const name = 'client';
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  templateUrl:template,
  controllerAs: name,
  controller: ['$scope','commonService', ClientCtrl]
}).config(config);

/*client route config*/
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('client', {
      url: '/client',
      templateUrl: template
    });
} 