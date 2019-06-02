var mysql = require("mysql");
var inquirer = require("inquirer");
//require("console.table");
//require('cli-table3');
require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  user: "root",

  password: "password",
  database: "bamazon_db"
});

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//   afterConnection();
// });

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
    promptCustomerForItem();
  });
}

function promptCustomerForItem(inventory) {
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
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      if (product) {
        customerQuantityChoice(product);
      }
      else {
        console.log("\nThis item is not available.");
        showProducts();
      }
    });
}

function customerQuantityChoice(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Press 'E' to Escape]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "e";
        }
      }
    ])
    .then(function(val) {
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("\nNot Enough Product.");
        showProducts();
      }
      else {
        buyProduct(product, quantity);
      }
    });
  }

  function buyProduct(product, quantity) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
      [quantity, product.item_id],
      function (err, res) {
        console.log("\nPurchse Successful " + quantity + " " + product.product_name + "Your total is.." + product.price + " \n");
        showProducts();
      }
    );
  }

function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}

function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "e") {
    console.log("Enjoy your purchase!");
    process.exit(0);
  }
}


