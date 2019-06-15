DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
  item_id int AUTO INCREMENT,
  product_name varchar(40) NOT NULL,
  department_name varchar(40) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity int NOT NULL,
  PRIMARY KEY(item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Lodge Dutch Oven", "kitchen", 39.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Presto Pressure Cooker", "kitchen", 45.50, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Sharp Blender", "kitchen", 80.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Elekty Scale", "kitchen", 15.95, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Lodge Dutch Oven", "kitchen", 39.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Squid Face Paint", "art and crafts", 9.99, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Canson Water Color", "art and crafts", 5.97, 130);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Melissa & Doug Sketch Pad", "art and crafts", 7.97, 200);    
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Game of Thrones", "books", 41.99, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("A Bird Box: A Novel", "books", 28.99, 500);    