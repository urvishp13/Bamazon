DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255),
  department_name VARCHAR(255),
  price INT(11),
  stock_quantity INT(11),
  PRIMARY KEY (item_id)
);

INSERT INTO products 
  (product_name, department_name, price, stock_quantity)
VALUES
  ("bleach", "cleaning", 5, 5),
  ("cookies", "food", 2, 10),
  ("milk", "food", 2, 7),
  ("mop", "cleaning", 3, 10),
  ("juice", "food", 2, 8),
  ("Lysol", "cleaning", 3, 10),
  ("deodorant", "grooming", 3, 15),
  ("comb", "grooming", 1.5, 10),
  ("toothbrush", "dental", 2, 9),
  ("floss", "dental", 2, 10);

