const express = require('express');

const serves =require('./serves');


const router = express.Router();
// add ,update,delete in menue items
router.post('/admin/addProduct',serves.addProduct);
router.put('/admin/updateItem/:itemId', serves.updateRecord)
router.delete('/admin/deleteMenuItem/:itemId', serves.deleteRecord)

// Stock Routes 
router.get('/menuitems/getStockWithFilter/',serves.getStocksWithFilter);

//Bookings Routes
router.get('/booings/TableNumberFilter/:TableNumber',serves.getBookingWithTableNumberFilter);
router.get('/booings/NumberOfPeopleFilter/:NumberOfPeople',serves.getBookingWithNumberOfPeopleFilter);
//user routes
router.post('/menuitems/menueitem/rate',serves.calculateRating);
router.post('/user/addFavorite',serves.addItemAsFavorite);
router.delete('/user/DeleteFavorite',serves.deleteItemFromFavourite);
router.get('/user/getAllFavorites/:customerId',serves.getAllFavorites);


module.exports = router;
