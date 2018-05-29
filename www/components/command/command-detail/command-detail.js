/**
 * Created by Ets Simon on 03/06/2017.
 */

app

  .controller("CommandDetailCtrl",function($scope,Bills,$stateParams,BillProductSaleTypes,$ionicLoading){
    show($ionicLoading);
    var id=$stateParams.id;
    BillProductSaleTypes.getList({bill_id:id,_includes:'product_saletype.product,bill.customer'}).then(function(data){
      console.log(data);
      $scope.bills=data;
      hide($ionicLoading);
    });

  });
