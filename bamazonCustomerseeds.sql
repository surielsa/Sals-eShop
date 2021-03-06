DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);
SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Microwave", "appliances", 59.99, 200),
("Laptop Backpack", "accessories", 22.09, 175),
("Instapot", "appliances", 79.95, 1000),
("Insignia TV 43", "televisions", 199.99, 800),
("Microsoft Surfacebook", "electronics", 2665.99, 150),
("Jamstick", "instruments", 229.99, 2),
("Rayban Aviator", "apparel", 199.99, 160),
("Firestick", "electronics", 39.99, 400),
("Apple iPhone 8", "electronics", 382.00, 500),
("Men's Suede Look Chelsea Boot", "apparel", 40.50, 250);

SELECT * FROM products;

                       