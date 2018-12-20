/**
 * Created by Ets Simon on 03/06/2017.
 */
filter
    .filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }])

  .filter('billStatus', function ($translate) {
    return function(statut) {
      if(statut=='expired')
      {
        return "Echue";
      }
      else if(statut=='waiting_customer_approval'){
        return "En attente visa client";
      }
      else if(statut=='waiting_cashier_approval'){
        return "En attente visa caisse";
      }
      else if(statut=='canceled'){
        return "Extournée";
      }
      else if(statut=='paided'){
        return "Payée";
      }

    };
  })

    .filter('ticketStatus', function ($translate) {
      return function(statut) {
        if(statut=='used')
        {
          return $translate.instant("tickets_list_comp.used");
        }
        else if(statut=='paid'){
          return $translate.instant("tickets_list_comp.paid");
        }
        else if(statut=='new'){
          return $translate.instant("tickets_list_comp.new");
        }
        else if(statut=='unpaid'){
          return $translate.instant("tickets_list_comp.unpaid");
        }

      };
    })

    .filter('priceFormat', function () {
      return function (price) {

        if(price==undefined){
          return "";
        }
        else{
          price += "";
          var tab = price.split('');
          var p = "";
          for (i = tab.length; i > 0; i--) {
            if (i % 3 == 0) {
              p += " ";
            }
            p += tab[tab.length - i];
          }
          return p;
        }
      }
    })

    .filter('roundCoin',function(){

        return function (value,step,up){
            if(up==undefined){
                up=true;
            }
            if(value==undefined)
                return;
            var offset =step||5;
            if(up){
                return parseFloat((Math.ceil(value/offset)*offset).toFixed(2));
            }else{

                return parseFloat((Math.floor(value/offset)*offset).toFixed(2));
            }
        }
    })

  .filter('heureFormat',function(){

        return function (value,bool){
          if(value!=undefined){
            if(bool && value.split(" ").length>1){
              console.log("la");
              var q1=value.split(" ")[0].split("-");
              var heure=value.split(" ")[1];
              var detail=heure.split(":");
              return q1[2]+"-"+q1[1]+"-"+q1[0]+" "+detail[0]+"h"+detail[1];
            }
            else{
              if( value.split(" ").length>1){
                var heure=value.split(" ")[1];
                var detail=heure.split(":");
                return detail[0]+"h"+detail[1];
              }
              else{
                var detail=value.split(":");
                return detail[0]+"h"+detail[1];
              }
            }
          }
        }
    });
