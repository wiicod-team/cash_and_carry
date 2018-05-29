app
  .controller("SuggestionCtrl",function($scope,Suggestions,$auth,Auth,ToastApi,$ionicLoading){
    var user={};

    $scope.saveSuggestion=function(s){
      show($ionicLoading);
      $scope.s={content:""};
      if($auth.isAuthenticated()){
        Auth.getContext().then(function(data){
          $scope.user=data;
          s.user_id=$scope.user.id;
          Suggestions.post(s).then(function(data){
            ToastApi.success({msg:"Suggestion enregistrée"});
            s={content:""};
            hide($ionicLoading);
          },function(q){console.log(q)});
        })
      }
      else{

      }

    };


  });
