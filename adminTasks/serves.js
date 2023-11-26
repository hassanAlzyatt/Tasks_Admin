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


  
  module.exports ={
    addProduct,
    deleteRecord,
    updateRecord,
   
}