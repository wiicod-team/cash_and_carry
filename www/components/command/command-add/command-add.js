/**
 * Created by Ets Simon on 03/06/2017.
 */

app

  .controller("CommandAddCtrl",function($scope,Bills,InfiniteLoad,Auth,$stateParams,Stocks,ToastApi,BillProductSaleTypes,Sellers,$ionicLoading){
    show($ionicLoading);
    var depot_id=$stateParams.depot;
    var saletype=$stateParams.saletype;

    $scope.commande={total:0,produits:[]};



    if(Auth.isLogged()==true){
      Auth.getContext().then(function(data){
        //console.log(data);
        $scope.user=data;

        // recuperation des tables /clients
        $scope.customers=[];
        Sellers.get($scope.user.seller.id,{_includes:"customer_types.customers",town_id:$scope.user.seller.depot.town_id}).then(function(c){
          //console.log(c);
          angular.forEach(c.data.customer_types,function(v,k){
            angular.forEach(v.customers,function(vv,kk){
              $scope.customers.push(vv);
            })

          });
          //console.log("f",$scope.clients);
        },function(q){
          console.log(q);
        });

        // recuperation des produits
        var options = {
          depot_id : depot_id,
          'product_saletype-fk' : 'saletype_id='+saletype,
          _includes: 'product_saletype.product.category',
          should_paginate:false
        };
        Stocks.getList(options).then(function(stocks){
          $scope.stocks = stocks;
          // groupage par category
          var tb= _.groupBy(stocks,"product_saletype.product.category.name");
          $scope.products=[];
          angular.forEach(tb,function(v,k){
            $scope.products.push({
              category:k,
              products:v
            })
          });
          hide($ionicLoading);
        },function(q){
          console.log(q);
        });
      })
    }
    else{
      console.log("not logged")
    }

    $scope.addProduct=function(p){
      if(p.quantity>0){
        var t= _.find($scope.commande.produits,function(produit){
          if(p.id==produit.id){
            return p;
          }
        });

        if(t==null){
          //nouveau produits comme
          p.command_quantity=1;
          $scope.commande.produits.push(p);
        }
        else{
          if(t.quantity>t.command_quantity)
          {
            t.command_quantity+=1;
          }
          else{
            ToastApi.error({msg:$translate.instant("COMMANDE.ARG_23")});
          }
        }
        //p.command_quantity= t.command_quantity;
        $scope.commande.total=prix_total($scope.commande.produits);
        $scope.if_payer=true;
      }
      else{
        ToastApi.error({msg:$translate.instant("COMMANDE.ARG_23")});
      }

    };

    $scope.removeProduct=function(p) {
      if(p.command_quantity>0){
        var index= _.indexOf($scope.commande.produits,p);
        $scope.commande.produits[index].command_quantity--;
        if(p.command_quantity==0){
          $scope.commande.produits.splice(index,1)
          ToastApi.success({msg:"Supprimé"});
        }
      }
      $scope.commande.total=prix_total($scope.commande.produits);
    };


    $scope.buy=function(){
      show($ionicLoading);
      var c=$scope.commande;
      var bill={};
      var d =new Date();

      bill.status=0;

      bill.deadline= d;

      bill.discount= 0;
      bill.customer_id= c.customer_id;
      bill.paymentmethod_id= 3; //espece
      bill.seller_id=$scope.user.seller.id;
      console.log(bill);
      // enregistrement de la facture
      Bills.post(bill).then(function(f){
        //console.log(f);
        f.id= f.data.id;
        // enregistrement du bill_product_saletype
        var i=0;
        var temp=$scope.commande.produits;
        angular.forEach($scope.commande.produits,function(v,k){
          BillProductSaleTypes.post({quantity:v.command_quantity,bill_id:f.data.id,product_saletype_id:v.product_saletype_id}).then(function(b){
            i++;
            //console.log(i,temp);
            if(i==temp.length){
              // changement du statut de la facture
              f.status=1;
              f.put().then(function(fe){
                console.log(fe);
              },function(q){
                console.log(q);
              });
              hide($ionicLoading);
            }
          },function(q){console.log(q)});

        });
        $scope.commande={total:0,produits:[]};
        angular.forEach($scope.products,function(v,k){
          angular.forEach(v.products,function(vv,kk){
            vv.command_quantity=0;
          })
        });
        $scope.remise=0;

        ToastApi.success({msg:"Commande validée"});
      },function(q){
        console.log(q);
      });
      // TODO: impression des factures e tenvoi des mail
    };
  });

function prix_total(produits){
  var total=0;
  _.each(produits,function(p){
    total+= p.command_quantity* p.product_saletype.price;
  });
  return total;
}
