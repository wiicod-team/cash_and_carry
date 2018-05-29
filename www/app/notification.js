service

  .service('NotificationFactory' ,function (ONESIGNAL_APP_ID,$q,$state) {
    // console.log($cordovaOneSignal)

    var factory=  {
      notificationOpenedCallback : function(data) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(data));
        if(data.notification.isAppInFocus && false){

        }else{
          if(data.notification.payload.additionalData.channel === 'film_reminder'){
            factory.film_reminder(data)
          }
        }
      },
      init : function(){
        // $cordovaOneSignal
        if(angular.isDefined(window.plugins)&&window.plugins.OneSignal){
          window.plugins.OneSignal
            .startInit(ONESIGNAL_APP_ID)
            .handleNotificationOpened(this.notificationOpenedCallback)
            .endInit();
        }

      },
      getDeviceToken: function() {
        var defer = $q.defer();
        // $cordovaOneSignal
        if(angular.isDefined(window.plugins)&&window.plugins.OneSignal){
          window.plugins.OneSignal
            .getPermissionSubscriptionState(function(status) {

              /*status.permissionStatus.hasPrompted;
              status.permissionStatus.status;

              status.subscriptionStatus.subscribed;
              status.subscriptionStatus.userSubscriptionSetting;
              status.subscriptionStatus.pushToken;*/

              //var playerID = status.subscriptionStatus.userId;
              defer.resolve(status.subscriptionStatus.userId);
            },function (err) {
              console.log(err);
            });
        }else {
          defer.reject('onesignal not installed');
        }
        return defer.promise;
      },
      film_reminder:function (notif) {
        if(notif.action.actionID === "film"){
          $state.go('app.detail',{
              id:notif.notification.payload.additionalData.film_id,
            schedule_id:notif.notification.payload.additionalData.schedule_id}
            );
        }else if(notif.action.actionID === "ticket"){
          $state.go('app.tickets');
        }
      }
    }

    return factory;

  });
