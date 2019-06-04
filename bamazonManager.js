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