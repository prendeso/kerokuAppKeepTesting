angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('https://afternoon-stream-97491.herokuapp.com/api/listings');
    },
	
	create: function(listing) {
	  return $http.post('https://afternoon-stream-97491.herokuapp.com/api/listings', listing);
    }, 

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
	   //return $http.delete('http://localhost:8080/api/listings/', id);
        return $http.delete('https://afternoon-stream-97491.herokuapp.com/api/listings' + id, id );

    }
  };

  return methods;
});
