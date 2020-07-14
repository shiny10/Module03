  
(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    //NarrowItDownController.$inject = ['$scope'];
    function NarrowItDownController(MenuSearchService) {
      

      var menu = this;
      menu.searchitem = "";
      menu.describe = "";
      
      menu.checkItems = function () {
        var promise = MenuSearchService.getMenuForCategory();
        menu.flag = 0;
        
        promise.then(function (response) {

          menu.foundItems = [];
          menu.item = response.data;
          console.log(menu.item['menu_items'].length);
          console.log(menu.searchitem.length);
          
          if(menu.searchitem.length!=0){
          for (var i = 0; i < menu.item['menu_items'].length; i++) {

            var name = menu.item['menu_items'][i]['description'];

           
            if (name.toLowerCase().indexOf(menu.searchitem) !== -1) {
              var temp = {
                name : menu.item['menu_items'][i]['name'],
                short_name : menu.item['menu_items'][i]['short_name'],
                description : menu.item['menu_items'][i]['description']
              };

              menu.foundItems.push(temp);
            }

          }}else{
            menu.flag = 1;
            menu.describe = "Nothing found!!";
          }
          
        })
        .catch(function (error) {
          console.log(error);
        })
      }; 


      menu.removeItem = function(itemIndex){
        menu.foundItems.splice(itemIndex,1);
        console.log(menu.foundItems);
      }
      
    }

   MenuSearchService.$inject = ['$http', 'ApiBasePath'];
   function MenuSearchService($http, ApiBasePath) {
    var service = this;


    service.getMenuForCategory = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    });

    return response;
  };

}
})();