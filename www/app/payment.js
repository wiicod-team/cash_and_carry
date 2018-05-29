service

  .service('PaymentFactory' ,function (API,$q) {
    // console.log($cordovaOneSignal)

    var factory=  {

      token : undefined,
      init : function(){
        var defer = $q.defer();

        if(angular.isDefined(factory.token)){
          defer.resolve(factory.token);
        }else{
          API.one('buy_ticket/get_token').get().then(function (data) {
            factory.token = data.data.token;
            BraintreePlugin.initialize(factory.token,
              function () {
                console.log("braintree init OK!");
                defer.resolve(factory.token)
              },
              function (error) {
                console.log(error);
              defer.reject(error);
            });

          },function (err) {
            console.log(err);
            defer.reject(err);
          });
        }

        return defer.promise;

      },
      show_dropdown: function () {
        var defer = $q.defer();
        var options = {
          amount: "1500",
          primaryDescription: "Achat de 1 ticket pour le film Black panther"
        };
        factory.init().then(function (token) {
          BraintreePlugin.presentDropInPaymentUI(options, function (result) {

            defer.resolve(result)
          },function (error) {
            console.log('error',error);
            defer.reject(error);
          } );
        },function (err) {
          defer.reject(err);
        });
        return defer.promise
      },
      buy: function (data) {
        var defer = $q.defer();
        factory.show_dropdown().then(function (result) {
          console.log(result)
          if (result.userCancelled) {
            console.debug("User cancelled payment dialog.");
          }
          else {
            data.nonce = result.nonce;
            if(result.type == "PayPal"){

              var p = _.filter(data.paymentmethods, function(d) { return d.code == 'pa' })[0];
              data.paymentmethod_id = p.id;
              API.service('buy_ticket/buy').post(data).then(function(d){
                console.log(d);
                defer.resolve(d);
              }, function(err) {
                defer.reject(err);
              });
            }else{
              var p = _.filter(data.paymentmethods, function(d) { return d.code == 'ca' })[0];
              data.paymentmethod_id = p.id;
              API.service('buy_ticket/buy').post(data).then(function(d){
                console.log(d);
                defer.resolve(d);
              }, function(err) {
                defer.reject(err);
              });
            }

          }
        },function (err) {
          defer.reject(err);
        });

        return defer.promise
      }

    }

    return factory;

  })
  .service('OmPayment',function(API,$q,$cordovaInAppBrowser){
    var factory = {


      api_data:undefined,
      open:function (url) {
        var q = $q.defer();
        var options = {
          location: 'yes',
          clearcache: 'yes',
          toolbar: 'no'
        };
        document.addEventListener("deviceready", function () {

          $cordovaInAppBrowser.open(url, '_blank', options)
            .then(function(event) {
             // factory.api_data=undefined;
              console.log('ok',event)
              q.resolve(event)

            })
            .catch(function(event) {
              // error
              factory.api_data=undefined;
              q.reject(event);
              console.log('nok',event)
             // console.log('erroappbroser',event);

            });


          // $cordovaInAppBrowser.close();

       }, false);
        return q.promise;
      },

      buy: function (schedule_id) {
        var q = $q.defer();
        if(factory.api_data&&factory.api_data.payment_url){
          var d = factory.api_data;
          factory.open(factory.api_data.payment_url).then(function (da) {
            console.log('da',da)
          /*  API.service('buy_ticket/get_om_ticket').get(d.notif_token).then(function(ti){
              console.log(ti);
              q.resolve(ti);
            },function (err) {
              q.reject(err);
            });*/
          });
        }else{
          API.service('buy_ticket/get_om_url').get(schedule_id).then(function(rep){
            var d = rep.data;
            factory.api_data=d;
            factory.open(factory.api_data.payment_url).then(function (da) {
              console.log('da',da)
             /* API.service('buy_ticket/get_om_ticket').get(d.notif_token).then(function(ti){
                console.log(ti);
                q.resolve(ti);
              },function (err) {
                q.reject(err);
              });*/
            });
          },function (err) {
            q.reject(err);
          });
        }
        return q.promise;

      }
    };
    return factory;
  })
;
