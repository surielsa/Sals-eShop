var mysql = require("mysql");
var inquirer = require("inquirer");
//require("console.table");
require("cli-table3");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,


  user: "root",
  password: "password",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  showProducts();
});

function showProducts() {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);

    promptUserForItem(res);
  });
}

function promptUserForItem(stock_quantity) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would like to buy? [Press 'E' to Escape]",
        validate: function (val) {
          return !isNaN(val) || val.toLowerCase() === "e";
        }
      }
    ])
    .then(function (val) {
      checkToEscape(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkstock_quantity(choiceId, stock_quantity);

      if (product) {

        promptUserForQuantity(product);
      }
      else {

        console.log("\nThis item is not available.");
        showProducts();
      }
    });
}

function promptUserForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Press 'E' to Escape]",
        validate: function (val) {
          return val > 0 || val.toLowerCase() === "e";
        }
      }
    ])
    .then(function (val) {
      checkToEscape(val.quantity);
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("\nThere's not enough product to fulfill order. Sorry! Please choose a lower quantity or another item.");
        showProducts();
      }
      else {

        buyProduct(product, quantity);
      }
    });
}

function buyProduct(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function (err, res) {
      console.log("\nPurchase of: " + quantity + " " + product.product_name + "s" + " Successful!" + "\nYour total is  " + "$" + product.price * quantity);
      showProducts();
    }
  );
}

function checkstock_quantity(choiceId, stock_quantity) {
  for (var i = 0; i < stock_quantity.length; i++) {
    if (stock_quantity[i].item_id === choiceId) {
      return stock_quantity[i];
    }
  }

  return null;
}

function checkToEscape(choice) {
  if (choice.toLowerCase() === "e") {
    console.log("Thanks for shopping, Goodbye!");
    process.exit(0);
  }
}
