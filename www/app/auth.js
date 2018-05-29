/**
 * Created by Ets Simon on 03/06/2017.
 */


auth

  .factory('Auth', function (API,ToastApi, $auth, AclService,$q,$rootScope) {

    return {
      isLogged: function () {
        return $auth.isAuthenticated();
      },
      login: function (credentials) {
        var defer = $q.defer();

        $auth.login(credentials).then(function (response) {
          var data = response.data.data;
          angular.forEach(data.userRole, function (value) {
            AclService.attachRole(value)
          });

          AclService.setAbilities(data.abilities);
          $auth.setToken(response.data);
          defer.resolve(response.data);
        },function(error){
          if(error.status==401){
            var errors = error.data.errors;
            for (var key in errors) {
              if (errors.hasOwnProperty(key)) {
                var txt = errors[key][0];
                for (var i = 1; i < errors[key].length; i++) {
                  txt += "<br>" + errors[key][i];
                }
                key = key.split("_").join(" ");
                ToastApi.error({'msg': txt})
              }
            }
          }
          defer.reject(error)
        });
        return defer.promise;
      },
      logout: function () {
        var defer = $q.defer();

        $auth.logout().then(function () {
          delete $rootScope.me
          AclService.flushRoles()
          AclService.setAbilities({})
          defer.resolve(true);
        })
        return defer.promise;
      },

      getContext: function (fresh) {
        fresh = fresh || false;
        var defer = $q.defer();
        if ($auth.isAuthenticated()) {
          var UserData = API.service('me', API.all('users'));

          if($rootScope.me&&!fresh){
            defer.resolve($rootScope.me);
          }else{
            UserData.one().get().then(function (data) {
              $rootScope.me = data.data.data;
              defer.resolve($rootScope.me);
            })
          }
          return defer.promise;


        } else {
          defer.reject('not logge')
          return defer.promise;
        }
      },

      me: function (cb) {
        $rootScope.$watch('me', function (nv) {
          cb(nv)
        })
      }
    }

  });
