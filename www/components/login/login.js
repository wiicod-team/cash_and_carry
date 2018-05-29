app
  .controller("LoginCtrl",function($scope,Auth,$state,$cookies){
    $scope.doLogin=function(user){
      console.log(user);
      Auth.login(user).then(function (data) {
        //console.log(data);
        $cookies.putObject("user",data.user);
        $state.go('app.home');
      },function(q){console.log(q);})
    };
  })
