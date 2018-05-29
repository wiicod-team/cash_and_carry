// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var date_format="Y-M-D";
var config = angular.module('cc.config',[
  "ui.router",
  'ionic',
  'pascalprecht.translate',
  'satellizer',
  'restangular',
  'mm.acl'
]);
var filter =  angular.module('cc.filter',["ui.router"]);
var service=angular.module('cc.service',["ui.router"]);
var resources=angular.module('cc.resources',["ui.router"]);
var auth=angular.module('cc.auth',["ui.router"]);
var app = angular.module('cc', [
    "ui.router",
  'cc.service',
  'cc.auth',
  'cc.filter',
  'cc.config',
    'cc.resources',
    "restangular",
    "ngCookies",
    "angularUtils.directives.dirPagination",
    'ionic',
    'templates',
    'ionic-toast',
    'ngStorage',
    'mm.acl',
    'infinite-scroll',
    'ngMap',
    'satellizer',
    'ngCordova',
  'angularMoment'
  // 'ionic.native'
  ])



.run(function($ionicPlatform,NotificationFactory,BRAINTREE_TOKEN,$rootScope,$timeout,ToastApi,$state,$ionicLoading) {
  $ionicPlatform.ready(function() {
    $rootScope.count=0;

    moment.locale("fr");

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //NotificationFactory.init();
    //console.log($state);

    $ionicPlatform.on('offline',function(){
      ToastApi.info({msg: "Vous n'êtes pas connecter à internet"});
    });

    $rootScope.show = function() {
      $ionicLoading.show({
        template: 'Chargement...'
      }).then(function(){
        console.log("The loading indicator is now displayed");
      });
    };
    $rootScope.hide = function(){
      $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });
    };


    $ionicPlatform.registerBackButtonAction(function (e) {
      if($rootScope.count>1) {
        navigator.app.exitApp();
      } else {
        //handle back action!
        if($state.current.name=="app.home"){
          ToastApi.info({msg: "Appuyer 2 fois pour quitter l'application"+JSON.stringify(e)});
          $rootScope.count+=1;
          $timeout(function(){
            $rootScope.count=0;
          },2000);
        }
        else{
          triggerBackButton();
        }
      }
    }, 1);


  });
});

function triggerBackButton() {
  var backButtonEvent = document.createEvent('Events');
  backButtonEvent.initEvent('backbutton', false, false);
  document.dispatchEvent(backButtonEvent);
}

function show($ionicLoading) {
  $ionicLoading.show({
    template: 'Chargement...'
  }).then(function(){
  });
};
function hide($ionicLoading){
  $ionicLoading.hide().then(function(){
  });
};
