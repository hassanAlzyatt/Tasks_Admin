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
 
  
  module.exports ={
    addProduct,
    deleteRecord,
    updateRecord,
    getStocksWithRatingFilter,
    getStocksWithPriceFilter,
    getStocksWithTimesOrderedFilter,
    getBookingWithTableNumberFilter,
    getBookingWithNumberOfPeopleFilter,
    
   
}
