angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {

      /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;
    /*$scope.addListing = function() {
	  /!**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 *!/
      $scope.properties_ = {
          code:'',
          name:'',
          address:''
      };

      $scope.add = function () {

              var newListing = $scope.properties_;
              Listings.create(newListing);
              newListing.code = $scope.properties_.code;
              newListing.code = $scope.properties_.name;
              newListing.code = $scope.properties_.address;

              Listings.getAll().then(function(response) {
                  $scope.listings = response.data;
              }, function(error) {
                  console.log('Unable to retrieve listings:', error);
              });
              $scope.listings.push(newListing);
      };
    };*/

      $scope.addListing = function() {

          $scope.newBuilding =
              {
                  code:$scope.code,
                  name:$scope.name,
                  address:$scope.address
              };
          let temp = $scope.newBuilding;

          Listings.create(temp);
          $scope.listings.push(temp);
          Listings.getAll();


          };

    $scope.deleteListing = function(id) {
        /**TODO
         Delete the article using the Listings factory. If the removal is successful,
         navigate back to 'listing.list'. Otherwise, display the error.
         */
//        var item = $scope.listings.indexOf(id);



        Listings.delete($scope.listings[id]._id);
        $scope.listings.splice(id, 1);
        Listings.getAll();




        //Listings.delete({id: _id});

        /*Listings.getAll().then(function(response) {
            $scope.listings = response.data;
        }, function(error) {
            console.log('Unable to retrieve listings:', error);
        });
*/
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);