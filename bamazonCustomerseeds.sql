DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item INT AUTO_INCREMENT NOT NULL,
  product VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT(10) NOT NULL,
  primary key(item)
);
SELECT * FROM products;

INSERT INTO products (product, department, price, stock)
VALUES ("microwave", "appliances", 59.99, 200),
("laptop backpack", "accessories", 22.09, 175),
("instapot", "appliances", 79.95, 1000),
("Insignia TV 43 inches", "televisions", 199.99, 800),
("Microsoft Surfacebook 2", "electronics", 2665.99, 150),
("Jamstick", "instruments", 229.99, 150),
("Rayban Aviators", "apparel", 199.99, 160),
("Firestick", "electronics", 39.99, 400),
("Apple iPhone 8", "electronics", 382.00, 500),
("Men's Suede Look Chelsea Boots", "apparel", 40.50, 250);

SELECT * FROM products;
