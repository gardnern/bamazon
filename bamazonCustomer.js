// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// Connection script
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("You are now connected " + connection.threadId);
   
    bamazon();      

});                 

function bamazon() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        // cli-Table 
        var table = new Table(
            {
                head: ["Product ID", "Product Name", "Department Name", "Price", "Quantity"],
                colWidths: [20, 30, 19, 12, 12],
            },
            { chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'mid-mid': '', 'right-mid': ''} 
            });
     
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, parseFloat(res[i].price).toFixed(2), res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        // Prompt users with two messages.
        // * The first should ask them the ID of the product they would like to buy.
        // * The second message should ask how many units of the product they would like to buy.
        inquirer.prompt([
            {
                type: "number",
                message: "Enter the item ID of the product that you would like to buy? ",
                name: "id"
            },
            {
                type: "number",
                message: "Enter the quantity you would like to purchase? ",
                name: "quantity"
            },
        ])

            // Ordering function
            .then(function (cart) {

                var quantity = cart.quantity;
                var itemID = cart.id;

                connection.query('SELECT * FROM products WHERE id=' + item_id, function (err, selectedItem) {
                    if (err) throw err;
                   
                    if (selectedItem[0].stock_quantity - quantity >= 0) {

                        console.log("Quantity in Stock: " + selectedItem[0].stock_quantity + " Order Quantity: " + quantity);

                        console.log("Suffiecient inventory of " + selectedItem[0].product_name + " to fill your order!");

                        console.log("Total order: $ " + (cart.quantity * selectedItem[0].price).toFixed(2));

                        connection.query('UPDATE products SET stock_quantity=? WHERE id=?', [selectedItem[0].stock_quantity - quantity, itemID],

                            function (err, inventory) {
                                if (err) throw err;

                                bamazon();  
                            });  
                    }
                    else {
                        console.log("Insufficient Inventory: " + selectedItem[0].stock_quantity + " " + selectedItem[0].product_name + " in stock. \nPlease make another selection or reduce your quantity.");
                                bamazon();  
                    }
                });
            });
    });
}  
