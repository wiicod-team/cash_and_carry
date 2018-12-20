/**
 * Created by Ets Simon on 03/06/2017.
 */

app

  .controller("CommandListCtrl",function($scope,Bills,InfiniteLoad,Auth,Depots,$ionicLoading,Cashiers){
    show($ionicLoading);
    $scope.can_sell=false;
    if(Auth.isLogged()==true){
      Auth.getContext().then(function(data){
        $scope.user=data;
        if($scope.user.seller==undefined){
          // caisse
          // recuperation du depot
          Cashiers.getList({user_id:$scope.user.id}).then(function(data){
            var depot_id=data[0].depot_id;
            // recuperation des factures de ce depot
            var options={
              "should_paginate":false,
              "_sort":"created_at",
              "_sortDir":"desc",
              "seller-fk":"depot_id="+depot_id,
              _includes: 'product_saletypes.product,customer,seller'
            };
            charger_factures(Bills,$scope,options,$ionicLoading);
          })
        }
        else{
          $scope.can_sell=true;
          // recuperation du depot
          Depots.get($scope.user.seller.depot.id,{_includes:"saletypes"}).then(function(d){
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
          charger_factures(Bills,$scope,options,$ionicLoading);
          //charger_factures(InfiniteLoad,Bills,options,$scope);
        }

        // recuperation du depot

      })
    }
    else{
      console.log("not logged")
    }

  });




function charger_factures(Bills,$scope,options,$ionicLoading){
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
}
