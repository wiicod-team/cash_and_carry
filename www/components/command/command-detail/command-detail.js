/**
 * Created by Ets Simon on 03/06/2017.
 */

app

  .controller("CommandDetailCtrl",function($scope,Bills,$stateParams,BillProductSaleTypes,$ionicLoading,Cashiers,Auth,$cordovaInAppBrowser,$filter,ToastApi){
    show($ionicLoading);
    if(Auth.isLogged()==true){
      Auth.getContext().then(function(data){
        $scope.user=data;
        Cashiers.getList({depot_id:1}).then(function(data){
          console.log(data);
          angular.forEach(data,function(v,k){
            if($scope.user.id== v.user_id){
              $scope.can_sign=true;
              $scope.cashier_id= v.id;
              hide($ionicLoading);
            }
          })
        });
      })
    }
    $scope.can_sign=false;
    var id=$stateParams.id;
    BillProductSaleTypes.getList({bill_id:id,_includes:'product_saletype.product,bill.customer'}).then(function(data){
      $scope.bills=data;
      $scope.statut=data[0].bill.status;
    });


    $scope.openPDF=function(url){
      var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
      };
      $cordovaInAppBrowser.open(url, '_blank', options)
        .then(function(event) {

        })
    };

    $scope.cashIn=function(b){
      // route pour la validation du ticket
      console.log(b.id);
      Bills.getList({"should_paginate":false}).then(function (data) {
        var bill=$filter('filter')(data,{id: b.id},true)[0];
        console.log(data,bill);
        bill.status=3;
        bill.cashier_id=$scope.cashier_id;
        bill.put().then(function(f){
          console.log("update",f);
          $scope.statut= f.status;
          ToastApi.success({msg:"COmmande approuvée"})
        },function(q){
          console.log(q);
        });
      })
    }

  });
