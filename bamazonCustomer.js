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
                message: 'Which product would you like to buy? (Enter the product ID)'
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'How many would you like to purchase?'
            }
        ]).then(function(answer) {
            console.log(answer);
            connection.query('SELECT quantity FROM stock_info WHERE id =' + answer.product, function(err, res) {
                console.log(res[0].quantity);
                var currentQuantity = res[0].quantity;

                if (answer.quantity <= currentQuantity) {
                    var query = 'UPDATE stock_info SET quantity = ' + (currentQuantity - answer.quantity) + ' WHERE id =' + answer.product;
                    connection.query(query, function(err, res) {
                        console.log('Your order is being processed');
                    })
                } else {
                    console.log("Oops! Looks like we don't have that many in stock. Please enter a lesser quantity.");
                }
            })

        });
    });
}
