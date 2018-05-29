/**
 * Created by Ets Simon on 03/06/2017.
 */

app

  .controller("CommandListCtrl",function($scope,Bills,InfiniteLoad,Auth,Depots,$ionicLoading){
    show($ionicLoading);

    if(Auth.isLogged()==true){
      Auth.getContext().then(function(data){
        $scope.user=data;

        // recuperation du depot
        // recuperation du depot
        Depots.get($scope.user.seller.depot.id,{_includes:"saletypes"}).then(function(d){
          console.log('depot',d);
          $scope.depot_id= d.data.id;

          $scope.saletypes= d.data.saletypes;
        },function(q){
          console.log(q);
        });


        //console.log("User",user);
        var options  ={
          "seller_id":$scope.user.seller.id,
          //"per_page":20,
          "should_paginate":false,
          "_sort":"created_at",
          "_sortDir":"desc",
          _includes: 'product_saletypes.product,customer,seller'
        };
        //console.log($scope.user,options);
        Bills.getList(options).then(function(data){
          angular.forEach(data,function(v,k){
            v.date=moment(new Date(v.created_at)).format("DD MMM YYYY");
          });

          var tb= _.groupBy(data,'date');
          $scope.bills=[];
          angular.forEach(tb,function(v,k){
            $scope.bills.push({
              date:k,
              factures:v,
              somme: _.reduce(v,function(memo,num){return memo+num.amount;},0)
            })
          });
          hide($ionicLoading);
          console.log($scope.bills);
        });
        //charger_factures(InfiniteLoad,Bills,options,$scope);
      })
    }
    else{
      console.log("not logged")
    }

  });



function charger_factures(InfiniteLoad,resource,options,scope){
  console.log("ici");
  scope.inf = new InfiniteLoad(resource,options);
  console.log(scope.inf);
  scope.nextPage = function () {
    console.log("s");
    scope.inf.nextPage().then(function (data) {
        console.log(data);
        scope.factures_historique = data;
      }
    );
  }
}
