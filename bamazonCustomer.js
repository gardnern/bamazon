var inquirer = require("inquirer");
var mysql = require("mysql");

// Define the MySQL connection parameters
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "root",
	database: "bamazon_db"
});

// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return "Please enter a whole non-zero number.";
	}
}

function userprompt() {
	inquirer.prompt([
		{
			type: "input",
			name: "item_id",
			message: "Enter Item ID of the product:",
			validate: validateInput,
			filter: Number
		},
		{
			type: "input",
			name: "quantity",
			message: "Enter quantity",
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
		
		var item = input.item_id;
		var quantity = input.quantity;

		var queryStr = "SELECT * FROM products WHERE ?";

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log("Item ID not valid, try again!");
				displayInventory();

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {
					console.log("Product in stock. Ready to place the order");

					
					var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + " WHERE item_id = " + item;
					
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
						console.log("\n*******************************************************************\n");

						connection.end();
					})
				} else {
					console.log("That item is out of stock. Try another item.");
					console.log("\n****************************************************************************\n");

					displayInventory();
				}
			}
		})
	})
}

function displayInventory() {

	queryStr = "SELECT * FROM products";

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log("Existing Inventory: ");
		console.log("-------------------------------------------\n");

		var strOut = "";
		for (var i = 0; i < data.length; i++) {
			strOut = "";
			strOut += "Item ID: " + data[i].item_id + "  //  ";
			strOut += "Product Name: " + data[i].product_name + "  //  ";
			strOut += "Department: " + data[i].department_name + " // ";
			strOut += "Price: $" + data[i].price + "\n";
			strOut += "Stock: " + data[i].stock_quantity + "\n";

			console.log(strOut);
		}

	  	console.log("******************************************************\n");

	  
	  	userprompt();
	})
}

function runBamazon() {

	displayInventory();
}


runBamazon();