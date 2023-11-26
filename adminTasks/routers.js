const express = require('express');

const serves =require('./serves');


const router = express.Router();

router.post('/admin/addProduct',serves.addProduct);
router.put('/admin/updateItem/:itemId', serves.updateRecord)
router.delete('/admin/deleteMenuItem/:itemId', serves.deleteRecord)


module.exports = router;