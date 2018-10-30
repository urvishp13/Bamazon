// include dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table')

// create connection to database
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Th1s!sformysql",
  database: "bamazon"
});

// connect to database
db.connect(err => {
  if (err) throw err;
  console.log("You're now connected!");

  getAllProducts();
});

function getAllProducts() {
  // displaying all the items available for sale
  db.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, results) {
    if (err) throw err;

    prompt(results);
  });
}

function prompt(results) {
  // show the table of the items and their information
  console.table(results);
  // ask user two questions
  inquirer
    .prompt([{
        name: "item",
        type: "input",
        message: "What is the ID of the item you would like to buy?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "unitsToBuy",
        type: "input",
        message: "How many units would you like to buy?"
      }
    ])
    .then(function (answers) {
      // find the item in the query
      for (let i = 0; i < results.length; i++) {
        // match the id from the first question with the item_id from the query
        if (parseInt(answers.item) === results[i].item_id) {
          // check if store has enough of the product
          if (parseInt(answers.unitsToBuy) <= results[i].stock_quantity) {
            var itemsLeft = results[i].stock_quantity - parseInt(answers.unitsToBuy);
            var itemsLeftString = itemsLeft.toString();
            db.query(
              "UPDATE products SET ? WHERE ?",
              [{
                  stock_quantity: itemsLeftString
                },
                {
                  item_id: results[i].item_id
                }
              ],
              function (error) {
                if (error) throw error;
                var cost = parseInt(answers.unitsToBuy) * results[i].price;
                console.log(`Cost: $${cost}`);
                getAllProducts();
              }
            )
          } else {
            console.log("Insufficient quantity!");
            // run the prompt again to allow the customer to place another order
            getAllProducts();
          }
        }
      }
    });
}