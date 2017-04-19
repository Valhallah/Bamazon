const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "Bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    buyProduct();
});

function displayStock(res) {
    var table = new Table({
        head: ['Item ID', 'Product', 'Department', 'Price', 'In Stock'],
        colWidths: [10, 40, 30, 8, 10]
    });
    for (var i = 0; i < res.length; i++) {
        table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].customer_cost, res[i].quantity]);
    }
    console.log(table.toString());
}


var buyProduct = function() {
    connection.query('SELECT * FROM stock_info', function(err, res) {
        displayStock(res);
        var choicesArray = [];
        for (var i = 0; i < res.length; i++) {
            choicesArray.push(res[i].product_name);
        }
        inquirer.prompt([{
                name: 'product',
                type: 'input',
                message: 'Which productwould you like to buy? (Enter the product ID)'
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'How many would you like to purchase?'
            }
        ]).then(function(answer) {
            console.log(answer);
            var itemID = answer.item;
            console.log(itemID);
            var chosenItem = res[itemID - 1];
            console.log(chosenItem);
            var newQuantity = chosenItem.quantity - answer.quantity;
            if (newQuantity >= 0) {
                connection.query('UPDATE stock_info SET ? WHERE itemID = ?', [{
                    quantity: newQuantity
                }, itemID]);
                buyProduct();
            } else {
                console.log("Oops! Looks like we don't have that many in stock. Please enter a lesser quantity.");
                buyProduct();
            }
        })
    })
}

// connection.query("SELECT * FROM stock_info", function(err, res) {
//   if (err) throw err;
//   console.log(res);
// });
//
// connection.query("", function(err, res) {
//   if (err) throw err;
//   console.log(res);
// });
