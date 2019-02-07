
/* Dependencies */
var mongoose = require('mongoose'),
    Listing = require('../models/listings.server.model.js'),
    config = require('../config/config.js');

//mongoose.connect('mongodb://prendesoDB:Melba2711DB@ds059692.mlab.com:59692/bootcamp3-google-cloud');
mongoose.connect(config.db.uri);
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }

  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.body;

  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */

  //Listing.findByIdAndUpdate({_id: listing._id}, {$set: req.body}, function (err, listing_) {
  Listing.findByIdAndUpdate(req.params.listingId, listing, {new: true}, function(err, updatedListing){
    if(err) {
      res.status(400).send(err);
      console.log("error updating");
    }
    else {
      //listing.save();
      res.status(200).send(updatedListing);
      console.log("success updating");
    }
  });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  /* TODO */
  /* Remove the article */
  Listing.find({_id: listing._id}).remove(function(err){
    if(err) {
      res.status(400).send(err);
      console.log("error deleting");
    }
    else {
      res.status(200).send(listing);
      console.log("success deleting");
    }
  });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  var listing = req.listing;
  /** TODO **/
  /* Your code here */
  //var MongoClient = require('mongodb').MongoClient;
  //var url = "mongodb://localhost:27017/";

  //MongoClient.connect(url, function(err, db) {
  //if (err) throw err;;


  var mySort = {code: 1};
  Listing.find({}).sort(mySort).exec(function (err, each) {
    if (err) {
      console.log(err);
      res.status(404).send(err);
      console.log('error sorting');
    } else {
        res.status(200).json(each);
      console.log('succeed sorting');
    }
  });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.

  Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};