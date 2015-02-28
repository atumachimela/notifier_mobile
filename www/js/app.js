// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'ngResource', 'lbServices', 'starter.controllers','ngCordova', 'gettext','nfcFilters'])


.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .config(['$httpProvider', function($httpProvider, gettextCatalog) {
    $httpProvider.defaults.withCredentials = true;
  }])



.factory('nfcService', function($rootScope, $ionicPlatform) {

    var tag = {};

    $ionicPlatform.ready(function() {

      nfc.addTagDiscoveredListener(function(nfcEvent) {

      }, function() {
        console.log("Listening for tag discovered");
      }, function() {
        console.
        nfc.addNdefListener(function(nfcEvent) {
          console.log(JSON.stringify(nfcEvent.tag, null, 4));
          log("Error adding listener");
        });

        nfc.erase(function() {

          var message = [
            ndef.textRecord("Balance is: 10"),
          ];

          nfc.write(message, function() {
            console.log("Wrote OK");
          }, function() {
            console.log("Write failed");
          });

        }, function() {

        });

        $rootScope.$apply(function() {
          angular.copy(nfcEvent.tag, tag);
          // if necessary $state.go('some-route')
        });
      }, function() {
        console.log("Listening for NDEF Tags.");
      }, function(reason) {
        alert("Error adding NFC Listener " + reason);
      });
    });
    return {
      tag: tag,
      clearTag: function() {
        angular.copy({}, this.tag);
      }
    };
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
      })
      .state('app.createAcoount', {
        url: "/createAccount",
        views: {
          'menuContent': {
            templateUrl: "templates/createAccount.html",
            // controller: 'MainController'
          }
        }
      })
      .state('app.editprofile', {
        url: "/editprofile",
        views: {
          'menuContent': {
            templateUrl: "templates/editProfile.html",
            // controller: 'MainController'
          }
        }
      })
      .state('app.viewprofile', {
        url: "/viewprofile",
        views: {
          'menuContent': {
            templateUrl: "templates/viewProfile.html",
            // controller: 'MainController'
          }
        }
      })
      .state('app.notify', {
        url: "/notify",
        views: {
          'menuContent': {
            templateUrl: "templates/notify.html",
            // controller: 'MainController'
          }
        }
      })
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "templates/home.html",
          // controller: 'CollectPaymentCtrl'
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });
