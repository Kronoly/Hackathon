const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Products
exports.view = (req, res) => {
  // Product the connection
  connection.query('SELECT * FROM product WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedProduct = req.query.removed;
      res.render('products', { rows, removedProduct });
    } else {
      console.log(err);
    }
    console.log('The data from product table: \n', rows);
  });
}

// Find Product by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // Product the connection
  connection.query('SELECT * FROM product WHERE name LIKE ? OR product_code LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('products', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from product table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-product');
}

// Add new product
exports.create = (req, res) => {
  const { name, product_code, image, product_manual, comment } = req.body;
  let searchTerm = req.body.search;

  // Product the connection
  connection.query('INSERT INTO product SET name = ?, product_code = ?, image = ?, product_manual = ?, comment = ?', [name, product_code, image, product_manual, comment], (err, rows) => {
    if (!err) {
      res.render('add-product', { alert: 'Product added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from product table: \n', rows);
  });
}


// Edit product
exports.edit = (req, res) => {
  // Product the connection
  connection.query('SELECT * FROM product WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-product', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from product table: \n', rows);
  });
}


// Update Product
exports.update = (req, res) => {
  const { name, product_code, image, product_manual, comment } = req.body;
  // Product the connection
  connection.query('UPDATE product SET name = ?, product_code = ?, image = ?, product_manual = ?, comment = ? WHERE id = ?', [name, product_code, image, product_manual, comment, req.params.id], (err, rows) => {

    if (!err) {
      // Product the connection
      connection.query('SELECT * FROM product WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-product', { rows, alert: `${name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from product table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from product table: \n', rows);
  });
}

// Delete Product
exports.delete = (req, res) => {

  connection.query('UPDATE product SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedProduct = encodeURIComponent('Product successeflly removed.');
      res.redirect('/product/?removed=' + removedProduct);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });

}

// View Products
exports.viewall = (req, res) => {

  // Product the connection
  connection.query('SELECT * FROM product WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-product', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from product table: \n', rows);
  });

}