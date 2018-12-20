/**
 * Created by Ets Simon on 03/06/2017.
 */
resources

  .factory('Bills',function(API){
    return API.service('bills').withHttpConfig({ cache: true});
  })
  .factory('BillProductSaleTypes',function(API){
    return API.service('bill_product_saletypes').withHttpConfig({ cache: true});
  })
  .factory('Categories',function(API){
    return API.service('categories').withHttpConfig({ cache: true});
  })
  .factory('Cashiers',function(API){
    return API.service('cashiers').withHttpConfig({ cache: true});
  })
  .factory('Customers',function(API){
    return API.service('customers').withHttpConfig({ cache: true});
  })
  .factory('CustomerTypeSellers',function(API){
    return API.service('customer_type_sellers').withHttpConfig({ cache: true});
  })
  .factory('Diaries',function(API){
    return API.service('diaries').withHttpConfig({ cache: true});
  })
  .factory('Depots',function(API){
    return API.service('depots').withHttpConfig({ cache: true});
  })
  .factory('DepotSaletypes',function(API){
    return API.service('depot_saletypes').withHttpConfig({ cache: true});
  })
  .factory('PaymentMethods',function(API){
    return API.service('paymentmethods').withHttpConfig({ cache: true});
  })
  .factory('Products',function(API){
    return API.service('products').withHttpConfig({ cache: true});
  })
  .factory('SaleTargets',function(API){
    return API.service('saletargets').withHttpConfig({ cache: true});
  })
  .factory('Saletypes',function(API){
    return API.service('saletypes').withHttpConfig({ cache: true});
  })
  .factory('Sellers',function(API){
    return API.service('sellers').withHttpConfig({ cache: true});
  })
  .factory('Stocks',function(API){
    return API.service('stocks').withHttpConfig({ cache: true});
  })
  .factory('Suggestions',function(API){
    return API.service('suggestions').withHttpConfig({ cache: true});
  })
