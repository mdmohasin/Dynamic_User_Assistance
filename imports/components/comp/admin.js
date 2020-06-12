import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import template from './comp.html';
import uiRouter from 'angular-ui-router';

class CompCtrl {

  constructor($scope, commonService,$state,$rootScope) {
    $rootScope.$state = $state; 
    $scope.viewModel(this);
    this.subscribe('content');
    var elements =document.body.querySelectorAll('button[type="button"],input[type="text"],input[type="button"], input[type="checkbox"],input[type="search"]');
    var contentsData = [];
	  var selectedId = '';
    for(var i = 0 ;i < elements.length; ++i){
	  var elemId = elements[i].id;
    if(elements[i].id &&  elemId!="contentId" && elemId!="dcc1" && elemId!="formSubmit"){
	     console.log(elements[i].id);
		    $(elements[i]).on('click', function(e){
		      //$('#staticBackdrop').modal('show');
			    //selectedId = this.id;
			    $("#contentId").val( this.id );
		   });
     }
  }
	
	$scope.contentDataController=function(){
      // e.preventDefault();  
	   var contentData = $("#contentVal").val();
	   var contentId = $("#contentId").val();
	   if(contentData && contentId){      
	     contentsData.push({
	      "elementId":$("#contentId").val(),
		   "type":$("#contentType").val(),
		   "content":$("#contentVal").val()
         });
     /*MongoDB content service call */    
      commonService.setContent({
        "elementId":$("#contentId").val(),
        "type":$("#contentType").val(),
        "content":$("#contentVal").val()
      });
	 	$('#dcc1').popover('hide');
		$('.toast').toast('show');
		this.closeForm();
	}
   console.log(contentsData);
	};
    
	$scope.openForm = function() {
    document.getElementById("myForm").style.display = "block";
 }

  $scope.closeForm = function() {
   document.getElementById("myForm").style.display = "none";
 } 
	
}   

}

const name = 'comp';

/* create a module*/
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  templateUrl:template,
  controllerAs: name,
  controller: CompCtrl
}).config(config);

/*admin route config*/
function config($stateProvider) {
  'ngInject';
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: template,
    controller:name
  });
}

/*register the controller*/
angular.module(name).controller(name, ['$scope','commonService','$state','$rootScope', CompCtrl]);
