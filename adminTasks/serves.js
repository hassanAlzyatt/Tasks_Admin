const db = require('./db');

const addProduct= async (req, res) => {
    try {
      const { itemId, name, inStock, description, rating, price, timesOrdered, image } = req.body;
      await new Promise((resolve, reject) => {
        const query = 'INSERT INTO menuitems (itemId, name, inStock, description, rating, price, timesOrdered, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [itemId, name, inStock, description, rating, price, timesOrdered, image], (err, result) => {
          if (err) {
            console.error('Error adding product: ', err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      res.status(200).json({ message: 'Product added successfully' });
    } catch (err) {
      console.error('Failed to add product: ', err);
      res.status(500).json({ error: 'Failed to add product' });
    }
  };
  
  const deleteRecord =async (req, res) => {
    try {
      const itemId = req.params.itemId;
  
      const checkQuery = 'SELECT COUNT(*) AS count FROM menuitems WHERE itemId = ?';
      const deleteQuery = 'DELETE FROM menuitems WHERE itemId = ?';
  
      const checkResult = await new Promise((resolve, reject) => {
        db.query(checkQuery, [itemId], (err, result) => {
          if (err) {
            console.error('Error checking record existence: ', err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      const count = checkResult[0].count;
  
      if (count > 0) {
        await new Promise((resolve, reject) => {
          db.query(deleteQuery, [itemId], (err, result) => {
            if (err) {
              console.error('Error deleting record: ', err);
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
        res.status(200).json({ message: 'Record deleted successfully' });
      } else {
        res.status(404).json({ error: 'Record not found' });
      }
    } catch (err) {
      console.error('Failed to delete record: ', err);
      res.status(500).json({ error: 'Failed to delete record' });
    }
  };

  const updateRecord= async (req, res) => {
    try {
      const itemId = req.params.itemId;
      const { name, inStock, description, rating, price, timesOrdered, image } = req.body;
      const checkItemQuery = 'SELECT * FROM menuitems WHERE itemId = ?';
      const updateQuery = `
        UPDATE menuitems
        SET name = ?, inStock = ?, description = ?, rating = ?, price = ?, timesOrdered = ?, image = ?
        WHERE itemId = ?
      `;
  
      const checkItemResult = await new Promise((resolve, reject) => {
        db.query(checkItemQuery, [itemId], (err, results) => {
          if (err) {
            console.error('Error checking item: ' + err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
  
      if (checkItemResult.length === 0) {
        res.status(404).send('Item not found');
        return;
      }
  
      await new Promise((resolve, reject) => {
        db.query(updateQuery, [name, inStock, description, rating, price, timesOrdered, image, itemId], (err, updateResult) => {
          if (err) {
            console.error('Error updating record: ' + err);
            reject(err);
          } else {
            resolve(updateResult);
          }
        });
      });
  
      res.status(200).send('Record updated successfully');
    } catch (err) {
      console.error('Error updating record: ' + err);
      res.status(500).send('Error updating record');
    }
  };
   //////////////////////////////////////////////////// get api ///////////////////////
   // Stock 
   // get all menue items that its Rating > = 
   const getStocksWithRatingFilter =async (req, res) => {
    try {
      const ratingThreshold = req.params.rating;
      const query = 'SELECT * FROM menuitems WHERE rating >= ?';
  
      const menuItems = await new Promise((resolve, reject) => {
        db.query(query, [ratingThreshold], (err, results) => {
          if (err) {
            console.error('Error retrieving menu items: ' + err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
  
      res.status(200).json(menuItems);
    } catch (err) {
      console.error('Error retrieving menu items: ' + err);
      res.status(500).send('Error retrieving menu items');
    }
  };
 // get all menue items that its  price > =
  const getStocksWithPriceFilter =async (req, res) => {
    try {
      const priceThreshold = req.params.price;
      const query = 'SELECT * FROM menuitems WHERE price >= ?';
  
      const menuItems = await new Promise((resolve, reject) => {
        db.query(query, [priceThreshold], (err, results) => {
          if (err) {
            console.error('Error retrieving menu items: ' + err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
  
      res.status(200).json(menuItems);
    } catch (err) {
      console.error('Error retrieving menu items: ' + err);
      res.status(500).send('Error retrieving menu items');
    }
  };
  //  get all menue items that its timesOrdered > = 
  const getStocksWithTimesOrderedFilter =async (req, res) => {
    try {
      const TimesThreshold = req.params.times;
      const query = 'SELECT * FROM menuitems WHERE timesOrdered >= ?';
  
      const menuItems = await new Promise((resolve, reject) => {
        db.query(query, [TimesThreshold], (err, results) => {
          if (err) {
            console.error('Error retrieving menu items: ' + err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
  
      res.status(200).json(menuItems);
    } catch (err) {
      console.error('Error retrieving menu items: ' + err);
      res.status(500).send('Error retrieving menu items');
    }
  };
   
// Booking filters
// get all bookings in a specifice table
const getBookingWithTableNumberFilter =async (req, res) => {
  try {
    const TableNumber = req.params.TableNumber;
    const query = 'SELECT * FROM bookings WHERE tableNumber = ?';

    const Table = await new Promise((resolve, reject) => {
      db.query(query, [TableNumber], (err, results) => {
        if (err) {
          console.error('Error retrieving bookings: ' + err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json(Table);
  } catch (err) {
    console.error('Error retrieving bookings: ' + err);
    res.status(500).send('Error retrieving bookings');
  }
};
 
  // get all bookings that has a specific num of people 
const getBookingWithNumberOfPeopleFilter =async (req, res) => {
  try {
    const NumberOfPeople = req.params.NumberOfPeople;
    const query = 'SELECT * FROM bookings WHERE numberOfPeople =?';

    const Table = await new Promise((resolve, reject) => {
      db.query(query, [NumberOfPeople], (err, results) => {
        if (err) {
          console.error('Error retrieving bookings: ' + err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json(Table);
  } catch (err) {
    console.error('Error retrieving bookings: ' + err);
    res.status(500).send('Error retrieving bookings');
  }
};
    
// Rating method
const calculateRating= async (req, res) => {
  
 
  try {
    const { customerId, itemId, rating } = req.body;
   

    
    const query = 'SELECT * FROM calculaterate WHERE customerId = ? AND itemId = ? ';
  
    const combunationQuery = await new Promise((resolve, reject) => {
      db.query(query, [customerId, itemId], (err, results) => {
        if (err) {
          console.error('Error retrieving data: ' + err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
     if(combunationQuery.length >0){
      // combination exist so update
      const query = 'UPDATE calculaterate SET rating = ? WHERE customerId = ? AND itemId = ? ';
  
      const createQuery = await new Promise((resolve, reject) => {
        db.query(query, [rating,customerId, itemId], (err, results) => {
          if (err) {
            console.error('Error updatting data: ' + err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      
     }  
     else{
      const query = 'insert into  resto.calculaterate (customerId,itemId,rating) values(?,?,?)';
  
      const updateQuery = await new Promise((resolve, reject) => {
        db.query(query, [customerId, itemId,rating], (err, results) => {
          if (err) {
            console.error('Error retrieving data: ' + err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
     }

     // calculating avg (rating) for the item id 
     let newRate;
     const avgquery =' SELECT   AVG(rating)  FROM calculaterate WHERE itemId = ? ';
  
      const avgqueryCalc = await new Promise((resolve, reject) => {
        db.query(avgquery, [itemId], (err, results) => {
          if (err) {
            console.error('Error calc avg : ' + err);
            reject(err);
          } else {
             // convert query to value only
           const x =Object.values(results[0]);
           newRate=parseFloat(x[0]);
           
           console.log(newRate);

            resolve(results);
          }
        });
      });
      res.send(avgqueryCalc);
      
     
      
      

      //update rating in menueitems table
      const menuItemQuery ='UPDATE menuitems SET rating = ? WHERE itemId = ?';
  
      const updateQuery = await new Promise((resolve, reject) => {
        db.query(menuItemQuery, [newRate,itemId], (err, results) => {
          if (err) {
            console.error('Error updating data: ' + err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
     
   
  } catch (err) {
    console.error('Error updating data: ' + err);
    res.status(500).send('Error updating data');
  }
}
// Favourite for users
    //                 Adding item as favorite
    const addItemAsFavorite= async (req, res) => {
      try {
        const { itemId,customerId } = req.body;
        await new Promise((resolve, reject) => {
          const query = 'INSERT INTO favorites (itemId,customerId) VALUES (?, ?)';
          db.query(query, [itemId, customerId], (err, result) => {
            if (err) {
              console.error('Error adding favorite: ', err);
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
        res.status(200).json({ message: 'Product added as favorite' });
      } catch (err) {
        console.error('Failed to add product  as favorite: ', err);
        res.status(500).json({ error: 'Failed to add product  as favorite' });
      }
    }

 //deleting item from favorites
    const deleteItemFromFavourite =async (req, res) => {
      try {
        const { customerId, itemId } = req.body;
        const checkQuery = 'SELECT COUNT(*) AS count FROM favorites WHERE itemId = ? AND customerId =?';
        const deleteQuery = 'DELETE FROM favorites WHERE itemId = ? AND customerId=?';
    
        const checkResult = await new Promise((resolve, reject) => {
          db.query(checkQuery, [itemId,customerId], (err, result) => {
            if (err) {
              console.error('Error checking record existence: ', err);
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
    
        const count = checkResult[0].count;
    
        if (count > 0) {
          await new Promise((resolve, reject) => {
            db.query(deleteQuery, [itemId,customerId], (err, result) => {
              if (err) {
                console.error('Error deleting favorite: ', err);
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
          res.status(200).json({ message: 'favorite Record deleted successfully' });
        } else {
          res.status(404).json({ error: 'Record not found' });
        }

      
 
   
      } catch (err) {
        console.error('Failed to delete favorite record: ', err);
        res.status(500).json({ error: 'Failed to delete favorite record' });
      }
    };

    // get all favorite for a customer
    
const getAllFavorites =async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const query = 'SELECT m.* FROM menuitems m JOIN favorites f ON m.itemId = f.itemId WHERE f.customerId = ?';
    //array to save favorites id
    

    const Favourite = await new Promise((resolve, reject) => {
      db.query(query, [customerId], (err, results) => {
        if (err) {
          console.error('Error retrieving favorites: ' + err);
          reject(err);
        } else {
        
          resolve(results);
         
          
        }
      });
    });

    res.status(200).json(Favourite);
    
  } catch (err) {
    console.error('Error return favorites : ' + err);
    res.status(500).send('Error  return favorites ');
  }
};
 // get all data for every item in itemIds in favorite

   
  module.exports ={
    addProduct,
    deleteRecord,
    updateRecord,
    getStocksWithRatingFilter,
    getStocksWithPriceFilter,
    getStocksWithTimesOrderedFilter,
    getBookingWithTableNumberFilter,
    getBookingWithNumberOfPeopleFilter,
    calculateRating,
    addItemAsFavorite,
    deleteItemFromFavourite,
    getAllFavorites,
    
   
}
