/**
 * Created by Ets Simon on 03/06/2017.
 */

config.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'tabs/tabs.html',
      controller: 'TabsCtrl'
    })

    .state('auth', {
      url: '/auth',
      abstract: true,
      templateUrl: 'auth/auth_menu.html'
    })

    .state('auth.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'login/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'home/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.suggestion', {
      url: '/suggestion',
      views: {
        'menuContent': {
          templateUrl: 'suggestion/suggestion.html',
          controller: 'SuggestionCtrl'
        }
      }
    })
    .state('app.command-list', {
      url: '/command-list',
      views: {
        'menuContent': {
          templateUrl: 'command/command-list/command-list.html',
          controller: 'CommandListCtrl'
        }
      }
    })
    .state('app.command-add', {
      url: '/command-add/:depot/:saletype/:commande_memo_id?',
      views: {
        'menuContent': {
          templateUrl: 'command/command-add/command-add.html',
          controller: 'CommandAddCtrl'
        }
      }
    })
    .state('app.command-detail', {
      url: '/command-detail/:id',
      views: {
        'menuContent': {
          templateUrl: 'command/command-detail/command-detail.html',
          controller: 'CommandDetailCtrl'
        }
      }
    })
    .state('app.statistic', {
      url: '/statistic',
      views: {
        'menuContent': {
          templateUrl: 'statistic/statistic.html',
          controller: 'StatisticCtrl'
        }
      }
    })
    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'about/about.html'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/auth/login');

   $urlRouterProvider.otherwise('/auth/login');
});


