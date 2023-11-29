const express = require('express');

const serves =require('./serves');


const router = express.Router();
// add ,update,delete in menue items
router.post('/admin/addProduct',serves.addProduct);
router.put('/admin/updateItem/:itemId', serves.updateRecord)
router.delete('/admin/deleteMenuItem/:itemId', serves.deleteRecord)

// Stock Routes 
router.get('/menuitems/ratingFilter/:rating',serves.getStocksWithRatingFilter);
router.get('/menuitems/priceFilter/:price',serves.getStocksWithPriceFilter);
router.get('/menuitems/TimesOrderedFilter/:times',serves.getStocksWithTimesOrderedFilter);
//Bookings Routes
router.get('/booings/TableNumberFilter/:TableNumber',serves.getBookingWithTableNumberFilter);
router.get('/booings/NumberOfPeopleFilter/:NumberOfPeople',serves.getBookingWithNumberOfPeopleFilter);
//user routes
router.post('/menuitems/menueitem/rate',serves.calculateRating);
router.post('/user/addFavorite',serves.addItemAsFavorite);
router.delete('/user/DeleteFavorite',serves.deleteItemFromFavourite);
router.get('/user/getAllFavorites/:customerId',serves.getAllFavorites);


module.exports = router;
